import { describe, it, expect } from 'vitest';
import { allergyAPI } from './allergy.api';
import { mockOption } from '../../../../mocks/handlers';

const ID = mockOption.id;

describe('allergyAPI', () => {
	it('getAllergies returns array', async () => {
		const result = await allergyAPI.getAllergies();
		expect(Array.isArray(result)).toBe(true);
		expect(result[0].name).toBeTruthy();
	});

	it('getAllergy returns single option', async () => {
		const result = await allergyAPI.getAllergy(ID);
		expect(result.id).toBe(ID);
	});

	it('deleteAllergy returns null', async () => {
		const result = await allergyAPI.deleteAllergy(ID);
		expect(result).toBeNull();
	});

	it('updateAllergy returns updated option', async () => {
		const result = await allergyAPI.updateAllergy(ID, { name: 'Оновлено' });
		expect(result.id).toBe(ID);
	});

	it('createAllergy returns created option', async () => {
		const result = await allergyAPI.createAllergy({ name: 'Новий' });
		expect(result.name).toBeTruthy();
	});
});
