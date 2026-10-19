import { FieldPath, FieldValues } from 'react-hook-form';
import {
	PreliminaryDiagnoseOption,
	PreliminaryDiagnoseWriteFormValues,
	PreliminaryDiagnoseWriteSchema,
	usePreliminaryDiagnoseOptionsList,
} from '~/shared/api/endpoints/preliminary-diagnose';
import {
	CrudDictionaryAutocomplete,
	CrudDictionaryAutocompleteProps,
} from '~/shared/ui/dictionary-autocomplete/CrudDictionaryAutocomplete';
import {
	useCreatePreliminaryDiagnoseMutation,
	useDeletePreliminaryDiagnoseMutation,
	useUpdatePreliminaryDiagnoseMutation,
} from '../api/mutation';

interface PreliminaryDiagnoseAutocompleteProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
> extends Pick<
	CrudDictionaryAutocompleteProps<
		PreliminaryDiagnoseOption,
		PreliminaryDiagnoseWriteFormValues,
		TFieldValues,
		TContext,
		TTransformedValues,
		TName,
		Multiple
	>,
	'name' | 'control' | 'label' | 'multiple' | 'disableHelperText'
> {}

export const PreliminaryDiagnoseAutocomplete = <
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
}: PreliminaryDiagnoseAutocompleteProps<
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
			validationSchema={PreliminaryDiagnoseWriteSchema}
			useListQuery={usePreliminaryDiagnoseOptionsList}
			useCreateMutation={useCreatePreliminaryDiagnoseMutation}
			useUpdateMutation={useUpdatePreliminaryDiagnoseMutation}
			useDeleteMutation={useDeletePreliminaryDiagnoseMutation}
		/>
	);
};
