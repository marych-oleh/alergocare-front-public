import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { TableFiltersBar } from './TableFiltersBar';

describe('TableFiltersBar', () => {
	it('renders children', () => {
		render(<TableFiltersBar><span>Filter 1</span><span>Filter 2</span></TableFiltersBar>);
		expect(screen.getByText('Filter 1')).toBeInTheDocument();
		expect(screen.getByText('Filter 2')).toBeInTheDocument();
	});

	it('renders as a stack', () => {
		render(<TableFiltersBar><span>Item</span></TableFiltersBar>);
		expect(document.querySelector('.MuiStack-root')).toBeInTheDocument();
	});
});
