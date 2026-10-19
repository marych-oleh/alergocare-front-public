import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../../../test-utils';
import { CaseDeleteAction } from './CaseDeleteAction';

const CASE_ID = '123e4567-e89b-42d3-a456-426614174002';

describe('CaseDeleteAction', () => {
	it('renders danger zone heading', () => {
		render(<CaseDeleteAction caseId={CASE_ID} />);
		expect(screen.getByText('Небезпечна зона')).toBeInTheDocument();
	});

	it('renders delete button', () => {
		render(<CaseDeleteAction caseId={CASE_ID} />);
		expect(screen.getByRole('button', { name: /Видалити звернення/i })).toBeInTheDocument();
	});

	it('opens confirmation dialog on click', () => {
		render(<CaseDeleteAction caseId={CASE_ID} />);
		fireEvent.click(screen.getByRole('button', { name: /Видалити звернення/i }));
		expect(screen.getByText('Видалити звернення?')).toBeInTheDocument();
	});

	it('closes dialog on cancel', async () => {
		render(<CaseDeleteAction caseId={CASE_ID} />);
		fireEvent.click(screen.getByRole('button', { name: /Видалити звернення/i }));
		const cancelBtn = await screen.findByRole('button', { name: /Скасувати/i });
		fireEvent.click(cancelBtn);
		await waitFor(() => {
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('renders description text', () => {
		render(<CaseDeleteAction caseId={CASE_ID} />);
		expect(screen.getByText(/повної втрати/i)).toBeInTheDocument();
	});

	it('calls onSuccess after confirmation', async () => {
		const onSuccess = vi.fn();
		render(<CaseDeleteAction caseId={CASE_ID} onSuccess={onSuccess} />);
		fireEvent.click(screen.getByRole('button', { name: /Видалити звернення/i }));
		const confirmBtn = await screen.findByRole('button', { name: /^Видалити$/ });
		fireEvent.click(confirmBtn);
	});
});
