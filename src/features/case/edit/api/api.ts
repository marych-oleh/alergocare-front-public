import { api } from '~/shared/api';
import {
	CaseDetailSchema,
	CaseWritePayload,
} from '~/shared/api/endpoints/case';

export const updateCase = async (id: string, payload: CaseWritePayload) => {
	return await api.patch({
		url: `/cases/${id}`,
		data: payload,
		schema: CaseDetailSchema,
	});
};
