import { z } from 'zod';
import type { PageContentSchema } from '../../../types/schema/page';
import { blockSchema } from './block';

export const pageSchema: z.ZodType<PageContentSchema> = z.object({
	layout: z.string(),
	blocks: z.array(blockSchema),
});

export function validatePage(page: unknown): page is PageContentSchema {
	return pageSchema.safeParse(page).success;
}

export function validatePages(pages: unknown): pages is PageContentSchema[] {
	return Array.isArray(pages) && pages.every(validatePage);
}
