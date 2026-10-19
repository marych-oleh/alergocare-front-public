import { Button } from '@mui/material';
import { PatientShort } from '~/shared/api/endpoints/patient';

interface Props {
	patient: PatientShort;
	selectedPatientId?: string;
	onSelect: (patient: PatientShort) => void;
}

export const SelectPatientTableAction = ({
	patient,
	selectedPatientId,
	onSelect,
}: Props) => {
	const isSelected = selectedPatientId === patient.id;

	return (
		<Button
			variant="outlined"
			size="small"
			disabled={isSelected}
			onClick={() => onSelect(patient)}
		>
			{isSelected ? 'Обрано' : 'Вибрати'}
		</Button>
	);
};
