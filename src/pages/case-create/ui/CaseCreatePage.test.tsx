import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { CaseCreatePage } from './CaseCreatePage';

describe('CaseCreatePage', () => {
	it('renders without crashing', () => {
		render(<CaseCreatePage />);
		expect(document.body).toBeInTheDocument();
	});

	it('renders the create case modal title', () => {
		render(<CaseCreatePage />);
		expect(screen.getAllByText('Створити звернення').length).toBeGreaterThan(0);
	});
});
