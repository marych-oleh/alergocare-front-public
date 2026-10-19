import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { SymptomAutocomplete } from './SymptomAutocomplete';

function TestForm() {
	const { control } = useForm({ defaultValues: { symptoms: [] } });
	return <SymptomAutocomplete name="symptoms" control={control} label="Симптоми" />;
}

describe('SymptomAutocomplete', () => {
	it('renders an autocomplete', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Симптоми')).toBeInTheDocument();
	});
});
