import { describe, it, expect } from 'vitest';
import { symptomAPI } from './symptom.api';
import { mockOption } from '../../../../mocks/handlers';

const ID = mockOption.id;

describe('symptomAPI', () => {
	it('getSymptoms returns array', async () => {
		expect(Array.isArray(await symptomAPI.getSymptoms())).toBe(true);
	});

	it('getSymptom returns item', async () => {
		const result = await symptomAPI.getSymptom(ID);
		expect(result.id).toBe(ID);
	});

	it('deleteSymptom returns null', async () => {
		expect(await symptomAPI.deleteSymptom(ID)).toBeNull();
	});

	it('updateSymptom returns item', async () => {
		const result = await symptomAPI.updateSymptom(ID, { name: 'Updated', category: 'respiratory' });
		expect(result.id).toBe(ID);
	});

	it('createSymptom returns item', async () => {
		const result = await symptomAPI.createSymptom({ name: 'New', category: 'respiratory' });
		expect(result.name).toBeTruthy();
	});
});
