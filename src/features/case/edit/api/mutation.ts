import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CaseWritePayload } from '~/shared/api/endpoints/case';
import { updateCase } from './api';

export const useUpdateCaseMutation = (caseId: string) => {
	return useMutation({
		mutationFn: (data: CaseWritePayload) => updateCase(caseId, data),
		onSuccess: async (editted) => {
			toast.success(`Звернення для ${editted.patient.surname} оновлено`);
		},
	});
};
