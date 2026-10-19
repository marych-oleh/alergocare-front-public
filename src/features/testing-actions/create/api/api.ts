import { api } from '~/shared/api';
import {
	TestingDetailSchema,
	TestingWritePayload,
} from '~/shared/api/endpoints/testing';

export const createTesting = async (payload: TestingWritePayload) => {
	return await api.post({
		url: '/testings',
		data: payload,
		schema: TestingDetailSchema,
	});
};
