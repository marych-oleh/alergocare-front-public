import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
	it('renders username field', () => {
		render(<LoginForm />);
		expect(screen.getByText('Логін')).toBeInTheDocument();
	});

	it('renders password field', () => {
		render(<LoginForm />);
		expect(screen.getByText('Пароль')).toBeInTheDocument();
	});

	it('renders submit button', () => {
		render(<LoginForm />);
		expect(screen.getByRole('button', { name: /Ввійти/i })).toBeInTheDocument();
	});

	it('submit button is type submit', () => {
		render(<LoginForm />);
		expect(screen.getByRole('button', { name: /Ввійти/i })).toHaveAttribute('type', 'submit');
	});
});
