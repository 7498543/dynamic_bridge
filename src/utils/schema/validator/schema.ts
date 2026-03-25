import { z } from 'zod';
import { BlockSchema } from '@/types/schema';

const slotValueSchema = z.union([z.string(), z.array(z.lazy(() => blockSchema))]);

export const blockSchema: z.ZodType<BlockSchema> = z.object({
	id: z.string(),
	component: z.string(),
	props: z.object({}).passthrough().optional(),
	componentSlots: z
		.union([z.string(), z.record(z.string(), slotValueSchema)])
		.optional(),
	style: z.union([z.string(), z.object({}).passthrough()]).optional(),
});

export function validateBlockSchema(block: any): block is BlockSchema {
	return blockSchema.safeParse(block).success;
}
