import { describe, it, expect } from 'vitest';
import { render } from '../../../test-utils';
import { Toaster } from './Toaster';

describe('Toaster', () => {
	it('renders without crashing', () => {
		render(<Toaster />);
		expect(document.body).toBeInTheDocument();
	});
});
