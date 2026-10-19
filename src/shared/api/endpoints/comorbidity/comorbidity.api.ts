import z from 'zod';
import { api } from '../../api.instance';
import {
	ComorbidityOptionSchema,
	ComorbidityWritePayload,
} from './comorbidity.schema';

export const comorbidityAPI = {
	async getComorbidities() {
		return await api.get({
			url: '/comorbidities',
			schema: z.array(ComorbidityOptionSchema),
		});
	},

	async getComorbidity(id: string) {
		return await api.get({
			url: `/comorbidities/${id}`,
			schema: ComorbidityOptionSchema,
		});
	},

	async deleteComorbidity(id: string) {
		return await api.delete<null>({
			url: `/comorbidities/${id}`,
		});
	},

	async updateComorbidity(id: string, data: ComorbidityWritePayload) {
		return await api.patch({
			url: `/comorbidities/${id}`,
			schema: ComorbidityOptionSchema,
			data,
		});
	},

	async createComorbidity(data: ComorbidityWritePayload) {
		return await api.post({
			url: `/comorbidities`,
			schema: ComorbidityOptionSchema,
			data,
		});
	},
};
