import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { ComplicationAutocomplete } from './ComplicationAutocomplete';

function TestForm() {
	const { control } = useForm({ defaultValues: { complications: [] } });
	return <ComplicationAutocomplete name="complications" control={control} label="Ускладнення" />;
}

describe('ComplicationAutocomplete', () => {
	it('renders an autocomplete', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Ускладнення')).toBeInTheDocument();
	});
});
