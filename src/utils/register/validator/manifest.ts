import { z } from 'zod';
import { Manifest } from '@/types/registry/manifest';

/**
 * 组件 i18n 配置验证器
 */
export const ManifestI18nSchema = z.object({
    defaultLocale: z.string(),
    locales: z.array(z.object({
        code: z.string(),
        name: z.string(),
        file: z.string(),
    })),
})

/**
 * 组件注册 manifest 配置文件验证器
 */
export const ManifestSchema = z.object({
    author: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    name: z.string(),
    version: z.string(),
    description: z.string().optional(),
    source: z.literal('core').or(z.literal('external')),
    path: z.string(),
    i18n: ManifestI18nSchema.optional(),
})

/**
 * 验证组件注册 manifest 配置文件
 * @param manifest 组件注册 manifest 配置文件
 * @returns 验证结果
 */
export function validateManifest(manifest: any): manifest is Manifest {
    return ManifestSchema.safeParse(manifest).success;
}
