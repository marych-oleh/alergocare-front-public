import { FieldPath, FieldValues } from 'react-hook-form';
import {
	SymptomOption,
	SymptomWriteFormValues,
	SymptomWriteSchema,
	useSymptomOptionsList,
} from '~/shared/api/endpoints/symptom';
import { getLabelBySymptomCategory } from '~/shared/lib/symptom';
import { SymptomCategoryAutocomplete } from '~/shared/ui/autocomplete/SymptomCategoryAutocomplete';
import {
	CrudDictionaryAutocomplete,
	CrudDictionaryAutocompleteProps,
} from '~/shared/ui/dictionary-autocomplete/CrudDictionaryAutocomplete';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import {
	useCreateSymptomMutation,
	useDeleteSymptomMutation,
	useUpdateSymptomMutation,
} from '../api/mutation';

interface SymptomAutocompleteProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
> extends Pick<
	CrudDictionaryAutocompleteProps<
		SymptomOption,
		SymptomWriteFormValues,
		TFieldValues,
		TContext,
		TTransformedValues,
		TName,
		Multiple
	>,
	'name' | 'control' | 'label' | 'multiple' | 'disableHelperText'
> {}

export const SymptomAutocomplete = <
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
}: SymptomAutocompleteProps<
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
			validationSchema={SymptomWriteSchema}
			useListQuery={useSymptomOptionsList}
			useCreateMutation={useCreateSymptomMutation}
			useUpdateMutation={useUpdateSymptomMutation}
			useDeleteMutation={useDeleteSymptomMutation}
			groupBy={(option) => getLabelBySymptomCategory(option.category)}
			renderExtraFields={(control) => (
				<EditableField
					name="category"
					control={control}
					required
					disableBackground
					label="Категорія симптому"
					renderEditMode={(props) => (
						<SymptomCategoryAutocomplete {...props} />
					)}
				/>
			)}
			getExtraDefaultValues={(option) => ({
				category: option?.category,
			})}
		/>
	);
};
