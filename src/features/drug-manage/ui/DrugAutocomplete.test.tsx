import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { DrugAutocomplete } from './DrugAutocomplete';

function TestForm() {
	const { control } = useForm({ defaultValues: { drug: null } });
	return <DrugAutocomplete name="drug" control={control} label="Препарат" multiple={false} />;
}

describe('DrugAutocomplete', () => {
	it('renders an autocomplete input', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Препарат')).toBeInTheDocument();
	});
});
