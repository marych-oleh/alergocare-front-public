import { describe, it, expect } from 'vitest';
import { renderHook, act } from '../../../test-utils';
import { usePatientSelector } from './usePatientSelector';

const mockPatient = {
	id: '123e4567-e89b-42d3-a456-426614174001',
	surname: 'Тестовий',
	gender: 'male' as const,
	countryCode: 'UA',
	districtCode: null,
	birthday: '1990-05-15',
};

describe('usePatientSelector', () => {
	it('initializes with isOpen=false', () => {
		const { result } = renderHook(() => usePatientSelector());
		expect(result.current.isOpen).toBe(false);
	});

	it('opens when open() is called', () => {
		const { result } = renderHook(() => usePatientSelector());
		act(() => result.current.open());
		expect(result.current.isOpen).toBe(true);
	});

	it('closes when close() is called', () => {
		const { result } = renderHook(() => usePatientSelector());
		act(() => result.current.open());
		act(() => result.current.close());
		expect(result.current.isOpen).toBe(false);
	});

	it('sets selected patient', () => {
		const { result } = renderHook(() => usePatientSelector());
		act(() => result.current.setSelectedPatient(mockPatient as any));
		expect(result.current.selectedPatient).toEqual(mockPatient);
	});

	it('accepts preselected patient', () => {
		const { result } = renderHook(() => usePatientSelector(mockPatient as any));
		expect(result.current.selectedPatient).toEqual(mockPatient);
	});
});
