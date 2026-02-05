import { ComponentCustomProps, CSSProperties } from 'vue';

/**
 * 组件属性
 */
interface ComponentProps extends ComponentCustomProps {
	/**
	 * 组件唯一标识
	 */
	id?: string;

	/**
	 * 组件样式
	 */
	style?: string | CSSProperties | Record<string, any>;

	/**
	 * 组件类名
	 */
	class?: string | string[] | Record<string, boolean>;

	[key: string]: any;
}

type StyleSchema = ComponentProps['style'];
type ClassSchema = ComponentProps['class'];

/**
 * 组件插槽
 */
type ComponentSlots = string | Record<string, BlockSchema[]>;

/**
 * 代码块结构体
 */
interface BlockSchema {
	/**
	 * 组件名称
	 */
	component: string;
	/**
	 * 组件属性
	 */
	componentProps: ComponentProps;
	/**
	 * 组件插槽
	 */
	componentSlots: ComponentSlots;
}

export {
	ComponentProps,
	ComponentSlots,
	BlockSchema,
	ClassSchema,
	StyleSchema,
};
