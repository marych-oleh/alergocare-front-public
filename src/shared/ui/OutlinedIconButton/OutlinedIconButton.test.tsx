import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import OutlinedIconButton from './OutlinedIconButton';

describe('OutlinedIconButton', () => {
	it('renders as a button', () => {
		render(<OutlinedIconButton>X</OutlinedIconButton>);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('renders children', () => {
		render(<OutlinedIconButton>Click</OutlinedIconButton>);
		expect(screen.getByText('Click')).toBeInTheDocument();
	});

	it('renders with aria-label', () => {
		render(<OutlinedIconButton aria-label="close">X</OutlinedIconButton>);
		expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument();
	});

	it('can be disabled', () => {
		render(<OutlinedIconButton disabled>X</OutlinedIconButton>);
		expect(screen.getByRole('button')).toBeDisabled();
	});
});
