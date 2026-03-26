import type { Manifest } from '../../types/registry';
import type { RegisterSchema, Registry } from '../../types/registry/core';
import { normalizeManifest } from './manifest/normalize';

export interface RegisterOptions<T> {
	manifest: Manifest | unknown;
	loader: () => Promise<T>;
}

export type RegistryManifestLoaderResolver<T> = (
	manifest: Manifest
) => (() => Promise<T>) | null | undefined;

export interface CreateRegistryOptions {
	onConflict?: 'throw' | 'overwrite';
}

function assignRegistryItem<T>(
	registry: RegisterSchema<T>,
	item: Registry<T>,
	onConflict: CreateRegistryOptions['onConflict'] = 'throw'
) {
	if (registry[item.name] && onConflict !== 'overwrite') {
		throw new Error(`Duplicate registry component name: ${item.name}`);
	}

	registry[item.name] = item;
}

export function createRegistryEntry<T>({
	manifest,
	loader,
}: RegisterOptions<T>): Registry<T> {
	const normalized = normalizeManifest(manifest);

	return {
		name: normalized.name,
		source: normalized.source,
		loader,
	};
}

export function createRegistry<T>(
	entries: Array<RegisterOptions<T>>,
	options: CreateRegistryOptions = {}
): RegisterSchema<T> {
	const registry: RegisterSchema<T> = {};

	for (const entry of entries) {
		const item = createRegistryEntry(entry);
		assignRegistryItem(registry, item, options.onConflict);
	}

	return registry;
}

export async function loadFromRegistry<T>(
	registry: RegisterSchema<T>,
	name: string
): Promise<T> {
	const item = registry[name];

	if (!item) {
		throw new Error(`Component is not registered: ${name}`);
	}

	return item.loader();
}

export function createRegistryEntriesFromManifests<T>(
	manifests: Array<Manifest | unknown>,
	resolveLoader: RegistryManifestLoaderResolver<T>
): Array<RegisterOptions<T>> {
	const entries: Array<RegisterOptions<T>> = [];

	for (const manifestValue of manifests) {
		const manifest = normalizeManifest(manifestValue);
		const loader = resolveLoader(manifest);

		if (!loader) {
			continue;
		}

		entries.push({
			manifest,
			loader,
		});
	}

	return entries;
}

export function mergeRegistries<T>(
	registries: Array<RegisterSchema<T>>,
	options: CreateRegistryOptions = {}
): RegisterSchema<T> {
	const merged = {} as RegisterSchema<T>;

	for (const registry of registries) {
		for (const item of Object.values(registry)) {
			assignRegistryItem(merged, item, options.onConflict);
		}
	}

	return merged;
}

export interface RegistryManager<T> {
	init: () => Promise<void>;
	getRegistry: (
		name?: string | string[]
	) => Registry<T> | Registry<T>[] | RegisterSchema<T> | undefined;
	load: (name: string) => Promise<T | null>;
}

interface CreateRegistryManagerOptions<T> {
	loaders: Array<RegisterSchema<T> | (() => Promise<RegisterSchema<T>>)>;
	options?: CreateRegistryOptions;
}

interface CreateRegistryManagerFromEntriesOptions<T> {
	loaders: Array<
		Array<RegisterOptions<T>> | (() => Promise<Array<RegisterOptions<T>>>)
	>;
	options?: CreateRegistryOptions;
}

export function createRegistryManager<T>({
	loaders,
	options,
}: CreateRegistryManagerOptions<T>): RegistryManager<T> {
	let registry: RegisterSchema<T> = {};
	let initPromise: Promise<void> | null = null;

	async function init() {
		if (!initPromise) {
			initPromise = (async () => {
				const resolved = await Promise.all(
					loaders.map((loader) =>
						typeof loader === 'function' ? loader() : loader
					)
				);

				registry = mergeRegistries(resolved, options);
			})();
		}

		await initPromise;
	}

	function getRegistry(name?: string | string[]) {
		if (!name) {
			return registry;
		}

		if (Array.isArray(name)) {
			return name.map((item) => registry[item]).filter(Boolean);
		}

		return registry[name];
	}

	async function load(name: string) {
		const item = registry[name];

		if (!item) {
			return null;
		}

		return item.loader().catch(() => null);
	}

	return {
		init,
		getRegistry,
		load,
	};
}

export function createRegistryManagerFromEntries<T>({
	loaders,
	options,
}: CreateRegistryManagerFromEntriesOptions<T>): RegistryManager<T> {
	return createRegistryManager({
		loaders: loaders.map((loader) =>
			typeof loader === 'function'
				? async () => createRegistry(await loader(), options)
				: createRegistry(loader, options)
		),
		options,
	});
}
