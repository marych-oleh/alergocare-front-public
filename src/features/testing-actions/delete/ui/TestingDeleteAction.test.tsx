import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../../../test-utils';
import { TestingDeleteAction } from './TestingDeleteAction';

const TESTING_ID = '123e4567-e89b-42d3-a456-426614174020';

describe('TestingDeleteAction', () => {
	it('renders danger zone heading', () => {
		render(<TestingDeleteAction testingId={TESTING_ID} />);
		expect(screen.getByText('Небезпечна зона')).toBeInTheDocument();
	});

	it('renders delete button', () => {
		render(<TestingDeleteAction testingId={TESTING_ID} />);
		expect(screen.getByRole('button', { name: /Видалити алерготестування/i })).toBeInTheDocument();
	});

	it('opens confirmation dialog', () => {
		render(<TestingDeleteAction testingId={TESTING_ID} />);
		fireEvent.click(screen.getByRole('button', { name: /Видалити алерготестування/i }));
		expect(screen.getByText('Видалити алерготестування?')).toBeInTheDocument();
	});

	it('closes dialog on cancel', async () => {
		render(<TestingDeleteAction testingId={TESTING_ID} />);
		fireEvent.click(screen.getByRole('button', { name: /Видалити алерготестування/i }));
		const cancelBtn = await screen.findByRole('button', { name: /Скасувати/i });
		fireEvent.click(cancelBtn);
		await waitFor(() => {
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('shows irreversible warning', () => {
		render(<TestingDeleteAction testingId={TESTING_ID} />);
		expect(screen.getByText(/пов'язаних даних/i)).toBeInTheDocument();
	});
});
