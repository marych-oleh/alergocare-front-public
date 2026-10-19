import { describe, it, expect } from 'vitest';
import type { Gender, DiscoveryMethod, PatientDetail, PatientShort, PatientWritePayload } from './patients.model';

describe('patients model types', () => {
	it('Gender type accepts male', () => {
		const g: Gender = 'male';
		expect(g).toBe('male');
	});

	it('Gender type accepts female', () => {
		const g: Gender = 'female';
		expect(g).toBe('female');
	});

	it('DiscoveryMethod accepts self_discovered', () => {
		const m: DiscoveryMethod = 'self_discovered';
		expect(m).toBe('self_discovered');
	});

	it('PatientDetail type structure is valid', () => {
		const patient: PatientDetail = {
			id: '123e4567-e89b-42d3-a456-426614174001',
			surname: 'Тестовий',
			gender: 'male',
			countryCode: 'UA',
			districtCode: null,
			birthday: '1990-05-15',
			createdAt: '2024-01-01T00:00:00.000Z',
			updatedAt: '2024-01-01T00:00:00.000Z',
			discoveryMethod: 'self_discovered',
		};
		expect(patient.id).toBeDefined();
		expect(patient.surname).toBe('Тестовий');
	});
});
