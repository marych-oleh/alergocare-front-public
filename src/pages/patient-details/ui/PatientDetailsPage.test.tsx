import { describe, it, expect } from 'vitest';
import { render, waitFor } from '../../../test-utils';
import { PatientDetailsPage } from './PatientDetailsPage';

const PATIENT_ID = '123e4567-e89b-42d3-a456-426614174001';

describe('PatientDetailsPage', () => {
	it('renders without crashing', async () => {
		render(<PatientDetailsPage params={{ patientID: PATIENT_ID } as any} />);
		await waitFor(() => {
			expect(document.querySelector('.MuiBox-root, .MuiCircularProgress-root')).toBeInTheDocument();
		}, { timeout: 3000 });
	});
});
