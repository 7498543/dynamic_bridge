import { BlockSchema } from './block';
import { I18nMapSchema } from './i18n';
import { SeoSchema } from './seo';

export enum PageLayout {
	Default = 'default',
	Blank = 'blank',
}

export type PageLayoutType = `${PageLayout}` | string;

interface PageContentSchema {
	layout: PageLayoutType;
	blocks: BlockSchema[];
}

interface PageSchema {
	page: PageContentSchema;
	seo: SeoSchema;
	i18nMap?: I18nMapSchema;
}

export { PageContentSchema, PageSchema };
