import {
  BlockSchema,
  ComponentSlots,
  StyleSchema,
  ClassSchema,
} from "@/types/schema";

/**
 * 标准化类名
 * @param className 类名
 * @returns 标准化后的类名
 */
export function normalizeClass(className: ClassSchema): string {
  if (!className) return "";

  if (typeof className === "string") {
    return className;
  }

  if (Array.isArray(className)) {
    return className.filter(Boolean).join(" ");
  }

  if (typeof className === "object") {
    return Object.entries(className)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(" ");
  }

  return "";
}

/**
 * 标准化样式对象
 * @param style 样式对象
 * @returns 标准化后的样式对象
 */
export function normalizeStyle(style: StyleSchema): Record<string, any> {
  if (!style) return {};

  if (typeof style === "object") {
    return style;
  }

  if (typeof style === "string") {
    return style.split(";").reduce(
      (acc, cur) => {
        const [key, value] = cur.split(":");
        if (key && value) {
          acc[key.trim()] = value.trim();
        }
        return acc;
      },
      {} as Record<string, any>,
    );
  }

  return {};
}

/**
 * 标准化插槽对象
 * @param slots 插槽对象
 * @returns 标准化后的插槽对象
 */
export function normalizeSlots(slots: ComponentSlots): ComponentSlots {
  if (!slots) return {};
  
  // 确保插槽对象是一个对象
  if (typeof slots === "string") {
    // 如果是字符串，包装成 Text 组件 承接文本
    return {
      default: [
        {
          component: "Text",
          componentProps: {
            text: slots,
          },
          componentSlots: {},
        },
      ],
    };
  }

  if (typeof slots === "object") {
    const normalized: ComponentSlots = {};

    for (const [key, value] of Object.entries(slots)) {
      if (Array.isArray(value)) {
        normalized[key] = value;
      } else {
        normalized[key] = [];
      }
    }

    return normalized;
  }

  return {};
}

/**
 * 标准化块对象
 * @param block 块对象
 * @returns 标准化后的块对象
 */
export function normalizeBlock(block: any): BlockSchema {
  if (!block || typeof block !== "object") {
    return {
      component: "",
      componentProps: {},
      componentSlots: {},
    };
  }

  return {
    component: block.component || "",
    componentProps: {
      ...block.componentProps,
      style: normalizeStyle(block.componentProps?.style),
      class: normalizeClass(block.componentProps?.class),
    },
    componentSlots: normalizeSlots(block.componentSlots),
  };
}

/**
 * 标准化块数组
 * @param blocks 块数组
 * @returns 标准化后的块数组
 */
export function normalizeBlocks(blocks: any[]): BlockSchema[] {
  return blocks.map(normalizeBlock);
}