import { api } from '~/shared/api';
import {
	PatientDetailSchema,
	PatientWritePayload,
} from '~/shared/api/endpoints/patient';

export const updatePatient = async (
	id: string,
	payload: PatientWritePayload
) => {
	return await api.patch({
		url: `/patients/${id}`,
		data: payload,
		schema: PatientDetailSchema,
	});
};
