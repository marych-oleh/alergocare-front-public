import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '../../../test-utils';
import { PatientsPage } from './PatientsPage';

describe('PatientsPage', () => {
	it('renders patients table', async () => {
		render(<PatientsPage />, { initialEntries: ['/patients'] });
		await waitFor(() => {
			expect(screen.getByRole('button', { name: /Додати пацієнта/i })).toBeInTheDocument();
		}, { timeout: 3000 });
	});
});
