import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { RHFDatePicker } from './RHFDatePicker';

function TestForm() {
	const { control } = useForm({ defaultValues: { date: null } });
	return <RHFDatePicker name="date" control={control} label="Дата" />;
}

function TestFormDisableFuture() {
	const { control } = useForm({ defaultValues: { date: null } });
	return <RHFDatePicker name="date" control={control} label="Дата" disableFuture />;
}

describe('RHFDatePicker', () => {
	it('renders without crashing', () => {
		render(<TestForm />);
		expect(document.querySelector('.MuiFormControl-root')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Дата')).toBeInTheDocument();
	});

	it('renders with disableFuture prop', () => {
		render(<TestFormDisableFuture />);
		expect(screen.getByText('Дата')).toBeInTheDocument();
	});
});
