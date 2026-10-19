import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../../../test-utils';
import { PatientsTableWidget } from './PatientsTableWidget';

describe('PatientsTableWidget', () => {
	it('renders the add patient button', async () => {
		render(<PatientsTableWidget />);
		await waitFor(() => {
			expect(screen.getByRole('button', { name: /Додати пацієнта/i })).toBeInTheDocument();
		});
	});

	it('renders data grid after loading', async () => {
		render(<PatientsTableWidget />);
		await waitFor(() => {
			expect(document.querySelector('.MuiDataGrid-root')).toBeInTheDocument();
		}, { timeout: 3000 });
	});

	it('opens create modal on button click', async () => {
		render(<PatientsTableWidget />);
		await waitFor(() => screen.getByRole('button', { name: /Додати пацієнта/i }));
		const btn = screen.getByRole('button', { name: /Додати пацієнта/i });
		btn.click();
		await waitFor(() => {
			expect(screen.getByText('Новий пацієнт')).toBeInTheDocument();
		});
	});
});
