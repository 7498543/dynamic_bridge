export const BLOCK_COMPONENT_NAME_PATTERN =
	/^[A-Z][A-Za-z0-9]*(?:[._-][A-Za-z0-9]+)*$/;
export const SLOT_NAME_PATTERN = /^(default|[a-z][A-Za-z0-9_-]*)$/;
export const RUNTIME_HYDRATION_VALUES = ['visible'] as const;
export const RESERVED_BLOCK_PROP_NAMES = ['__runtime'] as const;

export function isValidBlockComponentName(name: string) {
	return BLOCK_COMPONENT_NAME_PATTERN.test(name);
}

export function isValidSlotName(name: string) {
	return SLOT_NAME_PATTERN.test(name);
}
