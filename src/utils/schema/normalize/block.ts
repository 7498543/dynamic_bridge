import {
	BlockSchema,
	ClassSchema,
	ComponentSlots,
	StyleSchema,
} from '@/types/schema';

export function normalizeClass(className: ClassSchema): string {
	if (!className) return '';

	if (typeof className === 'string') {
		return className;
	}

	if (Array.isArray(className)) {
		return className.filter(Boolean).join(' ');
	}

	if (typeof className === 'object') {
		return Object.entries(className)
			.filter(([, value]) => Boolean(value))
			.map(([key]) => key)
			.join(' ');
	}

	return '';
}

export function normalizeStyle(style: StyleSchema): Record<string, any> | string {
	if (!style) return {};

	if (typeof style === 'string') {
		return style;
	}

	if (typeof style === 'object') {
		return style;
	}

	return {};
}

export function normalizeSlots(slots: ComponentSlots, parentId = 'block'): ComponentSlots {
	if (!slots) return {};

	if (typeof slots === 'string') {
		return {
			default: [
				{
					id: `${parentId}:default:0`,
					component: 'Text',
					props: {
						text: slots,
					},
				},
			],
		};
	}

	const normalized: Record<string, string | BlockSchema[]> = {};

	for (const [slotName, value] of Object.entries(slots)) {
		if (typeof value === 'string') {
			normalized[slotName] = value;
			continue;
		}

		normalized[slotName] = Array.isArray(value)
			? value.map((block, index) => normalizeBlock(block, `${parentId}:${slotName}:${index}`))
			: [];
	}

	return normalized;
}

export function normalizeBlock(block: any, fallbackId = 'block'): BlockSchema {
	if (!block || typeof block !== 'object') {
		return {
			id: fallbackId,
			component: '',
			props: {},
			componentSlots: {},
			style: {},
		};
	}

	const props = block.props ?? block.componentProps ?? {};

	return {
		id: block.id || fallbackId,
		component: block.component || '',
		props: {
			...props,
			class: normalizeClass(props.class),
		},
		componentSlots: normalizeSlots(block.componentSlots, block.id || fallbackId),
		style: normalizeStyle(block.style),
	};
}

export function normalizeBlocks(blocks: any[]): BlockSchema[] {
	return Array.isArray(blocks)
		? blocks.map((block, index) => normalizeBlock(block, `block:${index}`))
		: [];
}
