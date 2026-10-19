import { api } from '../../api.instance';
import { PaginatedTestingsRequest } from './testing.model';
import { PaginatedTestingsSchema, TestingDetailSchema } from './testing.schema';

export const testingAPI = {
	async getCaseTestings(caseId: string, params: PaginatedTestingsRequest) {
		return await api.post({
			url: `/testings/cases/${caseId}/search`,
			schema: PaginatedTestingsSchema,
			data: params,
		});
	},

	async getTestingById(id: string) {
		return await api.get({
			url: `/testings/${id}`,
			schema: TestingDetailSchema,
		});
	},
};
