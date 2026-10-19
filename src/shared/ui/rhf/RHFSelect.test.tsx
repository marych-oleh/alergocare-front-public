import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { RHFSelect } from './RHFSelect';

const options = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' },
	{ value: 'c', label: 'Option C' },
];

function TestForm({ defaultValue = '', multiple = false }: { defaultValue?: string; multiple?: boolean }) {
	const { control } = useForm({ defaultValues: { field: defaultValue } });
	return <RHFSelect name="field" control={control} label="Test Label" options={options} multiple={multiple} />;
}

describe('RHFSelect', () => {
	it('renders the select', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Test Label')).toBeInTheDocument();
	});

	it('renders with default value', () => {
		render(<TestForm defaultValue="a" />);
		expect(screen.getByText('Option A')).toBeInTheDocument();
	});

	it('opens options on click', () => {
		render(<TestForm />);
		fireEvent.mouseDown(screen.getByRole('combobox'));
		expect(screen.getByText('Option B')).toBeInTheDocument();
	});

	it('renders multiple select', () => {
		render(<TestForm multiple />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});
});
