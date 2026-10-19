import { Button, Stack } from '@mui/material';
import { Control } from 'react-hook-form';
import { PatientShortView } from '~/entities/patient';
import {
	CaseWriteFormValues,
	CaseWritePayload,
} from '~/shared/api/endpoints/case';
import { PatientShort } from '~/shared/api/endpoints/patient';
import { EditableField } from '~/shared/ui/EditableField/EditableField';

interface Props {
	control: Control<CaseWriteFormValues, any, CaseWritePayload>;
	selectedPatient: PatientShort | null;
	onOpenSelector: () => void;
}

export const CaseFormPatientField = ({
	control,
	selectedPatient,
	onOpenSelector,
}: Props) => {
	return (
		<EditableField
			name="patientId"
			required
			control={control}
			label="Пацієнт"
			renderEditMode={() => (
				<Stack
					direction={{ sm: 'row' }}
					alignItems={{ sm: 'center' }}
					gap={2}
				>
					{selectedPatient && (
						<PatientShortView
							patient={selectedPatient}
							sx={{ flex: 1 }}
						/>
					)}
					<Button
						size="small"
						color="success"
						variant="contained"
						onClick={onOpenSelector}
					>
						{selectedPatient ? 'Змінити пацієнта' : 'Обрати пацієнта'}
					</Button>
				</Stack>
			)}
		/>
	);
};
