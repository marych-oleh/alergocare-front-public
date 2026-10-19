import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../test-utils';
import { LogoutButton } from './LogoutButton';

describe('LogoutButton', () => {
	it('renders a button', () => {
		render(<LogoutButton />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('shows logout text', () => {
		render(<LogoutButton />);
		expect(screen.getByText('Вийти')).toBeInTheDocument();
	});
});
