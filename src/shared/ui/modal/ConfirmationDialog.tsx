import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import {
	DefaultDialogActions,
	StyledDialog,
	StyledDialogContent,
	StyledDialogTitle,
} from './GenericDialog';

interface ConfirmationDialogProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	children?: ReactNode;
	description?: ReactNode;
	isLoading?: boolean;
	confirmText?: string;
	cancelText?: string;
}

export const ConfirmationDialog = ({
	open,
	onClose,
	onConfirm,
	title,
	children,
	description,
	isLoading,
	confirmText = 'Видалити',
	cancelText = 'Скасувати',
}: ConfirmationDialogProps) => {
	return (
		<StyledDialog open={open} onClose={onClose} maxWidth="sm">
			<StyledDialogTitle>{title}</StyledDialogTitle>

			<StyledDialogContent sx={{ px: 2, py: 1 }}>
				{description && (
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ mb: children ? 2 : 0 }}
					>
						{description}
					</Typography>
				)}

				{typeof children === 'string' ?
					<Typography variant="h2">{children}</Typography>
				:	children}
			</StyledDialogContent>

			<DefaultDialogActions
				onCancel={onClose}
				submitLabel={confirmText}
				cancelLabel={cancelText}
				submitButtonProps={{
					color: 'error',
					onClick: onConfirm,
					loading: isLoading,
				}}
			/>
		</StyledDialog>
	);
};
