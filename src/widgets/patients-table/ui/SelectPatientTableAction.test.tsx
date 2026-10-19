import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test-utils';
import { SelectPatientTableAction } from './SelectPatientTableAction';

const mockPatient = {
	id: '123e4567-e89b-42d3-a456-426614174001',
	surname: 'Тестовий',
	gender: 'male' as const,
	countryCode: 'UA',
	districtCode: null,
	birthday: '1990-05-15',
};

describe('SelectPatientTableAction', () => {
	it('renders select button', () => {
		render(<SelectPatientTableAction patient={mockPatient as any} onSelect={vi.fn()} />);
		expect(screen.getByRole('button', { name: 'Вибрати' })).toBeInTheDocument();
	});

	it('shows selected state when patient is selected', () => {
		render(
			<SelectPatientTableAction
				patient={mockPatient as any}
				selectedPatientId={mockPatient.id}
				onSelect={vi.fn()}
			/>
		);
		expect(screen.getByRole('button', { name: 'Обрано' })).toBeDisabled();
	});

	it('calls onSelect when clicked', () => {
		const onSelect = vi.fn();
		render(<SelectPatientTableAction patient={mockPatient as any} onSelect={onSelect} />);
		fireEvent.click(screen.getByRole('button'));
		expect(onSelect).toHaveBeenCalledWith(mockPatient);
	});

	it('does not call onSelect when already selected', () => {
		const onSelect = vi.fn();
		render(
			<SelectPatientTableAction
				patient={mockPatient as any}
				selectedPatientId={mockPatient.id}
				onSelect={onSelect}
			/>
		);
		fireEvent.click(screen.getByRole('button'));
		expect(onSelect).not.toHaveBeenCalled();
	});
});
