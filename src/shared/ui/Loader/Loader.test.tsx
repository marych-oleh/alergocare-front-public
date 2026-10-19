import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import Loader from './Loader';

describe('Loader', () => {
	it('renders without crashing', () => {
		const { container } = render(<Loader />);
		expect(container.firstChild).toBeTruthy();
	});

	it('renders a progress indicator', () => {
		render(<Loader />);
		expect(document.querySelector('[role="progressbar"]')).toBeTruthy();
	});
});
