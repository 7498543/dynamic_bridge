import { PageContentSchema, PageLayout } from '@/types/schema';
import { normalizeBlock } from './block';

export function normalizePage(page: any): PageContentSchema {
	if (!page || typeof page !== 'object') {
		return {
			layout: PageLayout.Default,
			blocks: [],
		};
	}

	return {
		layout: page.layout || PageLayout.Default,
		blocks: Array.isArray(page.blocks)
			? page.blocks.map((block: any, index: number) =>
					normalizeBlock(block, `page:block:${index}`)
			  )
			: [],
	};
}

export function normalizePages(pages: any[]): PageContentSchema[] {
	return Array.isArray(pages) ? pages.map(normalizePage) : [];
}
