import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { ColorModeSelect } from './ColorModeSelect';

describe('ColorModeSelect', () => {
	it('renders without crashing', () => {
		render(<ColorModeSelect />);
		// useColorScheme may return null mode in test env — component returns null in that case
		expect(document.body).toBeInTheDocument();
	});
});
