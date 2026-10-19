import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { UkraineDistrictAutocomplete } from './UkraineDistrictAutocomplete';

function TestForm() {
	const { control } = useForm({ defaultValues: { districtCode: null } });
	return <UkraineDistrictAutocomplete name="districtCode" control={control} label="Область" />;
}

describe('UkraineDistrictAutocomplete', () => {
	it('renders an autocomplete input', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Область')).toBeInTheDocument();
	});
});
