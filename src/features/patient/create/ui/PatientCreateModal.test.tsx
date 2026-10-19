import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../test-utils';
import { PatientCreateModal } from './PatientCreateModal';

describe('PatientCreateModal', () => {
	it('renders title when open', () => {
		render(<PatientCreateModal open onClose={vi.fn()} />);
		expect(screen.getByText('Новий пацієнт')).toBeInTheDocument();
	});

	it('renders create button when open', async () => {
		render(<PatientCreateModal open onClose={vi.fn()} />);
		expect(await screen.findByText(/Створити пацієнта/i, {}, { timeout: 3000 })).toBeInTheDocument();
	});

	it('has dialog heading', () => {
		render(<PatientCreateModal open onClose={vi.fn()} />);
		expect(screen.getByRole('heading', { name: 'Новий пацієнт' })).toBeInTheDocument();
	});
});
