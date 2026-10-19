export const UNITS = {
	MINUTES: 60,
	HOURS: 3600,
	DAYS: 86400,
	WEEKS: 604800,
} as const;

export type DurationUnit = keyof typeof UNITS;

export const UNIT_LABELS: Record<DurationUnit, string> = {
	MINUTES: 'хв.',
	HOURS: 'год.',
	DAYS: 'дн.',
	WEEKS: 'тиж.',
};
