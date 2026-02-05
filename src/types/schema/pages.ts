import { BlockSchema } from './block';

export enum PageLayout {
	/**
	 * 默认布局
	 */
	Default = 'default',
	/**
	 * 空白页
	 */
	Blank = 'blank',
}

export type PageLayoutType = PageLayout[keyof PageLayout];

/**
 * 页面配置
 */
interface PageSchema {
	/**
	 * 页面布局
	 */
	layout: PageLayoutType;
	/**
	 * 页面内容
	 */
	blocks: BlockSchema[];
}

export { PageSchema };
