import { describe, it, expect } from 'vitest';
import { render } from '../../../test-utils';
import { ColorModeIconDropdown } from './ColorModeIconDropdown';

describe('ColorModeIconDropdown', () => {
	it('renders without crashing', () => {
		render(<ColorModeIconDropdown />);
		expect(document.body).toBeInTheDocument();
	});
});
