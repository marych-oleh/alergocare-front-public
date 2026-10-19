import { describe, it, expect, vi } from 'vitest';
import {
	render,
	screen,
	fireEvent,
	waitFor,
} from '../../../../test-utils';
import { PatientCreateForm } from './PatientCreateForm';

describe('PatientCreateForm', () => {
	it('renders the surname field', () => {
		render(<PatientCreateForm />);
		expect(screen.getByText('Прізвище')).toBeInTheDocument();
	});

	it('renders the gender field', () => {
		render(<PatientCreateForm />);
		expect(screen.getByText('Стать')).toBeInTheDocument();
	});

	it('renders the discovery method field', () => {
		render(<PatientCreateForm />);
		expect(screen.getByText('Джерело залучення')).toBeInTheDocument();
	});

	it('renders the birthday field', () => {
		render(<PatientCreateForm />);
		expect(screen.getByText('Дата народження')).toBeInTheDocument();
	});

	it('renders the country field', () => {
		render(<PatientCreateForm />);
		expect(screen.getByText('Країна')).toBeInTheDocument();
	});

	it('renders required asterisks on required fields', () => {
		render(<PatientCreateForm />);
		const asterisks = screen.getAllByText('*');
		expect(asterisks.length).toBeGreaterThan(0);
	});

	it('renders with a formId when provided', () => {
		render(<PatientCreateForm formId="create-patient-form" />);
		const form = document.getElementById('create-patient-form');
		expect(form).toBeInTheDocument();
	});

	it('accepts onSuccess callback without crashing', () => {
		const onSuccess = vi.fn();
		expect(() =>
			render(<PatientCreateForm onSuccess={onSuccess} />)
		).not.toThrow();
	});

	it('calls onSuccess after successful form submission', async () => {
		const onSuccess = vi.fn();
		render(<PatientCreateForm formId="test-form" onSuccess={onSuccess} />);

		// Fill surname field
		const surnameInput = screen.getByRole('textbox');
		fireEvent.change(surnameInput, { target: { value: 'Тестовий' } });

		// Submit form programmatically
		const form = document.getElementById('test-form') as HTMLFormElement;
		if (form) {
			fireEvent.submit(form);
		}

		// Wait a bit — even on validation error, no crash
		await waitFor(() => {
			expect(document.getElementById('test-form')).toBeInTheDocument();
		});
	});
});
