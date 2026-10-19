import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { TestingTypeSelect } from './TestingTypeSelect';

function TestForm() {
	const { control } = useForm({ defaultValues: { type: '' } });
	return <TestingTypeSelect name="type" control={control} label="Тип тесту" />;
}

describe('TestingTypeSelect', () => {
	it('renders radio buttons', () => {
		render(<TestForm />);
		expect(screen.getAllByRole('radio').length).toBeGreaterThan(0);
	});

	it('renders label', () => {
		render(<TestForm />);
		expect(screen.getByText('Тип тесту')).toBeInTheDocument();
	});

	it('can select a type', () => {
		render(<TestForm />);
		const radios = screen.getAllByRole('radio');
		fireEvent.click(radios[0]);
		expect(radios[0]).toBeChecked();
	});
});
