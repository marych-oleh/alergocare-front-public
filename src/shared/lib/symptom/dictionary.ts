import { SymptomCategory } from './categories';

export const SYMPTOM_CATEGORY_LABELS: Record<SymptomCategory, string> = {
	[SymptomCategory.CARDIOVASCULAR]: 'Дихальна система',
	[SymptomCategory.DERMATOLOGICAL]: 'Шкірні покриви',
	[SymptomCategory.GASTROINTESTINAL]: 'ШКТ',
	[SymptomCategory.RESPIRATORY]: 'ССС',
};

export type SymptomCategoryOption = {
	code: SymptomCategory;
	label: string;
};

export const SYMPTOM_CATEGORY_OPTIONS: SymptomCategoryOption[] = Object.entries(
	SYMPTOM_CATEGORY_LABELS
).map(([code, label]) => ({
	code: code as SymptomCategory,
	label,
}));

export function getLabelBySymptomCategory(category: SymptomCategory): string {
	return SYMPTOM_CATEGORY_LABELS[category];
}
