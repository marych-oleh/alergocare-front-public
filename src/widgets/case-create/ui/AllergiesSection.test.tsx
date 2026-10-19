import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { AllergiesSection } from './AllergiesSection';

function TestForm() {
	const { control, setValue } = useForm({
		defaultValues: { allergies: [], drugAllergies: [] }
	});
	return <AllergiesSection control={control as any} setValue={setValue as any} />;
}

describe('AllergiesSection', () => {
	it('renders without crashing', () => {
		render(<TestForm />);
		expect(document.body).toBeInTheDocument();
	});

	it('renders allergies label', () => {
		render(<TestForm />);
		expect(screen.getByText('Алергологічний анамнез')).toBeInTheDocument();
	});
});
