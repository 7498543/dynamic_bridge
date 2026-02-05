import { z } from 'zod';
import { BlockSchema } from '@/types/schema';

/**
 * 代码块结构验证
 */
export const blockSchema = z.object({
	component: z.string(),
	componentProps: z.object({}).passthrough(),
	componentSlots: z.union([z.string(), z.object({}).passthrough()]),
});

/**
 * 验证代码块对象
 * @param block 代码块对象
 * @returns 验证结果
 */
export function validateBlockSchema(block: any): block is BlockSchema {
	return blockSchema.safeParse(block).success;
}
