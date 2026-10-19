import { describe, it, expect } from 'vitest';
import { render, waitFor } from '../../../../test-utils';
import { TestingEditForm } from './TestingEditForm';

const TESTING_ID = '123e4567-e89b-42d3-a456-426614174020';
const CASE_ID = '123e4567-e89b-42d3-a456-426614174002';

describe('TestingEditForm', () => {
	it('renders without crashing', () => {
		render(<TestingEditForm testingId={TESTING_ID} caseId={CASE_ID} />);
		expect(document.body).toBeInTheDocument();
	});

	it('loads and renders form fields', async () => {
		render(<TestingEditForm testingId={TESTING_ID} caseId={CASE_ID} />);
		await waitFor(() => {
			expect(document.querySelector('.MuiStack-root, .MuiCircularProgress-root')).toBeInTheDocument();
		}, { timeout: 3000 });
	});
});
