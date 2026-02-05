import { Source } from './core';
import { I18n } from './i18n';

/**
 * 组件注册 manifest 配置文件
*/
interface Manifest {
    /**
     * 组件作者
     */
    author?: string;

    /**
     * 组件关键词
     */
    keywords?: string[];

    /**
     * 组件名称
    */
    name: string;

    /**
     * 组件版本
     */
    version: string;

    /**
     * 组件描述
     */
    description?: string;

    source: Source;

    /**
     * 组件的入口文件路径，相对于组件根目录
     */
    path: string;
    
    /**
     * 组件国际化配置
     */
    i18n?: I18n;

}

export {
    Manifest,
}