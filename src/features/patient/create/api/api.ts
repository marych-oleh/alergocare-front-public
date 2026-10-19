import { api } from '~/shared/api';
import {
	PatientDetailSchema,
	PatientWritePayload,
} from '~/shared/api/endpoints/patient';

export const createPatient = async (payload: PatientWritePayload) => {
	return await api.post({
		url: '/patients',
		data: payload,
		schema: PatientDetailSchema,
	});
};
