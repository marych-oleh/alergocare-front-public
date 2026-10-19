import z from 'zod';
import { api } from '../../api.instance';
import { AllergyOptionSchema, AllergyWritePayload } from './allergy.schema';

export const allergyAPI = {
	async getAllergies() {
		return await api.get({
			url: '/allergies',
			schema: z.array(AllergyOptionSchema),
		});
	},

	async getAllergy(id: string) {
		return await api.get({
			url: `/allergies/${id}`,
			schema: AllergyOptionSchema,
		});
	},

	async deleteAllergy(id: string) {
		return await api.delete<null>({
			url: `/allergies/${id}`,
		});
	},

	async updateAllergy(id: string, data: AllergyWritePayload) {
		return await api.patch({
			url: `/allergies/${id}`,
			schema: AllergyOptionSchema,
			data,
		});
	},

	async createAllergy(data: AllergyWritePayload) {
		return await api.post({
			url: `/allergies`,
			schema: AllergyOptionSchema,
			data,
		});
	},
};
