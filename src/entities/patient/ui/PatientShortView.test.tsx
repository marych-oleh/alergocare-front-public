import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { PatientShortView } from './PatientShortView';
import type { PatientShort } from '~/shared/api/endpoints/patient';

const mockPatient: PatientShort = {
	id: '00000000-0000-0000-0000-000000000001',
	surname: 'Коваленко',
	gender: 'female',
	countryCode: 'UA',
	districtCode: 'UA-46',
	birthday: '1985-03-22',
};

describe('PatientShortView', () => {
	it('renders patient surname', () => {
		render(<PatientShortView patient={mockPatient} />);
		expect(screen.getByText('Коваленко')).toBeInTheDocument();
	});

	it('renders gender label', () => {
		render(<PatientShortView patient={mockPatient} />);
		expect(screen.getByText(/Жінка/)).toBeInTheDocument();
	});

	it('renders birthday formatted', () => {
		render(<PatientShortView patient={mockPatient} />);
		// The date should appear somewhere in the component
		expect(screen.getByText(/1985|22|03/)).toBeInTheDocument();
	});

	it('renders male gender label correctly', () => {
		render(<PatientShortView patient={{ ...mockPatient, gender: 'male' }} />);
		expect(screen.getByText(/Чоловік/)).toBeInTheDocument();
	});
});
