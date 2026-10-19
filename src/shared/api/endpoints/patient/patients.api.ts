import { api } from '../../api.instance';
import { PaginatedPatientsRequest } from './patients.model';
import {
	PaginatedPatientsSchema,
	PatientDetailSchema,
} from './patients.schema';

export const patientsAPI = {
	async getPatients(params: PaginatedPatientsRequest) {
		return await api.post({
			url: '/patients/search',
			schema: PaginatedPatientsSchema,
			data: params,
		});
	},

	async getPatientById(id: string) {
		return await api.get({
			url: `/patients/${id}`,
			schema: PatientDetailSchema,
		});
	},
};
