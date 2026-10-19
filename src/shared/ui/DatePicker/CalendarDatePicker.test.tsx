import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { CalendarDatePicker } from './CalendarDatePicker';

function TestForm() {
	const { control } = useForm({ defaultValues: { date: null } });
	return <CalendarDatePicker name="date" control={control} label="Оберіть дату" />;
}

describe('CalendarDatePicker', () => {
	it('renders without crashing', () => {
		render(<TestForm />);
		expect(document.querySelector('.MuiDatePicker-root, .MuiFormControl-root')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Оберіть дату')).toBeInTheDocument();
	});
});
