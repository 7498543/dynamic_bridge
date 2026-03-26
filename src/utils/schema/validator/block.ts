import { z } from 'zod';
import type { BlockSchema } from '../../../types/schema';
import {
	BLOCK_COMPONENT_NAME_PATTERN,
	RUNTIME_HYDRATION_VALUES,
	SLOT_NAME_PATTERN,
} from '../constraints';

const slotValueSchema = z.union([z.string(), z.array(z.lazy(() => blockSchema))]);
const runtimeDirectiveSchema = z
	.object({
		hydration: z.enum(RUNTIME_HYDRATION_VALUES).optional(),
	})
	.strict();
const propsSchema = z
	.object({
		__runtime: runtimeDirectiveSchema.optional(),
	})
	.catchall(z.any());

export const blockSchema: z.ZodType<BlockSchema> = z.object({
	id: z.string(),
	component: z.string().regex(BLOCK_COMPONENT_NAME_PATTERN),
	props: propsSchema.optional(),
	componentSlots: z
		.union([z.string(), z.record(z.string().regex(SLOT_NAME_PATTERN), slotValueSchema)])
		.optional(),
	style: z.union([z.string(), z.object({}).passthrough()]).optional(),
});

export function validateBlockSchema(block: unknown): block is BlockSchema {
	return blockSchema.safeParse(block).success;
}
