import { zodResolver } from '@hookform/resolvers/zod';
import Stack from '@mui/material/Stack';
import { useEffect, useId } from 'react';
import {
	Control,
	DefaultValues,
	FieldValues,
	Path,
	useForm,
} from 'react-hook-form';
import { z } from 'zod';
import { EditableField } from '../EditableField/EditableField';
import GenericDialog, {
	DefaultDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
} from '../modal/GenericDialog';
import { RHFTextField } from '../rhf/RHFTextField';

interface DictionaryFormShape extends FieldValues {
	name: string;
}

interface DictionaryFormModalProps<T extends DictionaryFormShape> {
	open: boolean;
	title: string;
	schema: z.ZodType<T, any, any>;
	defaultValues: DefaultValues<T>;
	isPending?: boolean;
	onClose: () => void;
	onSubmit: (data: T) => void;
	renderFields?: (control: Control<T>) => React.ReactNode;
}

export const DictionaryFormModal = <T extends DictionaryFormShape>({
	open,
	title,
	schema,
	defaultValues,
	isPending,
	onClose,
	onSubmit,
	renderFields,
}: DictionaryFormModalProps<T>) => {
	const formId = useId();

	const { control, handleSubmit, reset } = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues,
		mode: 'onBlur',
	});

	useEffect(() => {
		if (open) reset(defaultValues);
	}, [open, reset]);

	return (
		<GenericDialog
			open={open}
			onClose={onClose}
			onClick={(e) => e.stopPropagation()}
			keepMounted={false}
		>
			<StyledDialogTitle>{title}</StyledDialogTitle>

			<StyledDialogContent sx={{ py: 2, px: 3 }}>
				<form
					id={formId}
					onSubmit={(e) => {
						e.stopPropagation();
						handleSubmit(onSubmit)(e);
					}}
				>
					<Stack spacing={3}>
						<EditableField
							required
							control={control}
							name={'name' as Path<T>}
							label="Назва"
							disableBackground
							renderEditMode={(props) => (
								<RHFTextField {...props} autoFocus size="small" />
							)}
						/>

						{renderFields?.(control)}
					</Stack>
				</form>
			</StyledDialogContent>

			<DefaultDialogActions
				onCancel={onClose}
				submitLabel={isPending ? 'Збереження...' : 'Зберегти'}
				cancelButtonProps={{ disabled: isPending }}
				submitButtonProps={{
					form: formId,
					type: 'submit',
					disabled: isPending,
				}}
			/>
		</GenericDialog>
	);
};
