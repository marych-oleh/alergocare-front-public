import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import {
	Control,
	FieldPath,
	FieldValues,
	useController,
} from 'react-hook-form';
import { z } from 'zod';
import { AppError } from '~/shared/api';
import { BaseOption } from '~/shared/api/common';
import { ConfirmationDialog } from '../modal/ConfirmationDialog';
import { DictionaryFormModal } from './DictionaryFormModal';
import {
	GenericDictionaryAutocomplete,
	GenericDictionaryAutocompleteProps,
} from './GenericDictionaryAutocomplete';

export interface CrudDictionaryAutocompleteProps<
	TOption extends BaseOption,
	TFormValues extends FieldValues,
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
> extends Omit<
	GenericDictionaryAutocompleteProps<
		TOption,
		TFieldValues,
		TContext,
		TTransformedValues,
		TName,
		Multiple
	>,
	'onCreateRequest' | 'onEditRequest' | 'onDeleteRequest' | 'options'
> {
	validationSchema: z.ZodType<TFormValues>;

	/** Slot to render extra fields in the creation/edit form */
	renderExtraFields?: (control: Control<TFormValues>) => React.ReactNode;
	/** Helper to map an existing option's data to the form's default values */
	getExtraDefaultValues?: (option?: TOption) => Partial<TFormValues>;

	// TanStack Query/Mutation Hooks Passed from the Feature layer
	useListQuery: () => UseQueryResult<TOption[], AppError>;
	useCreateMutation?: () => UseMutationResult<TOption, AppError, TFormValues>;
	useUpdateMutation?: () => UseMutationResult<
		TOption,
		AppError,
		{ id: string; data: TFormValues }
	>;
	useDeleteMutation?: () => UseMutationResult<null, AppError, string>;
}

export const CrudDictionaryAutocomplete = <
	TOption extends BaseOption,
	TFormValues extends FieldValues,
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

	validationSchema,
	renderExtraFields,
	getExtraDefaultValues,
	useListQuery,
	useCreateMutation,
	useUpdateMutation,
	useDeleteMutation,

	...autocompleteProps
}: CrudDictionaryAutocompleteProps<
	TOption,
	TFormValues,
	TFieldValues,
	TContext,
	TTransformedValues,
	TName,
	Multiple
>) => {
	const { field } = useController({ name, control });

	// Initialize the hooks conditionally (if provided)
	const { data: options = [], isLoading } = useListQuery();
	const createMutation = useCreateMutation ? useCreateMutation() : null;
	const updateMutation = useUpdateMutation ? useUpdateMutation() : null;
	const deleteMutation = useDeleteMutation ? useDeleteMutation() : null;

	const [modalConfig, setModalConfig] = useState<{
		isOpen: boolean;
		mode: 'create' | 'edit';
		initialName: string;
		targetId?: string;
	}>({ isOpen: false, mode: 'create', initialName: '' });

	const formDefaultValues = useMemo(() => {
		const base = { name: modalConfig.initialName } as any;
		if (modalConfig.mode === 'edit' && modalConfig.targetId) {
			const target = options.find((o) => o.id === modalConfig.targetId);
			return { ...base, ...getExtraDefaultValues?.(target) };
		}
		return { ...base, ...getExtraDefaultValues?.() };
	}, [modalConfig, options, getExtraDefaultValues]);

	const [deleteTarget, setDeleteTarget] = useState<TOption | null>(null);

	const isMutating =
		createMutation?.isPending ||
		updateMutation?.isPending ||
		deleteMutation?.isPending;

	const handleCreateSubmit = async (data: TFormValues) => {
		if (!createMutation) return;
		const newEntity = await createMutation.mutateAsync(data);

		if (autocompleteProps.multiple) {
			const safeArray = Array.isArray(field.value) ? field.value : [];
			field.onChange([...safeArray, newEntity]);
		} else {
			field.onChange(newEntity);
		}
		setModalConfig({ ...modalConfig, isOpen: false });
	};

	const handleUpdateSubmit = async (data: TFormValues) => {
		if (!updateMutation || !modalConfig.targetId) return;
		await updateMutation.mutateAsync({ id: modalConfig.targetId, data });
		setModalConfig({ ...modalConfig, isOpen: false });
	};

	const handleDeleteConfirm = async () => {
		if (!deleteTarget?.id || !deleteMutation) return;
		await deleteMutation.mutateAsync(deleteTarget.id);
		setDeleteTarget(null);
	};

	return (
		<>
			<GenericDictionaryAutocomplete
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
				options={options}
				loading={isLoading}
				onCreateRequest={
					createMutation ?
						(inputValue) =>
							setModalConfig({
								isOpen: true,
								mode: 'create',
								initialName: inputValue,
							})
					:	undefined
				}
				onEditRequest={
					updateMutation ?
						(option) =>
							setModalConfig({
								isOpen: true,
								mode: 'edit',
								initialName: option.name,
								targetId: option.id,
							})
					:	undefined
				}
				onDeleteRequest={
					deleteMutation ? (option) => setDeleteTarget(option) : undefined
				}
			/>

			<DictionaryFormModal
				open={modalConfig.isOpen}
				title={modalConfig.mode === 'create' ? 'Створити' : 'Редагувати'}
				schema={validationSchema}
				defaultValues={formDefaultValues}
				renderFields={renderExtraFields}
				isPending={isMutating}
				onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
				onSubmit={
					modalConfig.mode === 'create' ?
						handleCreateSubmit
					:	handleUpdateSubmit
				}
			/>

			<ConfirmationDialog
				open={!!deleteTarget}
				title="Підтвердження видалення"
				description={`Ви впевнені, що хочете видалити '${deleteTarget?.name}'?`}
				isLoading={deleteMutation?.isPending}
				onClose={() => setDeleteTarget(null)}
				onConfirm={handleDeleteConfirm}
			/>
		</>
	);
};
