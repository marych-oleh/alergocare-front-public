import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { ConfirmationDialog } from '~/shared/ui/modal/ConfirmationDialog';
import { useDeletePatientMutation } from '../api/mutation';

interface PatientDeleteActionProps {
	patientId: string;
	onSuccess?: () => void;
}

export const PatientDeleteAction = ({
	patientId,
	onSuccess,
}: PatientDeleteActionProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const { mutate, isPending } = useDeletePatientMutation(patientId, {
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
				Видалення пацієнта призведе до повної втрати всіх пов'язаних даних.
			</Typography>
			<Button
				variant="contained"
				color="error"
				onClick={() => setIsOpen(true)}
			>
				Видалити пацієнта
			</Button>

			<ConfirmationDialog
				open={isOpen}
				title="Видалити пацієнта?"
				description="Цю дію неможливо скасувати."
				isLoading={isPending}
				onClose={() => setIsOpen(false)}
				onConfirm={mutate}
			/>
		</Box>
	);
};
