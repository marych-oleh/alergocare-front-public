import z from 'zod';
import { api } from '../../api.instance';
import {
	ComplicationOptionSchema,
	ComplicationWritePayload,
} from './complication.schema';

export const complicationAPI = {
	async getComplications() {
		return await api.get({
			url: '/complications',
			schema: z.array(ComplicationOptionSchema),
		});
	},

	async getComplication(id: string) {
		return await api.get({
			url: `/complications/${id}`,
			schema: ComplicationOptionSchema,
		});
	},

	async deleteComplication(id: string) {
		return await api.delete<null>({
			url: `/complications/${id}`,
		});
	},

	async updateComplication(id: string, data: ComplicationWritePayload) {
		return await api.patch({
			url: `/complications/${id}`,
			schema: ComplicationOptionSchema,
			data,
		});
	},

	async createComplication(data: ComplicationWritePayload) {
		return await api.post({
			url: `/complications`,
			schema: ComplicationOptionSchema,
			data,
		});
	},
};
