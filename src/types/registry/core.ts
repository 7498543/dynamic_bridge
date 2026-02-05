/**
 * 组件来源
 * core: 核心组件 nuxt 项目内部注册
 * external: 扩展组件 异步引入
 */
export type Source = 'core' | 'external'

/**
 * 组件注册表
 * @template T 组件类型
 */
interface Registry<T> {
    /**
     * 组件名称
     */
    name: string;

    source: Source;
    /**
     * 组件加载器
     */
    loader: () => Promise<T>;
}

/**
 * 组件注册表 schema
 */
type RegisterSchema<T> = Record<string, Registry<T>>

export {
    Registry,
    RegisterSchema
}