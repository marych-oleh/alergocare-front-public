import { describe, it, expect } from 'vitest';
import type { TestingType, TestingMethod, TestingRow } from './testing.model';

describe('testing model types', () => {
	it('TestingType accepts suspected', () => {
		const t: TestingType = 'suspected';
		expect(t).toBe('suspected');
	});

	it('TestingType accepts alternative', () => {
		const t: TestingType = 'alternative';
		expect(t).toBe('alternative');
	});

	it('TestingMethod accepts skin', () => {
		const m: TestingMethod = 'skin';
		expect(m).toBe('skin');
	});

	it('TestingMethod accepts challenge', () => {
		const m: TestingMethod = 'challenge';
		expect(m).toBe('challenge');
	});

	it('TestingRow type structure is valid', () => {
		const row: TestingRow = {
			id: '123e4567-e89b-42d3-a456-426614174020',
			caseId: '123e4567-e89b-42d3-a456-426614174002',
			type: 'suspected',
			method: 'skin',
			isPositive: false,
			finalStage: null,
			drug: { id: '123e4567-e89b-42d3-a456-426614174011', name: 'Drug', categoryId: '123e4567-e89b-42d3-a456-426614174012' },
			testingDate: '2024-03-15T10:00:00.000Z',
			complications: [],
			createdAt: '2024-03-15T10:00:00.000Z',
			updatedAt: '2024-03-15T10:00:00.000Z',
		};
		expect(row.id).toBeDefined();
		expect(row.type).toBe('suspected');
	});
});
