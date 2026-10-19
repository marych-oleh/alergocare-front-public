import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { ExaminationAutocomplete } from './ExaminationAutocomplete';

function TestForm() {
	const { control } = useForm({ defaultValues: { examinations: [] } });
	return <ExaminationAutocomplete name="examinations" control={control} label="Обстеження" />;
}

describe('ExaminationAutocomplete', () => {
	it('renders an autocomplete', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Обстеження')).toBeInTheDocument();
	});
});
