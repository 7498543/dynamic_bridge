export type Source = 'core' | 'external';

interface Registry<T> {
	name: string;
	source: Source;
	loader: () => Promise<T>;
}

type RegisterSchema<T> = Record<string, Registry<T>>;
type BlockRegistryItem<T = any> = Registry<T>;
type BlockRegistry<T = any> = RegisterSchema<T>;

export { BlockRegistry, BlockRegistryItem, Registry, RegisterSchema };
