import { describe, it, expect } from 'vitest';
import { render, waitFor } from '../../../test-utils';
import { CaseTestingsPage } from './CaseTestingsPage';

const CASE_ID = '123e4567-e89b-42d3-a456-426614174002';

describe('CaseTestingsPage', () => {
	it('renders without crashing', async () => {
		render(<CaseTestingsPage params={{ caseID: CASE_ID } as any} />);
		await waitFor(() => {
			expect(document.querySelector('.MuiStack-root, .MuiCircularProgress-root')).toBeInTheDocument();
		}, { timeout: 3000 });
	});
});
