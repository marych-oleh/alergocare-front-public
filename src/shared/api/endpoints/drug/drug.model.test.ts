import { describe, it, expect } from 'vitest';
import type { DrugOption, DrugCategoryOption } from './drug.model';

describe('drug model types', () => {
	it('DrugOption type structure is valid', () => {
		const drug: DrugOption = {
			id: '123e4567-e89b-42d3-a456-426614174011',
			name: 'Амоксицилін',
			categoryId: '123e4567-e89b-42d3-a456-426614174012',
		};
		expect(drug.name).toBe('Амоксицилін');
	});

	it('DrugCategoryOption type structure is valid', () => {
		const cat: DrugCategoryOption = {
			id: '123e4567-e89b-42d3-a456-426614174012',
			name: 'Антибіотики',
			parentId: null,
		};
		expect(cat.parentId).toBeNull();
	});
});
