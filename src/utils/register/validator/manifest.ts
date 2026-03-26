import { z } from 'zod';
import type { Manifest } from '../../../types/registry/manifest';
import {
	BLOCK_COMPONENT_NAME_PATTERN,
	RUNTIME_HYDRATION_VALUES,
	SLOT_NAME_PATTERN,
} from '../../schema/constraints';

export const ManifestI18nSchema = z.object({
	defaultLocale: z.string(),
	locales: z.array(
		z.object({
			code: z.string(),
			name: z.string(),
			file: z.string(),
		})
	),
});

export const ManifestContractSchema = z
	.object({
		props: z.array(z.string()).optional(),
		slots: z.array(z.string().regex(SLOT_NAME_PATTERN)).optional(),
		hydration: z.array(z.enum(RUNTIME_HYDRATION_VALUES)).optional(),
		ssr: z.boolean().optional(),
	})
	.strict();

export const ManifestSchema = z.object({
	author: z.string().optional(),
	keywords: z.array(z.string()).optional(),
	name: z.string().regex(BLOCK_COMPONENT_NAME_PATTERN),
	version: z.string(),
	description: z.string().optional(),
	source: z.literal('core').or(z.literal('external')),
	path: z.string().min(1),
	i18n: ManifestI18nSchema.optional(),
	contract: ManifestContractSchema.optional(),
});

export function validateManifest(manifest: unknown): manifest is Manifest {
	return ManifestSchema.safeParse(manifest).success;
}
