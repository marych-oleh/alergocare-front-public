import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { RHFRadioGroup } from './RHFRadioGroup';

const options = [
	{ value: 'x', label: 'Choice X' },
	{ value: 'y', label: 'Choice Y' },
	{ value: 'z', label: 'Choice Z' },
];

function TestForm({ defaultValue = '' }: { defaultValue?: string }) {
	const { control } = useForm({ defaultValues: { choice: defaultValue } });
	return <RHFRadioGroup name="choice" control={control} label="Pick one" options={options} />;
}

describe('RHFRadioGroup', () => {
	it('renders all options', () => {
		render(<TestForm />);
		expect(screen.getByText('Choice X')).toBeInTheDocument();
		expect(screen.getByText('Choice Y')).toBeInTheDocument();
		expect(screen.getByText('Choice Z')).toBeInTheDocument();
	});

	it('renders the label', () => {
		render(<TestForm />);
		expect(screen.getByText('Pick one')).toBeInTheDocument();
	});

	it('has radio buttons', () => {
		render(<TestForm />);
		expect(screen.getAllByRole('radio')).toHaveLength(3);
	});

	it('can select an option', () => {
		render(<TestForm />);
		const radio = screen.getByDisplayValue('y');
		fireEvent.click(radio);
		expect(radio).toBeChecked();
	});

	it('renders with default value selected', () => {
		render(<TestForm defaultValue="z" />);
		expect(screen.getByDisplayValue('z')).toBeChecked();
	});
});
