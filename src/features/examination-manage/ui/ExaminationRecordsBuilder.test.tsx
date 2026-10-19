import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { ExaminationRecordsBuilder } from './ExaminationRecordsBuilder';

function TestForm() {
	const { control } = useForm({ defaultValues: { examinationRecords: [] } });
	return <ExaminationRecordsBuilder control={control as any} />;
}

describe('ExaminationRecordsBuilder', () => {
	it('renders add button', () => {
		render(<TestForm />);
		expect(screen.getByRole('button', { name: /Додати обстеження/i })).toBeInTheDocument();
	});

	it('adds a row when add button clicked', () => {
		render(<TestForm />);
		fireEvent.click(screen.getByRole('button', { name: /Додати обстеження/i }));
		expect(document.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
	});
});
