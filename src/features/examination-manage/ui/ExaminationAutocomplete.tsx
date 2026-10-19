import { FieldPath, FieldValues } from 'react-hook-form';
import {
	ExaminationOption,
	ExaminationWriteFormValues,
	ExaminationWriteSchema,
	useExaminationOptionsList,
} from '~/shared/api/endpoints/examination';
import {
	CrudDictionaryAutocomplete,
	CrudDictionaryAutocompleteProps,
} from '~/shared/ui/dictionary-autocomplete/CrudDictionaryAutocomplete';
import {
	useCreateExaminationMutation,
	useUpdateExaminationMutation,
} from '../api/mutation';
import { ExaminationTypeConstructor } from './ExaminationTypeConstructor';

interface ExaminationAutocompleteProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
> extends Pick<
	CrudDictionaryAutocompleteProps<
		ExaminationOption,
		ExaminationWriteFormValues,
		TFieldValues,
		TContext,
		TTransformedValues,
		TName,
		Multiple
	>,
	| 'name'
	| 'control'
	| 'label'
	| 'multiple'
	| 'disableHelperText'
	| 'rules'
	| 'shouldUnregister'
	| 'disabled'
	| 'required'
> {}

export const ExaminationAutocomplete = <
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
>({
	name,
	control,
	rules,
	shouldUnregister,
	disabled,
	label,
	disableHelperText,

	multiple = true,
	...autocompleteProps
}: ExaminationAutocompleteProps<
	TFieldValues,
	TContext,
	TTransformedValues,
	TName,
	Multiple
>) => {
	return (
		<CrudDictionaryAutocomplete
			{...autocompleteProps}
			{...{
				name,
				control,
				rules,
				shouldUnregister,
				disabled,
				disableHelperText,
				label,
			}}
			multiple={multiple}
			validationSchema={ExaminationWriteSchema}
			useListQuery={useExaminationOptionsList}
			useCreateMutation={useCreateExaminationMutation}
			useUpdateMutation={useUpdateExaminationMutation}
			// useDeleteMutation={useDeleteExaminationMutation}
			renderExtraFields={(modalControl) => (
				<ExaminationTypeConstructor name="type" control={modalControl} />
			)}
			getExtraDefaultValues={(option) => ({
				type: option?.type.split(',') || ['number'],
			})}
		/>
	);
};
