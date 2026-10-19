import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { ConfirmationDialog } from '~/shared/ui/modal/ConfirmationDialog';
import { useDeleteTestingMutation } from '../api/mutation';

interface TestingDeleteActionProps {
	testingId: string;
	onSuccess?: () => void;
}

export const TestingDeleteAction = ({
	testingId,
	onSuccess,
}: TestingDeleteActionProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const { mutate, isPending } = useDeleteTestingMutation(testingId, {
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
				Видалення алерготестування призведе до повної втрати всіх пов'язаних
				даних.
			</Typography>
			<Button
				variant="contained"
				color="error"
				onClick={() => setIsOpen(true)}
			>
				Видалити алерготестування
			</Button>

			<ConfirmationDialog
				open={isOpen}
				title="Видалити алерготестування?"
				description="Цю дію неможливо скасувати."
				isLoading={isPending}
				onClose={() => setIsOpen(false)}
				onConfirm={mutate}
			/>
		</Box>
	);
};
