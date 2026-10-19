import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../../test-utils';
import { useCaseCreateForm, BASE_DEFAULTS } from './useCaseCreateForm';

describe('useCaseCreateForm', () => {
	it('initializes with default values', () => {
		const { result } = renderHook(() => useCaseCreateForm());
		expect(result.current.form).toBeDefined();
		expect(result.current.isPending).toBe(false);
		expect(result.current.onSubmit).toBeDefined();
	});

	it('BASE_DEFAULTS has correct shape', () => {
		expect(BASE_DEFAULTS.drugTestBefore).toBe(false);
		expect(BASE_DEFAULTS.needAllergyTesting).toBe(true);
		expect(BASE_DEFAULTS.patientId).toBe('');
		expect(BASE_DEFAULTS.symptomsTime).toBeNull();
	});

	it('accepts initial values override', () => {
		const { result } = renderHook(() =>
			useCaseCreateForm({ initialValues: { patientId: '123e4567-e89b-42d3-a456-426614174001' } })
		);
		expect(result.current.form).toBeDefined();
	});
});
