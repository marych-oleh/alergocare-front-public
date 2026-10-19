import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { PatientDiscoverySelect } from './PatientDiscoverySelect';

function TestForm() {
	const { control } = useForm({ defaultValues: { discoveryMethod: '' } });
	return <PatientDiscoverySelect name="discoveryMethod" control={control} label="Джерело" />;
}

describe('PatientDiscoverySelect', () => {
	it('renders a select', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders label', () => {
		render(<TestForm />);
		expect(screen.getByText('Джерело')).toBeInTheDocument();
	});

	it('opens options on click', () => {
		render(<TestForm />);
		fireEvent.mouseDown(screen.getByRole('combobox'));
		expect(screen.getByText('Самостійно')).toBeInTheDocument();
	});
});
