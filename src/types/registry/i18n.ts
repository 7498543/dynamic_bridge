import type { Language } from '../i18n';

interface Locale {
	code: Language;
	name: string;
	file: string;
}

interface I18n {
	defaultLocale: Language;
	locales: Locale[];
}

export { I18n };
