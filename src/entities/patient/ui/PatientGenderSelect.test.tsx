import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { PatientGenderSelect } from './PatientGenderSelect';

function TestForm() {
	const { control } = useForm({ defaultValues: { gender: '' } });
	return <PatientGenderSelect name="gender" control={control} label="Стать" />;
}

describe('PatientGenderSelect', () => {
	it('renders gender options', () => {
		render(<TestForm />);
		expect(screen.getByText('Чоловік')).toBeInTheDocument();
		expect(screen.getByText('Жінка')).toBeInTheDocument();
	});

	it('renders radio buttons', () => {
		render(<TestForm />);
		expect(screen.getAllByRole('radio')).toHaveLength(2);
	});

	it('renders label', () => {
		render(<TestForm />);
		expect(screen.getByText('Стать')).toBeInTheDocument();
	});
});
