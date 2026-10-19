import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { CountryAutocomplete } from './CountryAutocomplete';

function TestForm() {
	const { control } = useForm({ defaultValues: { countryCode: null } });
	return <CountryAutocomplete name="countryCode" control={control} label="Країна" />;
}

describe('CountryAutocomplete', () => {
	it('renders an autocomplete input', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Країна')).toBeInTheDocument();
	});
});
