import z from 'zod';
import { api } from '../../api.instance';
import { DrugCategoryWritePayload, DrugWritePayload } from './drug.model';
import {
	DrugCategoryOptionSchema,
	DrugCategoryTreeSchema,
	DrugOptionSchema,
} from './drug.schema';

export const drugAPI = {
	async getDrugs() {
		return await api.get({
			url: '/drugs',
			schema: z.array(DrugOptionSchema),
		});
	},

	async getDrug(id: string) {
		return await api.get({
			url: `/drugs/${id}`,
			schema: DrugOptionSchema,
		});
	},

	async deleteDrug(id: string) {
		return await api.delete<null>({
			url: `/drugs/${id}`,
		});
	},

	async updateDrug(id: string, data: DrugWritePayload) {
		return await api.patch({
			url: `/drugs/${id}`,
			schema: DrugOptionSchema,
			data,
		});
	},

	async createDrug(data: DrugWritePayload) {
		return await api.post({
			url: `/drugs`,
			schema: DrugOptionSchema,
			data,
		});
	},
};

export const drugCategoryAPI = {
	async getDrugCategories() {
		return await api.get({
			url: '/drug-categories',
			schema: z.array(DrugCategoryOptionSchema),
		});
	},

	async getDrugCategoriesTree() {
		return await api.get({
			url: '/drug-categories/tree',
			schema: z.array(DrugCategoryTreeSchema),
		});
	},

	async getDrugCategory(id: string) {
		return await api.get({
			url: `/drug-categories/${id}`,
			schema: DrugCategoryOptionSchema,
		});
	},

	async deleteDrugCategory(id: string) {
		return await api.delete<null>({
			url: `/drug-categories/${id}`,
		});
	},

	async updateDrugCategory(id: string, data: DrugCategoryWritePayload) {
		return await api.patch({
			url: `/drug-categories/${id}`,
			schema: DrugCategoryOptionSchema,
			data,
		});
	},

	async createDrugCategory(data: DrugCategoryWritePayload) {
		return await api.post({
			url: `/drug-categories`,
			schema: DrugCategoryOptionSchema,
			data,
		});
	},
};
