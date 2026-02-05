import { PageSchema } from "@/types/schema";
import { normalizeBlock } from "./block";
/**
 * 标准化页面对象
 * @param page 页面对象
 * @returns
 */
export function normalizePage(page: any): PageSchema {
  if (!page || typeof page !== "object") {
    return {
      layout: "default",
      blocks: [],
    };
  }

  return {
    layout: page?.layout || "default",
    blocks: Array.isArray(page?.blocks) ? page.blocks.map(normalizeBlock) : [],
  };
}

/**
 * 标准化页面数组
 * @param pages 页面数组
 * @returns 标准化后的页面数组
 */
export function normalizePages(pages: any[]): PageSchema[] {
  return Array.isArray(pages) ? pages.map(normalizePage) : [];
}
