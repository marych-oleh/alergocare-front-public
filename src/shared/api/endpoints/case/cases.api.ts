import { api } from '../../api.instance';
import { PaginatedCasesRequest } from './cases.model';
import { CaseDetailSchema, PaginatedCasesSchema } from './cases.schema';

export const casesAPI = {
	async getCases(params: PaginatedCasesRequest) {
		return await api.post({
			url: '/cases/search',
			schema: PaginatedCasesSchema,
			data: params,
		});
	},

	async getPatientCases(patientId: string, params: PaginatedCasesRequest) {
		return await api.post({
			url: `/cases/patients/${patientId}/search`,
			schema: PaginatedCasesSchema,
			data: params,
		});
	},

	async getCaseById(id: string) {
		return await api.get({
			url: `/cases/${id}`,
			schema: CaseDetailSchema,
		});
	},
};
