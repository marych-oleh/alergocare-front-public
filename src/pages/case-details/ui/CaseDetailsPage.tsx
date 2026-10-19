import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCaseUpdateForm } from '~/features/case/edit';
import { PatientDetail, PatientShort } from '~/shared/api/endpoints/patient';
import Loader from '~/shared/ui/Loader/Loader';
import {
	PatientsTableModalWidget,
	SelectPatientTableAction,
	usePatientSelector,
} from '~/widgets/patients-table';
import { Route } from '../+types';
import { CaseEditForm } from './CaseEditForm';
import { CaseFormPatientField } from './CaseFormPatientField';

export const CaseDetailsPage = ({ params }: Route.ComponentProps) => {
	const navigate = useNavigate();
	const handleClose = () => {
		navigate('../', { relative: 'path' });
	};

	const caseUpdateProps = useCaseUpdateForm({ caseId: params.caseID });
	const patientSelector = usePatientSelector();

	useEffect(() => {
		if (caseUpdateProps.loadedCase?.patient) {
			patientSelector.setSelectedPatient(caseUpdateProps.loadedCase.patient);
		}
	}, [caseUpdateProps.loadedCase]);

	const handlePatientSelect = (patient: PatientShort | PatientDetail) => {
		caseUpdateProps.form.setValue('patientId', patient.id, {
			shouldValidate: true,
		});
		patientSelector.setSelectedPatient(patient);
		patientSelector.close();
	};

	if (caseUpdateProps.isLoading) return <Loader />;

	return (
		<>
			<CaseEditForm
				onClose={handleClose}
				caseId={params.caseID}
				caseUpdateProps={caseUpdateProps}
				patientFieldRenderer={() => (
					<CaseFormPatientField
						control={caseUpdateProps.form.control}
						selectedPatient={patientSelector.selectedPatient}
						onOpenSelector={patientSelector.open}
					/>
				)}
			/>
			<PatientsTableModalWidget
				open={patientSelector.isOpen}
				onClose={patientSelector.close}
				title="Оберіть пацієнта"
				onPatientCreated={handlePatientSelect}
				renderActions={(patient) => (
					<SelectPatientTableAction
						patient={patient}
						selectedPatientId={patientSelector.selectedPatient?.id}
						onSelect={handlePatientSelect}
					/>
				)}
			/>
		</>
	);
};
