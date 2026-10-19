import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '../../../test-utils';
import { CasesTableWidget } from './CasesTableWidget';

describe('CasesTableWidget', () => {
	it('renders without crashing', async () => {
		render(<CasesTableWidget />);
		await waitFor(() => {
			expect(document.querySelector('.MuiBox-root')).toBeInTheDocument();
		}, { timeout: 3000 });
	});

	it('renders with patientId', async () => {
		render(<CasesTableWidget patientId="123e4567-e89b-42d3-a456-426614174001" />);
		await waitFor(() => {
			expect(document.querySelector('.MuiBox-root')).toBeInTheDocument();
		}, { timeout: 3000 });
	});
});
