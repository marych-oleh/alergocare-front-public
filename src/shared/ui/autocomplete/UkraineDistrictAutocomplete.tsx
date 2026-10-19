import { FieldPath, FieldValues } from 'react-hook-form';
import { LocationNode, UKRAINE_DISTRICT_OPTIONS } from '~/shared/lib/location';
import {
	RHFStaticAutocomplete,
	RHFStaticAutocompleteProps,
} from '../rhf/RHFStaticAutocomplete';

export const UkraineDistrictAutocomplete = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
	props: Omit<
		RHFStaticAutocompleteProps<LocationNode, TFieldValues, any, any, TName>,
		'options'
	>
) => (
	<RHFStaticAutocomplete
		{...props}
		options={UKRAINE_DISTRICT_OPTIONS}
		label={props.label}
	/>
);
