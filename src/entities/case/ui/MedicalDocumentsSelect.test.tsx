import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { MedicalDocumentsSelect } from './MedicalDocumentsSelect';

function TestForm() {
	const { control } = useForm({ defaultValues: { documents: [] } });
	return <MedicalDocumentsSelect name="documents" control={control} label="Документи" />;
}

describe('MedicalDocumentsSelect', () => {
	it('renders a select', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Документи')).toBeInTheDocument();
	});
});
