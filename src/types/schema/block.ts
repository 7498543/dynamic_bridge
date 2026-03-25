import type { ComponentCustomProps, CSSProperties } from 'vue';

interface RuntimeDirective {
	hydration?: 'visible';
}

interface ComponentProps extends ComponentCustomProps {
	class?: string | string[] | Record<string, boolean>;
	[key: string]: any;
}

type StyleSchema = string | CSSProperties | Record<string, any>;
type ClassSchema = ComponentProps['class'];
type ComponentSlots = string | Record<string, string | BlockSchema[]>;

interface BlockSchema {
	id: string;
	component: string;
	props?: ComponentProps;
	componentSlots?: ComponentSlots;
	style?: StyleSchema;
}

export {
	BlockSchema,
	ClassSchema,
	ComponentProps,
	ComponentSlots,
	RuntimeDirective,
	StyleSchema,
};
