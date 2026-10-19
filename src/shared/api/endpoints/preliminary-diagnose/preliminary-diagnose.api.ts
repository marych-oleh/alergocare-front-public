import z from 'zod';
import { api } from '../../api.instance';
import {
	PreliminaryDiagnoseOptionSchema,
	PreliminaryDiagnoseWritePayload,
} from './preliminary-diagnose.schema';

export const preliminaryDiagnoseAPI = {
	async getPreliminaryDiagnoses() {
		return await api.get({
			url: '/preliminary-diagnoses',
			schema: z.array(PreliminaryDiagnoseOptionSchema),
		});
	},

	async getPreliminaryDiagnose(id: string) {
		return await api.get({
			url: `/preliminary-diagnoses/${id}`,
			schema: PreliminaryDiagnoseOptionSchema,
		});
	},

	async deletePreliminaryDiagnose(id: string) {
		return await api.delete<null>({
			url: `/preliminary-diagnoses/${id}`,
		});
	},

	async updatePreliminaryDiagnose(
		id: string,
		data: PreliminaryDiagnoseWritePayload
	) {
		return await api.patch({
			url: `/preliminary-diagnoses/${id}`,
			schema: PreliminaryDiagnoseOptionSchema,
			data,
		});
	},

	async createPreliminaryDiagnose(data: PreliminaryDiagnoseWritePayload) {
		return await api.post({
			url: `/preliminary-diagnoses`,
			schema: PreliminaryDiagnoseOptionSchema,
			data,
		});
	},
};
