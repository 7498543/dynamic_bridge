interface AlternateSchema {
	href: string;
	lang: string;
	rel: string;
}

/**
 * 页面SEO配置
 */
interface SeoSchema {
	title: string;
	description: string;
	keywords: string[];
	alternate: AlternateSchema[];
}

export { SeoSchema };
