import { api } from '~/shared/api';
import {
	CaseDetailSchema,
	CaseWritePayload,
} from '~/shared/api/endpoints/case';

export const createCase = async (payload: CaseWritePayload) => {
	return await api.post({
		url: '/cases',
		data: payload,
		schema: CaseDetailSchema,
	});
};
