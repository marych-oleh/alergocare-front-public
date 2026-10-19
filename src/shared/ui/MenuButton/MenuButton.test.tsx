import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import MenuButton from './MenuButton';
import NotificationsIcon from '@mui/icons-material/Notifications';

describe('MenuButton', () => {
	it('renders the button', () => {
		render(<MenuButton><NotificationsIcon /></MenuButton>);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('renders without badge by default', () => {
		render(<MenuButton><NotificationsIcon /></MenuButton>);
		expect(document.querySelector('.MuiBadge-invisible')).toBeInTheDocument();
	});

	it('shows badge when showBadge=true', () => {
		render(<MenuButton showBadge><NotificationsIcon /></MenuButton>);
		expect(document.querySelector('.MuiBadge-dot')).toBeInTheDocument();
	});

	it('shows badge content when badgeContent provided', () => {
		render(<MenuButton showBadge badgeContent={5}><NotificationsIcon /></MenuButton>);
		expect(screen.getByText('5')).toBeInTheDocument();
	});
});
