import type { Manifest } from '@/types/registry';
import { ManifestSchema } from '../validator/manifest';

/**
 * 标准化组件 manifest 配置
 * - 负责做类型与结构校验
 * - 确保平台在后续注册 / 加载时拿到的是一个完整、可靠的 Manifest 对象
 *
 * @param value 任意来源的 manifest 原始数据
 * @returns 通过校验并标准化后的 Manifest
 * @throws 当校验失败时会抛出 zod 的验证错误
 */
export function normalizeManifest(value: unknown): Manifest {
    const result = ManifestSchema.parse(value) as Manifest;
    return result;
}

