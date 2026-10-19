import { describe, it, expect } from 'vitest';
import { drugAPI, drugCategoryAPI } from './drug.api';
import { mockDrug, mockDrugCategory } from '../../../../mocks/handlers';

const DRUG_ID = mockDrug.id;
const CAT_ID = mockDrugCategory.id;

describe('drugAPI', () => {
	it('getDrugs returns array', async () => {
		const result = await drugAPI.getDrugs();
		expect(Array.isArray(result)).toBe(true);
		expect(result[0].categoryId).toBeTruthy();
	});

	it('getDrug returns drug', async () => {
		const result = await drugAPI.getDrug(DRUG_ID);
		expect(result.id).toBe(DRUG_ID);
	});

	it('deleteDrug returns null', async () => {
		expect(await drugAPI.deleteDrug(DRUG_ID)).toBeNull();
	});

	it('updateDrug returns drug', async () => {
		const result = await drugAPI.updateDrug(DRUG_ID, {
			name: 'Оновлено',
			categoryId: CAT_ID,
		});
		expect(result.id).toBe(DRUG_ID);
	});

	it('createDrug returns drug', async () => {
		const result = await drugAPI.createDrug({ name: 'Новий', categoryId: CAT_ID });
		expect(result.name).toBeTruthy();
	});
});

describe('drugCategoryAPI', () => {
	it('getDrugCategories returns array', async () => {
		const result = await drugCategoryAPI.getDrugCategories();
		expect(Array.isArray(result)).toBe(true);
	});

	it('getDrugCategoriesTree returns tree array', async () => {
		const result = await drugCategoryAPI.getDrugCategoriesTree();
		expect(Array.isArray(result)).toBe(true);
	});

	it('getDrugCategory returns category', async () => {
		const result = await drugCategoryAPI.getDrugCategory(CAT_ID);
		expect(result.id).toBe(CAT_ID);
	});

	it('deleteDrugCategory returns null', async () => {
		expect(await drugCategoryAPI.deleteDrugCategory(CAT_ID)).toBeNull();
	});

	it('updateDrugCategory returns category', async () => {
		const result = await drugCategoryAPI.updateDrugCategory(CAT_ID, {
			name: 'Оновлено',
			parentId: null,
		});
		expect(result.id).toBe(CAT_ID);
	});

	it('createDrugCategory returns category', async () => {
		const result = await drugCategoryAPI.createDrugCategory({
			name: 'Нова',
			parentId: null,
		});
		expect(result.name).toBeTruthy();
	});
});
