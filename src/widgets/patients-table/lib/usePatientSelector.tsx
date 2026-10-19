import { useState } from 'react';
import { PatientShort } from '~/shared/api/endpoints/patient';

export const usePatientSelector = (
	preselectedPatient: PatientShort | null = null
) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedPatient, setSelectedPatient] = useState<PatientShort | null>(
		preselectedPatient
	);

	return {
		isOpen,
		open: () => setIsOpen(true),
		close: () => setIsOpen(false),
		selectedPatient,
		setSelectedPatient,
	};
};
