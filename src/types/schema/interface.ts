import { I18nSchema } from './i18n';
import { PageSchema } from './pages';
import { SeoSchema } from './seo';

/**
 * 统一页面接口格式
 * */
interface PageInterfaceSchema {
	/**
	 * 页面SEO配置
	 */
	seo: SeoSchema;

	/**
	 * 页面内容
	 */
	pages: PageSchema;

	/**
	 * 页面国际化配置
	 */
	i18n: I18nSchema;
}

export { PageInterfaceSchema };
