import { FieldPath, FieldValues } from 'react-hook-form';
import {
	RHFStaticAutocomplete,
	RHFStaticAutocompleteProps,
} from '../rhf/RHFStaticAutocomplete';
import {
	SYMPTOM_CATEGORY_OPTIONS,
	SymptomCategoryOption,
} from '~/shared/lib/symptom/dictionary';

export const SymptomCategoryAutocomplete = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
	props: Omit<
		RHFStaticAutocompleteProps<
			SymptomCategoryOption,
			TFieldValues,
			any,
			any,
			TName
		>,
		'options'
	>
) => (
	<RHFStaticAutocomplete
		{...props}
		options={SYMPTOM_CATEGORY_OPTIONS}
		label={props.label}
	/>
);
