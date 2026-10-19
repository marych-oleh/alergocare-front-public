import { UNITS } from '../model/DurationUnits';

export function encodedDurationToString(dur?: number | null): string {
	if (!dur) return 'Не вказано';
	if (dur % UNITS.WEEKS === 0) return `${dur / UNITS.WEEKS} тиж.`;
	if (dur % UNITS.DAYS === 0) return `${dur / UNITS.DAYS} дн.`;
	if (dur % UNITS.HOURS === 0) return `${dur / UNITS.HOURS} год.`;
	return `${dur / UNITS.MINUTES} хв.`;
}
