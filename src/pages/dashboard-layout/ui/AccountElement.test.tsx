import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import AccountElement from './AccountElement';

describe('AccountElement', () => {
	it('renders without crashing', () => {
		render(<AccountElement />);
		expect(document.querySelector('.MuiAvatar-root')).toBeInTheDocument();
	});

	it('shows fallback username when no user', () => {
		render(<AccountElement />);
		expect(screen.getByText(/Ім'я користувача/)).toBeInTheDocument();
	});
});
