import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { ForbiddenPage } from './ForbiddenPage';

describe('ForbiddenPage', () => {
	it('renders 403 heading', () => {
		render(<ForbiddenPage />);
		expect(screen.getByText(/403/)).toBeInTheDocument();
	});

	it('renders forbidden message', () => {
		render(<ForbiddenPage />);
		expect(screen.getByText(/Заборонено/i)).toBeInTheDocument();
	});

	it('renders back to dashboard link', () => {
		render(<ForbiddenPage />);
		expect(screen.getByRole('link', { name: /Back to dashboard/i })).toBeInTheDocument();
	});
});
