import type { Manifest } from '@/types/registry';
import type { RegisterSchema, Registry } from '@/types/registry/core';
import { normalizeManifest } from './normalize';

/**
 * 单个组件注册入参
 */
export interface RegisterOptions<T> {
    /**
     * 组件 manifest，可以是任意来源的原始数据
     * 会在内部通过 normalizeManifest 做一次标准化
     */
    manifest: Manifest | unknown;

    /**
     * 组件异步加载器
     * 平台可根据 source / path 信息构造对应的 import 逻辑
     */
    loader: () => Promise<T>;
}

/**
 * 基于 manifest 与 loader 构造一个注册表条目
 */
export function createRegistryEntry<T>({ manifest, loader }: RegisterOptions<T>): Registry<T> {
    const normalized = normalizeManifest(manifest);

    return {
        name: normalized.name,
        source: normalized.source,
        loader,
    };
}

/**
 * 批量创建组件注册表
 * 平台可以在启动时将所有组件的 manifest 与 loader 统一注册
 */
export function createRegistry<T>(entries: Array<RegisterOptions<T>>): RegisterSchema<T> {
    const registry: RegisterSchema<T> = {};

    for (const entry of entries) {
        const item = createRegistryEntry(entry);
        registry[item.name] = item;
    }

    return registry;
}

/**
 * 从注册表中按名称异步加载组件
 * @throws 当组件未注册时抛出错误
 */
export async function loadFromRegistry<T>(registry: RegisterSchema<T>, name: string): Promise<T> {
    const item = registry[name];

    if (!item) {
        throw new Error(`组件未注册: ${name}`);
    }

    return item.loader();
}

