import z from 'zod';
import { api } from '../../api.instance';
import {
	ExaminationOptionSchema,
	ExaminationWritePayload,
} from './examination.schema';

export const examinationAPI = {
	async getExaminations() {
		return await api.get({
			url: '/examinations',
			schema: z.array(ExaminationOptionSchema),
		});
	},

	async getExamination(id: string) {
		return await api.get({
			url: `/examinations/${id}`,
			schema: ExaminationOptionSchema,
		});
	},

	async deleteExamination(id: string) {
		return await api.delete<null>({
			url: `/examinations/${id}`,
		});
	},

	async updateExamination(id: string, data: ExaminationWritePayload) {
		return await api.patch({
			url: `/examinations/${id}`,
			schema: ExaminationOptionSchema,
			data,
		});
	},

	async createExamination(data: ExaminationWritePayload) {
		return await api.post({
			url: `/examinations`,
			schema: ExaminationOptionSchema,
			data,
		});
	},
};
