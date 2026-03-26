import type { BlockSchema, RuntimeDirective } from '../types';
import {
	normalizeBlock,
	normalizeClass,
	normalizeSlots,
} from './schema/normalize/block';

export { normalizeBlock, normalizeSlots } from './schema/normalize/block';

const SPACE_SCALE: Record<string, string> = {
	'0': '0',
	'1': '1',
	'2': '2',
	'3': '3',
	'4': '4',
	'5': '5',
	'6': '6',
	'8': '8',
	'10': '10',
	'12': '12',
	'16': '16',
	'20': '20',
	'24': '24',
};

const TEXT_SIZE_SCALE: Record<string, string> = {
	xs: 'text-xs',
	sm: 'text-sm',
	base: 'text-base',
	lg: 'text-lg',
	xl: 'text-xl',
	'2xl': 'text-2xl',
	'3xl': 'text-3xl',
	'4xl': 'text-4xl',
};

const COLOR_SCALE: Record<string, string> = {
	slate: 'slate',
	zinc: 'zinc',
	neutral: 'neutral',
	stone: 'stone',
	red: 'red',
	orange: 'orange',
	amber: 'amber',
	yellow: 'yellow',
	lime: 'lime',
	green: 'green',
	emerald: 'emerald',
	teal: 'teal',
	cyan: 'cyan',
	sky: 'sky',
	blue: 'blue',
	indigo: 'indigo',
	violet: 'violet',
	pink: 'pink',
	rose: 'rose',
	white: 'white',
	black: 'black',
};

function normalizeClassToken(value?: string | number | null) {
	if (value === undefined || value === null || value === '') {
		return null;
	}

	const token = String(value).trim();
	return SPACE_SCALE[token] ?? token;
}

function sanitizeClassList(classes: string[]) {
	return [...new Set(classes.filter(Boolean))].join(' ');
}

function resolveColorClasses(prefix: 'text' | 'bg', value?: string) {
	if (!value) {
		return [];
	}

	if (value === 'white' || value === 'black') {
		return [`${prefix}-${value}`];
	}

	const [family, shade = '500'] = value.split('-');

	if (!COLOR_SCALE[family]) {
		return [];
	}

	return [`${prefix}-${family}-${shade}`];
}

export function resolveTailwindClasses(style?: BlockSchema['style']) {
	if (!style) {
		return '';
	}

	if (typeof style === 'string') {
		return sanitizeClassList(style.split(/\s+/));
	}

	const styleObject = style as Record<string, any>;
	const classes: string[] = [];
	const spacing = styleObject.spacing ?? {};
	const flex = styleObject.flex ?? {};
	const grid = styleObject.grid ?? {};

	if (styleObject.display) {
		classes.push(String(styleObject.display));
	}

	if (styleObject.width) {
		classes.push(`w-${styleObject.width}`);
	}

	if (styleObject.height) {
		classes.push(`h-${styleObject.height}`);
	}

	if (styleObject.minHeight) {
		classes.push(`min-h-${styleObject.minHeight}`);
	}

	if (styleObject.maxWidth) {
		classes.push(`max-w-${styleObject.maxWidth}`);
	}

	if (styleObject.aspect) {
		classes.push(`aspect-${styleObject.aspect}`);
	}

	if (styleObject.objectFit) {
		classes.push(`object-${styleObject.objectFit}`);
	}

	if (styleObject.rounded) {
		classes.push(
			styleObject.rounded === true
				? 'rounded'
				: `rounded-${styleObject.rounded}`
		);
	}

	if (styleObject.shadow) {
		classes.push(
			styleObject.shadow === true
				? 'shadow'
				: `shadow-${styleObject.shadow}`
		);
	}

	if (styleObject.border) {
		classes.push(
			styleObject.border === true
				? 'border'
				: `border-${styleObject.border}`
		);
	}

	if (styleObject.overflow) {
		classes.push(`overflow-${styleObject.overflow}`);
	}

	if (styleObject.position) {
		classes.push(String(styleObject.position));
	}

	if (styleObject.textAlign) {
		classes.push(`text-${styleObject.textAlign}`);
	}

	if (styleObject.fontWeight) {
		classes.push(`font-${styleObject.fontWeight}`);
	}

	if (styleObject.fontSize && TEXT_SIZE_SCALE[String(styleObject.fontSize)]) {
		classes.push(TEXT_SIZE_SCALE[String(styleObject.fontSize)]);
	}

	classes.push(...resolveColorClasses('text', styleObject.color));
	classes.push(...resolveColorClasses('bg', styleObject.background));

	for (const key of [
		'p',
		'px',
		'py',
		'pt',
		'pr',
		'pb',
		'pl',
		'm',
		'mx',
		'my',
		'mt',
		'mr',
		'mb',
		'ml',
		'gap',
	] as const) {
		const token = normalizeClassToken(spacing[key]);

		if (token) {
			classes.push(`${key}-${token}`);
		}
	}

	if (flex.direction) {
		classes.push('flex', `flex-${flex.direction}`);
	}

	if (flex.align) {
		classes.push(`items-${flex.align}`);
	}

	if (flex.justify) {
		classes.push(`justify-${flex.justify}`);
	}

	if (flex.wrap) {
		classes.push(`flex-${flex.wrap}`);
	}

	const flexGap = normalizeClassToken(flex.gap);

	if (flexGap) {
		classes.push(`gap-${flexGap}`);
	}

	if (grid.cols) {
		classes.push('grid', `grid-cols-${grid.cols}`);
	}

	const gridGap = normalizeClassToken(grid.gap);

	if (gridGap) {
		classes.push(`gap-${gridGap}`);
	}

	return sanitizeClassList(classes);
}

export function getRuntimeDirective(
	block: BlockSchema
): RuntimeDirective | undefined {
	const rawDirective = block.props?.__runtime;

	if (!rawDirective || typeof rawDirective !== 'object') {
		return undefined;
	}

	return {
		hydration: rawDirective.hydration === 'visible' ? 'visible' : undefined,
	};
}

export function resolveBlockProps(block: BlockSchema) {
	const sourceProps = {
		...(block.props ?? {}),
	};

	delete sourceProps.__runtime;

	const className = sanitizeClassList(
		[
			normalizeClass(sourceProps.class),
			resolveTailwindClasses(block.style),
		].flatMap((value) => (value ? value.split(/\s+/) : []))
	);

	return {
		...sourceProps,
		class: className || undefined,
	};
}
