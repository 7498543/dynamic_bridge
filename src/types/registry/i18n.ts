import { Language } from '@/types/i18n';

interface Locale {
    /**
     * 语言标识符
     */
    code: Language;

    /**
     * 语言名称
     */
    name: string;

    /**
     * 一个以对象形式提供翻译消息的文件路径
     * 如 root/locale/zh-CN.json
     * root 为组件根路径
     */
    file: string;
}

interface I18n {
    /**
     * 默认语言
     */
    defaultLocale: Language;
    /**
     * 组件支持的语言列表
     */
    locales: Locale[];
}

export {
    I18n,
}