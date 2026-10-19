import { describe, it, expect } from 'vitest';
import { testingAPI } from './testing.api';
import { mockTesting } from '../../../../mocks/handlers';

const CASE_ID = mockTesting.caseId;
const TESTING_ID = mockTesting.id;

describe('testingAPI', () => {
	it('getCaseTestings returns paginated list', async () => {
		const result = await testingAPI.getCaseTestings(CASE_ID, { page: 1, pageSize: 20 });
		expect(result.items).toHaveLength(1);
	});

	it('getTestingById returns testing', async () => {
		const result = await testingAPI.getTestingById(TESTING_ID);
		expect(result.id).toBe(TESTING_ID);
	});
});
