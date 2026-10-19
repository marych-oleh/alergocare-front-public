import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { LogInPage } from './LogInPage';

describe('LogInPage', () => {
	it('renders the login heading', () => {
		render(<LogInPage />);
		expect(screen.getByText('Вхід')).toBeInTheDocument();
	});

	it('renders the login form', () => {
		render(<LogInPage />);
		expect(screen.getByText('Логін')).toBeInTheDocument();
	});

	it('renders the submit button', () => {
		render(<LogInPage />);
		expect(screen.getByRole('button', { name: /Ввійти/i })).toBeInTheDocument();
	});
});
