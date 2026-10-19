import { describe, it, expect } from 'vitest';
import { render } from '../../../test-utils';
import { Layout } from './Layout';

describe('PatientTabsLayout', () => {
	it('renders without crashing', () => {
		render(<Layout />);
		expect(document.querySelector('.MuiBox-root')).toBeInTheDocument();
	});
});
