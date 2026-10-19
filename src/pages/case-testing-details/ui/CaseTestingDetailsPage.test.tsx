import { describe, it, expect } from 'vitest';
import { render, waitFor } from '../../../test-utils';
import { CaseTestingDetailsPage } from './CaseTestingDetailsPage';

const CASE_ID = '123e4567-e89b-42d3-a456-426614174002';
const TESTING_ID = '123e4567-e89b-42d3-a456-426614174020';

describe('CaseTestingDetailsPage', () => {
	it('renders without crashing', async () => {
		render(<CaseTestingDetailsPage params={{ caseID: CASE_ID, testingID: TESTING_ID } as any} />);
		await waitFor(() => {
			expect(document.querySelector('.MuiBox-root, .MuiCircularProgress-root')).toBeInTheDocument();
		}, { timeout: 3000 });
	});
});
