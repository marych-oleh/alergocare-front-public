import { describe, it, expect } from 'vitest';
import { preliminaryDiagnoseAPI } from './preliminary-diagnose.api';
import { mockOption } from '../../../../mocks/handlers';

const ID = mockOption.id;

describe('preliminaryDiagnoseAPI', () => {
	it('getPreliminaryDiagnoses returns array', async () => {
		expect(Array.isArray(await preliminaryDiagnoseAPI.getPreliminaryDiagnoses())).toBe(true);
	});

	it('getPreliminaryDiagnose returns item', async () => {
		const result = await preliminaryDiagnoseAPI.getPreliminaryDiagnose(ID);
		expect(result.id).toBe(ID);
	});

	it('deletePreliminaryDiagnose returns null', async () => {
		expect(await preliminaryDiagnoseAPI.deletePreliminaryDiagnose(ID)).toBeNull();
	});

	it('updatePreliminaryDiagnose returns item', async () => {
		const result = await preliminaryDiagnoseAPI.updatePreliminaryDiagnose(ID, { name: 'Updated' });
		expect(result.id).toBe(ID);
	});

	it('createPreliminaryDiagnose returns item', async () => {
		const result = await preliminaryDiagnoseAPI.createPreliminaryDiagnose({ name: 'New' });
		expect(result.name).toBeTruthy();
	});
});
