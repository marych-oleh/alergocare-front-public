import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { RHFToggle } from './RHFToggle';

function TestForm({ defaultValue = false }: { defaultValue?: boolean }) {
	const { control } = useForm({ defaultValues: { enabled: defaultValue } });
	return <RHFToggle name="enabled" control={control} label="Enable feature" />;
}

describe('RHFToggle', () => {
	it('renders the toggle label', () => {
		render(<TestForm />);
		expect(screen.getByText('Enable feature')).toBeInTheDocument();
	});

	it('renders a switch input', () => {
		render(<TestForm />);
		expect(screen.getByRole('switch')).toBeInTheDocument();
	});

	it('is unchecked by default', () => {
		render(<TestForm />);
		expect(screen.getByRole('switch')).not.toBeChecked();
	});

	it('is checked when defaultValue is true', () => {
		render(<TestForm defaultValue={true} />);
		expect(screen.getByRole('switch')).toBeChecked();
	});

	it('renders FormControlLabel', () => {
		render(<TestForm />);
		expect(document.querySelector('.MuiFormControlLabel-root')).toBeInTheDocument();
	});
});
