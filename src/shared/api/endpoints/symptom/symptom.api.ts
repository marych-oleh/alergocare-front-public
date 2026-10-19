import z from 'zod';
import { api } from '../../api.instance';
import { SymptomOptionSchema, SymptomWritePayload } from './symptom.schema';

export const symptomAPI = {
	async getSymptoms() {
		return await api.get({
			url: '/symptoms',
			schema: z.array(SymptomOptionSchema),
		});
	},

	async getSymptom(id: string) {
		return await api.get({
			url: `/symptoms/${id}`,
			schema: SymptomOptionSchema,
		});
	},

	async deleteSymptom(id: string) {
		return await api.delete<null>({
			url: `/symptoms/${id}`,
		});
	},

	async updateSymptom(id: string, data: SymptomWritePayload) {
		return await api.patch({
			url: `/symptoms/${id}`,
			schema: SymptomOptionSchema,
			data,
		});
	},

	async createSymptom(data: SymptomWritePayload) {
		return await api.post({
			url: `/symptoms`,
			schema: SymptomOptionSchema,
			data,
		});
	},
};
