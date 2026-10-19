import { describe, it, expect } from 'vitest';
import { casesFilterOperators, casesDefaultFilters } from './cases-filter';

describe('casesFilterOperators', () => {
	it('has patientSurname operator', () => {
		expect(casesFilterOperators.patientSurname).toBe('contains');
	});

	it('has patientBirthday operator', () => {
		expect(casesFilterOperators.patientBirthday).toBe('equals');
	});
});

describe('casesDefaultFilters', () => {
	it('has empty patientSurname', () => {
		expect(casesDefaultFilters.patientSurname).toBe('');
	});
});
