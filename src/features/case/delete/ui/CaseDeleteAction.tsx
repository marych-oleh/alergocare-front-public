import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { ConfirmationDialog } from '~/shared/ui/modal/ConfirmationDialog';
import { useDeleteCaseMutation } from '../api/mutation';

interface CaseDeleteActionProps {
	caseId: string;
	onSuccess?: () => void;
}

export const CaseDeleteAction = ({
	caseId,
	onSuccess,
}: CaseDeleteActionProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const { mutate, isPending } = useDeleteCaseMutation(caseId, {
		onSuccess: () => {
			setIsOpen(false);
			onSuccess?.();
		},
	});

	return (
		<Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider' }}>
			<Typography variant="h6" color="error" gutterBottom>
				Небезпечна зона
			</Typography>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
				Видалення звернення призведе до повної втрати всіх пов'язаних даних.
			</Typography>
			<Button
				variant="contained"
				color="error"
				onClick={() => setIsOpen(true)}
			>
				Видалити звернення
			</Button>

			<ConfirmationDialog
				open={isOpen}
				title="Видалити звернення?"
				description="Цю дію неможливо скасувати."
				isLoading={isPending}
				onClose={() => setIsOpen(false)}
				onConfirm={mutate}
			/>
		</Box>
	);
};
