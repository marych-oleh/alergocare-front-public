import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { AllergyAutocomplete } from './AllergyAutocomplete';

function TestForm() {
	const { control } = useForm({ defaultValues: { allergies: [] } });
	return <AllergyAutocomplete name="allergies" control={control} label="Алергени" />;
}

describe('AllergyAutocomplete', () => {
	it('renders an autocomplete', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Алергени')).toBeInTheDocument();
	});
});
