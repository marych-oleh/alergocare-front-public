import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '../../../test-utils';
import { CasesPage } from './CasesPage';

describe('CasesPage', () => {
	it('renders without crashing', () => {
		render(<CasesPage />);
		expect(document.querySelector('.MuiBox-root')).toBeInTheDocument();
	});

	it('renders create case link after load', async () => {
		render(<CasesPage />);
		await waitFor(() => {
			expect(screen.getByRole('link', { name: /Створити звернення/i })).toBeInTheDocument();
		}, { timeout: 3000 });
	});
});
