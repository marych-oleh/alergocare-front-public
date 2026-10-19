import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '../../../test-utils';
import { TestingsTableWidget } from './TestingsTableWidget';

const CASE_ID = '123e4567-e89b-42d3-a456-426614174002';

describe('TestingsTableWidget', () => {
	it('renders create testing button after load', async () => {
		render(<TestingsTableWidget caseId={CASE_ID} />);
		await waitFor(() => {
			expect(screen.getByRole('button', { name: /Створити тестування/i })).toBeInTheDocument();
		}, { timeout: 3000 });
	});

	it('renders data grid', async () => {
		render(<TestingsTableWidget caseId={CASE_ID} />);
		await waitFor(() => {
			expect(document.querySelector('.MuiDataGrid-root')).toBeInTheDocument();
		}, { timeout: 3000 });
	});

	it('opens create modal on button click', async () => {
		render(<TestingsTableWidget caseId={CASE_ID} />);
		await waitFor(() => screen.getByRole('button', { name: /Створити тестування/i }));
		screen.getByRole('button', { name: /Створити тестування/i }).click();
		await waitFor(() => {
			expect(document.querySelector('.MuiDialog-root')).toBeInTheDocument();
		});
	});
});
