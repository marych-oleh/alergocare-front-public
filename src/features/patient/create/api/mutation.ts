import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PatientDetail } from '~/shared/api/endpoints/patient';
import { createPatient } from './api';

interface UseCreatePatientOptions {
	onSuccess?: (data: PatientDetail) => void;
}

export const createPatientMutationKey = ['createPatient'];

export const useCreatePatientMutation = (options?: UseCreatePatientOptions) => {
	return useMutation({
		mutationKey: createPatientMutationKey,
		mutationFn: createPatient,
		onSuccess: (newPatient) => {
			toast.success(`Пацієнта '${newPatient.surname}' створено`);
			options?.onSuccess?.(newPatient);
		},
	});
};
