import type { Manifest } from '../../../types/registry';
import { ManifestSchema } from '../validator/manifest';

export function normalizeManifest(value: unknown): Manifest {
	return ManifestSchema.parse(value) as Manifest;
}
