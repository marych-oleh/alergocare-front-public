import axios from 'axios';
import { describe, it, expect, beforeEach } from 'vitest';
import { z } from 'zod';
import { ApiService } from './api.lib';

const BASE = 'http://localhost:8080';

function makeInstance() {
	return axios.create({ baseURL: BASE });
}

describe('ApiService', () => {
	let service: ApiService;

	beforeEach(() => {
		service = new ApiService(makeInstance());
	});

	it('GET resolves with result when ok=true', async () => {
		const result = await service.get<{ id: string }>({
			url: '/patients/00000000-0000-0000-0000-000000000001',
		});
		expect(result).toMatchObject({ id: '00000000-0000-0000-0000-000000000001' });
	});

	it('POST resolves with result when ok=true', async () => {
		const result = await service.post<typeof import('./../../mocks/handlers').mockPatient>({
			url: '/patients',
			data: {
				surname: 'Тестовий',
				gender: 'male',
				countryCode: 'UA',
				birthday: '1990-05-15',
				discoveryMethod: 'self_discovered',
			},
		});
		expect(result).toMatchObject({ surname: 'Тестовий' });
	});

	it('DELETE resolves when ok=true', async () => {
		const result = await service.delete<null>({
			url: '/patients/00000000-0000-0000-0000-000000000001',
		});
		expect(result).toBeNull();
	});

	it('validates response with zod schema when provided', async () => {
		const schema = z.object({
			id: z.string(),
			surname: z.string(),
		});

		const result = await service.get({
			url: '/patients/00000000-0000-0000-0000-000000000001',
			schema,
		});

		expect(result.id).toBeTruthy();
		expect(result.surname).toBeTruthy();
	});

	it('throws AppError when server returns ok=false', async () => {
		const { http, HttpResponse } = await import('msw');
		const { server } = await import('../../mocks/server');

		server.use(
			http.get(`${BASE}/patients/bad-id`, () =>
				HttpResponse.json({
					ok: false,
					error: {
						message: 'Not found',
						details: { errorCode: 'not_found', timestamp: new Date().toISOString() },
					},
				})
			)
		);

		await expect(service.get({ url: '/patients/bad-id' })).rejects.toMatchObject({
			message: 'Not found',
		});
	});
});
