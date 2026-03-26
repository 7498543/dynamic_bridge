import type { ComponentCustomProps, CSSProperties } from 'vue';

type HydrationMode = 'visible';

interface RuntimeDirective {
	hydration?: HydrationMode;
}

interface ComponentProps extends ComponentCustomProps {
	class?: string | string[] | Record<string, boolean>;
	__runtime?: RuntimeDirective;
	[key: string]: any;
}

type StyleSchema = string | CSSProperties | Record<string, any>;
type ClassSchema = ComponentProps['class'];
type ComponentSlots = string | Record<string, string | BlockSchema[]>;

interface LowCodeComponentContract {
	props?: string[];
	slots?: string[];
	hydration?: HydrationMode[];
	ssr?: boolean;
}

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
	HydrationMode,
	LowCodeComponentContract,
	RuntimeDirective,
	StyleSchema,
};
