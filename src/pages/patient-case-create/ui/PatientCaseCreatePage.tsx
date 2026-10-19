import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PatientShortView } from '~/entities/patient';
import { useCaseCreateForm } from '~/features/case/create';
import { patientsQueries } from '~/shared/api/endpoints/patient';
import Loader from '~/shared/ui/Loader/Loader';
import { CaseCreateModal } from '~/widgets/case-create';
import { Route } from '../+types';

export const PatientCaseCreatePage = ({ params }: Route.ComponentProps) => {
	const [isModalOpen, setModalOpen] = useState(true);
	const navigate = useNavigate();

	const { data: patient, isLoading } = useQuery(
		patientsQueries.detail(params.patientID)
	);

	// Pass the patient ID immediately to the form
	const caseFormProps = useCaseCreateForm({
		initialValues: { patientId: params.patientID },
	});

	const handleClose = () => {
		setModalOpen(false);
		navigate('../', { relative: 'path' });
	};

	if (isLoading || !patient) return <Loader />;

	return (
		<CaseCreateModal
			open={isModalOpen}
			onClose={handleClose}
			caseCreateProps={caseFormProps}
			patientFieldRenderer={() => (
				<PatientShortView patient={patient} sx={{ flex: 1 }} />
			)}
		/>
	);
};
