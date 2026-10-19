import { FieldPath, FieldValues } from 'react-hook-form';
import { COUNTRY_OPTIONS, LocationNode } from '~/shared/lib/location';
import {
	RHFStaticAutocomplete,
	RHFStaticAutocompleteProps,
} from '../rhf/RHFStaticAutocomplete';

export const CountryAutocomplete = <
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
		options={COUNTRY_OPTIONS}
		label={props.label}
	/>
);
