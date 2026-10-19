import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PatientWritePayload } from '~/shared/api/endpoints/patient';
import { updatePatient } from './api';

export const useUpdatePatientMutation = (patientId: string) => {
	return useMutation({
		mutationFn: (data: PatientWritePayload) => updatePatient(patientId, data),
		onSuccess: async (editted) => {
			toast.success(`Пацієнта '${editted.surname}' оновлено`);
		},
	});
};
