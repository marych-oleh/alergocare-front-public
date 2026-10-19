import { FieldPath, FieldValues } from 'react-hook-form';
import {
	ComorbidityOption,
	ComorbidityWriteFormValues,
	ComorbidityWriteSchema,
	useComorbidityOptionsList,
} from '~/shared/api/endpoints/comorbidity';
import {
	CrudDictionaryAutocomplete,
	CrudDictionaryAutocompleteProps,
} from '~/shared/ui/dictionary-autocomplete/CrudDictionaryAutocomplete';
import {
	useCreateComorbidityMutation,
	useDeleteComorbidityMutation,
	useUpdateComorbidityMutation,
} from '../api/mutation';

interface ComorbidityAutocompleteProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
> extends Pick<
	CrudDictionaryAutocompleteProps<
		ComorbidityOption,
		ComorbidityWriteFormValues,
		TFieldValues,
		TContext,
		TTransformedValues,
		TName,
		Multiple
	>,
	'name' | 'control' | 'label' | 'multiple' | 'disableHelperText'
> {}

export const ComorbidityAutocomplete = <
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
}: ComorbidityAutocompleteProps<
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
			validationSchema={ComorbidityWriteSchema}
			useListQuery={useComorbidityOptionsList}
			useCreateMutation={useCreateComorbidityMutation}
			useUpdateMutation={useUpdateComorbidityMutation}
			useDeleteMutation={useDeleteComorbidityMutation}
		/>
	);
};
