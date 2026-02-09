import { z } from 'zod';
import { PageSchema } from '@/types/schema';

/**
 * 页面结构验证
 */
export const pageSchema = z.object({
	layout: z.literal('default'),
	blocks: z.array(z.any()),
});

/**
 * 验证页面对象
 * @param page 页面对象
 * @returns 验证结果
 */
export function validatePage(page: any): page is PageSchema {
	return pageSchema.safeParse(page).success;
}

/**
 * 验证页面数组
 * @param pages 页面数组
 * @returns 验证结果
 */
export function validatePages(pages: any[]): pages is PageSchema[] {
	return Array.isArray(pages) && pages.every(validatePage);
}
