import { api } from '~/shared/api';
import {
	TestingDetailSchema,
	TestingWritePayload,
} from '~/shared/api/endpoints/testing';

export const updateTesting = async (
	id: string,
	payload: TestingWritePayload
) => {
	return await api.patch({
		url: `/testings/${id}`,
		data: payload,
		schema: TestingDetailSchema,
	});
};
