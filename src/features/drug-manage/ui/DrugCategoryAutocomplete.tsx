import { Box, TextField } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { AppError } from '~/shared/api';
import { DrugCategoryTreeNode } from '~/shared/api/endpoints/drug';
import { findNodeNameById, TreeItemNode } from '~/shared/lib/tree';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import GenericDialog, {
	DefaultDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
} from '~/shared/ui/modal/GenericDialog';
import { RHFTextField } from '~/shared/ui/rhf/RHFTextField';
import { CustomizedTreeView } from '~/shared/ui/tree/CustomizedTreeView';

interface DrugCategoryAutocompleteProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label: string;
	multiple?: boolean;
	leafOnly?: boolean;
	useListQuery: () => UseQueryResult<DrugCategoryTreeNode[], AppError>;
}

export const DrugCategoryAutocomplete = <T extends FieldValues>({
	name,
	control,
	label,
	useListQuery,
	leafOnly = false,
	multiple = false,
}: DrugCategoryAutocompleteProps<T>) => {
	const {
		field: { value, onChange },
	} = useController({ name, control });

	const { data: categories = [], isLoading } = useListQuery();
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [localSelectedIds, setLocalSelectedIds] = useState<string[]>([]);

	// objects to ids
	const handleSave = () => {
		if (multiple) {
			onChange(localSelectedIds);
		} else {
			onChange(localSelectedIds[0] || null);
		}
		setSearchTerm('');
		setIsOpen(false);
	};

	const handleClose = () => {
		setSearchTerm('');
		setIsOpen(false);
	};

	const isItemSelectionDisabled = useCallback(
		(item: TreeItemNode): boolean => {
			if (!leafOnly) return false;
			return !item.children || item.children.length !== 0;
		},
		[leafOnly]
	);

	const displayValue = useMemo(() => {
		if (isLoading) return 'Завантаження...';
		const val = value as any;
		const ids = Array.isArray(val) ? val : [val];

		return ids
			.map((v) => {
				const id = typeof v === 'string' ? v : v?.id;
				return id ? findNodeNameById(categories, id) : null;
			})
			.filter(Boolean)
			.join(', ');
	}, [value, categories, isLoading]);

	return (
		<>
			<Box
				onClick={() => setIsOpen(true)}
				sx={{ cursor: 'pointer', width: '100%' }}
			>
				<EditableField
					name={name}
					control={control}
					required
					disableBackground
					label="Категорія препарату"
					renderEditMode={(props) => (
						<RHFTextField
							{...props}
							placeholder="Оберіть категорію..."
							slotProps={{
								input: { readOnly: true, value: displayValue },
							}}
							sx={{ pointerEvents: 'none' }}
						/>
					)}
				/>
			</Box>

			<GenericDialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				keepMounted
			>
				<StyledDialogTitle>{label}</StyledDialogTitle>

				<StyledDialogContent sx={{ minHeight: '70vh', p: 1 }}>
					<TextField
						size="small"
						placeholder="Пошук..."
						fullWidth
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onClick={(e) => e.stopPropagation()}
					/>
					<CustomizedTreeView
						multiSelect={multiple}
						items={categories}
						searchTerm={searchTerm}
						selectedItems={
							multiple ? localSelectedIds : localSelectedIds[0] || null
						}
						onSelectedItemsChange={(_, ids) => {
							const normalized =
								Array.isArray(ids) ? ids
								: ids ? [ids]
								: [];
							setLocalSelectedIds(normalized);
						}}
						isItemSelectionDisabled={isItemSelectionDisabled}
						checkboxSelection
					/>
				</StyledDialogContent>

				<DefaultDialogActions
					onCancel={handleClose}
					submitButtonProps={{ onClick: handleSave }}
					submitLabel="Зберегти"
				/>
			</GenericDialog>
		</>
	);
};
