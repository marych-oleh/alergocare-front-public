import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCaseCreateForm } from '~/features/case/create';
import { PatientDetail, PatientShort } from '~/shared/api/endpoints/patient';
import { CaseCreateModal } from '~/widgets/case-create';
import {
	PatientsTableModalWidget,
	SelectPatientTableAction,
} from '~/widgets/patients-table';
import { usePatientSelector } from '~/widgets/patients-table/';
import { CaseFormPatientField } from './CaseFormPatientField';

export const CaseCreatePage = () => {
	const [isModalOpen, setModalOpen] = useState(true);
	const navigate = useNavigate();

	const caseFormProps = useCaseCreateForm();
	const patientSelector = usePatientSelector();

	const handleClose = () => {
		setModalOpen(false);
		navigate('../', { relative: 'path' });
	};

	const handlePatientSelect = (patient: PatientShort | PatientDetail) => {
		caseFormProps.form.setValue('patientId', patient.id, {
			shouldValidate: true,
		});
		patientSelector.setSelectedPatient(patient);
		patientSelector.close();
	};

	return (
		<>
			<CaseCreateModal
				open={isModalOpen}
				onClose={handleClose}
				caseCreateProps={caseFormProps}
				patientFieldRenderer={() => (
					<CaseFormPatientField
						control={caseFormProps.form.control}
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
