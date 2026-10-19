import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { RHFStaticAutocomplete } from './RHFStaticAutocomplete';

const options = [
	{ code: 'UA', label: 'Україна' },
	{ code: 'PL', label: 'Польща' },
];

function TestForm() {
	const { control } = useForm({ defaultValues: { country: null } });
	return (
		<RHFStaticAutocomplete
			name="country"
			control={control}
			label="Країна"
			options={options}
		/>
	);
}

describe('RHFStaticAutocomplete', () => {
	it('renders an autocomplete', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Країна')).toBeInTheDocument();
	});
});
