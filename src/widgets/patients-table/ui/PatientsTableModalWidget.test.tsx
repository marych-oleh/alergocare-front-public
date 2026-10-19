import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../../../test-utils';
import { PatientsTableModalWidget } from './PatientsTableModalWidget';

describe('PatientsTableModalWidget', () => {
	it('renders when open', () => {
		render(<PatientsTableModalWidget open title="Оберіть пацієнта" onClose={vi.fn()} />);
		expect(screen.getByText('Оберіть пацієнта')).toBeInTheDocument();
	});

	it('renders patients table content when open', async () => {
		render(<PatientsTableModalWidget open title="Test" onClose={vi.fn()} />);
		await waitFor(() => {
			expect(screen.getByRole('button', { name: /Додати пацієнта/i })).toBeInTheDocument();
		}, { timeout: 3000 });
	});

	it('does not render when closed', () => {
		render(<PatientsTableModalWidget open={false} title="Test" onClose={vi.fn()} />);
		expect(screen.queryByText('Test')).not.toBeInTheDocument();
	});
});
