import { describe, it, expect } from 'vitest';
import { patientsAPI } from './patients.api';
import { mockPatient } from '../../../../mocks/handlers';

const ID = mockPatient.id;

describe('patientsAPI', () => {
	it('getPatients returns paginated list', async () => {
		const result = await patientsAPI.getPatients({ page: 1, pageSize: 20 });
		expect(result.items).toHaveLength(1);
		expect(result.items[0].id).toBe(ID);
	});

	it('getPatientById returns patient', async () => {
		const result = await patientsAPI.getPatientById(ID);
		expect(result.id).toBe(ID);
		expect(result.surname).toBe('Тестовий');
	});
});
