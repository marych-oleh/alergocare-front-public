import { describe, it, expect } from 'vitest';
import { examinationAPI } from './examination.api';
import { mockOption } from '../../../../mocks/handlers';

const ID = mockOption.id;

describe('examinationAPI', () => {
	it('getExaminations returns array', async () => {
		expect(Array.isArray(await examinationAPI.getExaminations())).toBe(true);
	});

	it('getExamination returns item', async () => {
		const result = await examinationAPI.getExamination(ID);
		expect(result.id).toBe(ID);
	});

	it('deleteExamination returns null', async () => {
		expect(await examinationAPI.deleteExamination(ID)).toBeNull();
	});

	it('updateExamination returns item', async () => {
		const result = await examinationAPI.updateExamination(ID, { name: 'Updated' });
		expect(result.id).toBe(ID);
	});

	it('createExamination returns item', async () => {
		const result = await examinationAPI.createExamination({ name: 'New' });
		expect(result.name).toBeTruthy();
	});
});
