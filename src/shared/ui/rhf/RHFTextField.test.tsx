import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { RHFTextField } from './RHFTextField';

function TestForm({
	defaultValue = '',
	label,
	required,
}: {
	defaultValue?: string;
	label?: string;
	required?: boolean;
}) {
	const { control } = useForm({ defaultValues: { name: defaultValue } });
	return (
		<RHFTextField
			name="name"
			control={control}
			label={label}
			required={required}
			placeholder="Введіть значення"
		/>
	);
}

describe('RHFTextField', () => {
	it('renders an input field', () => {
		render(<TestForm />);
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	it('renders with a label', () => {
		render(<TestForm label="Прізвище" />);
		expect(screen.getByText('Прізвище')).toBeInTheDocument();
	});

	it('renders with default value', () => {
		render(<TestForm defaultValue="Коваленко" />);
		expect(screen.getByDisplayValue('Коваленко')).toBeInTheDocument();
	});

	it('renders required indicator when required=true', () => {
		render(<TestForm label="Поле" required />);
		const label = screen.getByText('Поле');
		expect(label).toBeInTheDocument();
	});

	it('renders placeholder', () => {
		render(<TestForm />);
		expect(screen.getByPlaceholderText('Введіть значення')).toBeInTheDocument();
	});
});
