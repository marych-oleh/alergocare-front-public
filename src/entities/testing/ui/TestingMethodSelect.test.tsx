import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { TestingMethodSelect } from './TestingMethodSelect';

function TestForm() {
	const { control } = useForm({ defaultValues: { method: '' } });
	return <TestingMethodSelect name="method" control={control} label="Метод" />;
}

describe('TestingMethodSelect', () => {
	it('renders radio buttons for methods', () => {
		render(<TestForm />);
		expect(screen.getAllByRole('radio').length).toBeGreaterThan(0);
	});

	it('renders label', () => {
		render(<TestForm />);
		expect(screen.getByText('Метод')).toBeInTheDocument();
	});

	it('renders skin option', () => {
		render(<TestForm />);
		expect(screen.getByText(/[Шш]кір/)).toBeInTheDocument();
	});
});
