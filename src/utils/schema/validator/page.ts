import { z } from 'zod';
import { PageContentSchema } from '@/types/schema';

export const pageSchema: z.ZodType<PageContentSchema> = z.object({
	layout: z.string(),
	blocks: z.array(z.any()),
});

export function validatePage(page: any): page is PageContentSchema {
	return pageSchema.safeParse(page).success;
}

export function validatePages(pages: any[]): pages is PageContentSchema[] {
	return Array.isArray(pages) && pages.every(validatePage);
}
