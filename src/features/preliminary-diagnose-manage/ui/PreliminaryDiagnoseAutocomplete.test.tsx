import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { PreliminaryDiagnoseAutocomplete } from './PreliminaryDiagnoseAutocomplete';

function TestForm() {
	const { control } = useForm({ defaultValues: { diagnoses: [] } });
	return <PreliminaryDiagnoseAutocomplete name="diagnoses" control={control} label="Попередній діагноз" />;
}

describe('PreliminaryDiagnoseAutocomplete', () => {
	it('renders an autocomplete', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Попередній діагноз')).toBeInTheDocument();
	});
});
