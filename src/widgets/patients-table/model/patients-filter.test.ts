import { describe, it, expect } from 'vitest';
import { patientsFilterOperators, patientsDefaultFilters } from './patients-filter';

describe('patientsFilterOperators', () => {
	it('has surname operator', () => {
		expect(patientsFilterOperators.surname).toBe('contains');
	});

	it('has birthday operator', () => {
		expect(patientsFilterOperators.birthday).toBe('equals');
	});
});

describe('patientsDefaultFilters', () => {
	it('has empty surname', () => {
		expect(patientsDefaultFilters.surname).toBe('');
	});
});
