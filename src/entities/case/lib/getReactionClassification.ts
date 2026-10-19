import { UNITS } from '../model/DurationUnits';

export const getReactionClassification = (totalSeconds?: number | null) => {
	if (!totalSeconds || totalSeconds <= 0) return null;

	// Minutes and hours (< 24 hours) = Immediate
	// Days and weeks (>= 24 hours) = Delayed
	if (totalSeconds < UNITS.DAYS) {
		return { label: 'Негайна реакція', type: 'immediate' };
	}
	return { label: 'Сповільнена реакція', type: 'delayed' };
};
