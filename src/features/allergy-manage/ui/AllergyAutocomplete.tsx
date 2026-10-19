import { FieldPath, FieldValues } from 'react-hook-form';
import {
	AllergyOption,
	AllergyWriteFormValues,
	AllergyWriteSchema,
	useAllergyOptionsList,
} from '~/shared/api/endpoints/allergy';
import {
	CrudDictionaryAutocomplete,
	CrudDictionaryAutocompleteProps,
} from '~/shared/ui/dictionary-autocomplete/CrudDictionaryAutocomplete';
import {
	useCreateAllergyMutation,
	useDeleteAllergyMutation,
	useUpdateAllergyMutation,
} from '../api/mutation';

interface AllergyAutocompleteProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
> extends Pick<
	CrudDictionaryAutocompleteProps<
		AllergyOption,
		AllergyWriteFormValues,
		TFieldValues,
		TContext,
		TTransformedValues,
		TName,
		Multiple
	>,
	'name' | 'control' | 'label' | 'multiple' | 'disableHelperText'
> {}

export const AllergyAutocomplete = <
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
>({
	name,
	control,
	label,
	multiple = true,
	...autocompleteProps
}: AllergyAutocompleteProps<
	TFieldValues,
	TContext,
	TTransformedValues,
	TName,
	Multiple
>) => {
	return (
		<CrudDictionaryAutocomplete
			{...autocompleteProps}
			name={name}
			control={control}
			label={label}
			multiple={multiple}
			validationSchema={AllergyWriteSchema}
			useListQuery={useAllergyOptionsList}
			useCreateMutation={useCreateAllergyMutation}
			useUpdateMutation={useUpdateAllergyMutation}
			useDeleteMutation={useDeleteAllergyMutation}
		/>
	);
};
