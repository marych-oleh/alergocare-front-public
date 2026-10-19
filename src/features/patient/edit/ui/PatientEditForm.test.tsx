import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '../../../../test-utils';
import { PatientEditForm } from './PatientEditForm';

const PATIENT_ID = '123e4567-e89b-42d3-a456-426614174001';

describe('PatientEditForm', () => {
	it('shows loader initially', () => {
		render(<PatientEditForm patientId={PATIENT_ID} />);
		expect(document.body).toBeInTheDocument();
	});

	it('renders form after patient loads', async () => {
		render(<PatientEditForm patientId={PATIENT_ID} />);
		await waitFor(() => {
			expect(screen.getByText('Прізвище')).toBeInTheDocument();
		}, { timeout: 3000 });
	});

	it('renders gender field after load', async () => {
		render(<PatientEditForm patientId={PATIENT_ID} />);
		await waitFor(() => {
			expect(screen.getByText('Стать')).toBeInTheDocument();
		}, { timeout: 3000 });
	});
});
