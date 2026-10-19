import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../../../test-utils';
import { PatientDeleteAction } from './PatientDeleteAction';

const PATIENT_ID = '00000000-0000-0000-0000-000000000001';

describe('PatientDeleteAction', () => {
	it('renders the danger zone section', () => {
		render(<PatientDeleteAction patientId={PATIENT_ID} />);
		expect(screen.getByText('Небезпечна зона')).toBeInTheDocument();
	});

	it('renders the delete button', () => {
		render(<PatientDeleteAction patientId={PATIENT_ID} />);
		expect(
			screen.getByRole('button', { name: /Видалити пацієнта/i })
		).toBeInTheDocument();
	});

	it('shows confirmation dialog when delete button is clicked', () => {
		render(<PatientDeleteAction patientId={PATIENT_ID} />);
		fireEvent.click(screen.getByRole('button', { name: /Видалити пацієнта/i }));
		expect(screen.getByText('Видалити пацієнта?')).toBeInTheDocument();
	});

	it('closes dialog when cancel button is clicked', async () => {
		render(<PatientDeleteAction patientId={PATIENT_ID} />);
		fireEvent.click(screen.getByRole('button', { name: /Видалити пацієнта/i }));
		expect(screen.getByText('Видалити пацієнта?')).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: /Скасувати/i }));
		await waitFor(() => {
			expect(screen.queryByText('Видалити пацієнта?')).not.toBeInTheDocument();
		});
	});

	it('calls onSuccess after successful deletion', async () => {
		const onSuccess = vi.fn();
		render(<PatientDeleteAction patientId={PATIENT_ID} onSuccess={onSuccess} />);

		fireEvent.click(screen.getByRole('button', { name: /Видалити пацієнта/i }));

		const confirmButton = await screen.findByRole('button', { name: /^Видалити$/ });
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(onSuccess).toHaveBeenCalledOnce();
		});
	});

	it('shows description text about data loss', () => {
		render(<PatientDeleteAction patientId={PATIENT_ID} />);
		expect(screen.getByText(/Видалення пацієнта/)).toBeInTheDocument();
	});
});
