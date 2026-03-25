interface AlternateSchema {
	href: string;
	hreflang: string;
}

interface SeoSchema {
	title: string;
	description: string;
	canonical?: string;
	alternate?: AlternateSchema[];
}

export { AlternateSchema, SeoSchema };
