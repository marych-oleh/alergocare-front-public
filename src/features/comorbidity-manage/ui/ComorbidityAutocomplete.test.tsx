import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { ComorbidityAutocomplete } from './ComorbidityAutocomplete';

function TestForm() {
	const { control } = useForm({ defaultValues: { comorbidities: [] } });
	return <ComorbidityAutocomplete name="comorbidities" control={control} label="Супутні захворювання" />;
}

describe('ComorbidityAutocomplete', () => {
	it('renders an autocomplete', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Супутні захворювання')).toBeInTheDocument();
	});
});
