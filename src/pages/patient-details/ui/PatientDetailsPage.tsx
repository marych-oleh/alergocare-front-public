import { useNavigate } from 'react-router';
import { PatientDeleteAction } from '~/features/patient/delete';
import { PatientEditForm } from '~/features/patient/edit';
import { Route } from '../+types';

export const PatientDetailsPage = ({ params }: Route.ComponentProps) => {
	const navigate = useNavigate();
	const handleClose = () => {
		navigate('../', { relative: 'path' });
	};

	return (
		<PatientEditForm
			patientId={params.patientID}
			additionalElements={
				<PatientDeleteAction
					patientId={params.patientID}
					onSuccess={handleClose}
				/>
			}
		/>
	);
};
