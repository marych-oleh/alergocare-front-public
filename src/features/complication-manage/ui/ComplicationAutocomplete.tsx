import { FieldPath, FieldValues } from 'react-hook-form';
import {
	ComplicationOption,
	ComplicationWriteFormValues,
	ComplicationWriteSchema,
	useComplicationOptionsList,
} from '~/shared/api/endpoints/complication';
import {
	CrudDictionaryAutocomplete,
	CrudDictionaryAutocompleteProps,
} from '~/shared/ui/dictionary-autocomplete/CrudDictionaryAutocomplete';
import {
	useCreateComplicationMutation,
	useDeleteComplicationMutation,
	useUpdateComplicationMutation,
} from '../api/mutation';

interface ComplicationAutocompleteProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
> extends Pick<
	CrudDictionaryAutocompleteProps<
		ComplicationOption,
		ComplicationWriteFormValues,
		TFieldValues,
		TContext,
		TTransformedValues,
		TName,
		Multiple
	>,
	'name' | 'control' | 'label' | 'multiple' | 'disableHelperText'
> {}

export const ComplicationAutocomplete = <
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
}: ComplicationAutocompleteProps<
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
			validationSchema={ComplicationWriteSchema}
			useListQuery={useComplicationOptionsList}
			useCreateMutation={useCreateComplicationMutation}
			useUpdateMutation={useUpdateComplicationMutation}
			useDeleteMutation={useDeleteComplicationMutation}
		/>
	);
};
