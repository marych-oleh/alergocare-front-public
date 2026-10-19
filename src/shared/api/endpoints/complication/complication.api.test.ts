import { describe, it, expect } from 'vitest';
import { complicationAPI } from './complication.api';
import { mockOption } from '../../../../mocks/handlers';

const ID = mockOption.id;

describe('complicationAPI', () => {
	it('getComplications returns array', async () => {
		const result = await complicationAPI.getComplications();
		expect(Array.isArray(result)).toBe(true);
	});

	it('getComplication returns single option', async () => {
		const result = await complicationAPI.getComplication(ID);
		expect(result.id).toBe(ID);
	});

	it('deleteComplication returns null', async () => {
		const result = await complicationAPI.deleteComplication(ID);
		expect(result).toBeNull();
	});

	it('updateComplication returns updated option', async () => {
		const result = await complicationAPI.updateComplication(ID, { name: 'Оновлено' });
		expect(result.id).toBe(ID);
	});

	it('createComplication returns created option', async () => {
		const result = await complicationAPI.createComplication({ name: 'Нове' });
		expect(result.name).toBeTruthy();
	});
});
