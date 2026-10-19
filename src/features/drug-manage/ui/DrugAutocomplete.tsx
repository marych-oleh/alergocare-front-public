import { FieldPath, FieldValues } from 'react-hook-form';
import {
	DrugOption,
	DrugWriteFormValues,
	DrugWriteSchema,
	useDrugOptionsList,
} from '~/shared/api/endpoints/drug';
import { useDrugCategoryTreeList } from '~/shared/api/endpoints/drug/drug.queries';
import {
	CrudDictionaryAutocomplete,
	CrudDictionaryAutocompleteProps,
} from '~/shared/ui/dictionary-autocomplete/CrudDictionaryAutocomplete';
import {
	useCreateDrugMutation,
	useDeleteDrugMutation,
	useUpdateDrugMutation,
} from '../api/mutation';
import { DrugCategoryAutocomplete } from './DrugCategoryAutocomplete';

interface DrugAutocompleteProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
> extends Pick<
	CrudDictionaryAutocompleteProps<
		DrugOption,
		DrugWriteFormValues,
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
> {}

export const DrugAutocomplete = <
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
}: DrugAutocompleteProps<
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
			validationSchema={DrugWriteSchema}
			useListQuery={useDrugOptionsList}
			useCreateMutation={useCreateDrugMutation}
			useUpdateMutation={useUpdateDrugMutation}
			useDeleteMutation={useDeleteDrugMutation}
			renderExtraFields={(control) => (
				<DrugCategoryAutocomplete
					name="categoryId"
					label="Категорія"
					control={control}
					multiple={false}
					leafOnly
					useListQuery={useDrugCategoryTreeList}
				/>
			)}
			getExtraDefaultValues={(option) => ({
				categoryId: option?.categoryId || '',
			})}
		/>
	);
};
