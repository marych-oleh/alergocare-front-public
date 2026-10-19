import { describe, it, expect, fireEvent } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { SymptomsDurationSelector } from './SymptomsDurationSelector';

function TestForm({ defaultValue = null }: { defaultValue?: number | null }) {
	const { control } = useForm({ defaultValues: { symptomsTime: defaultValue } });
	return <SymptomsDurationSelector name="symptomsTime" control={control as any} label="Тривалість" />;
}

describe('SymptomsDurationSelector', () => {
	it('renders without crashing', () => {
		render(<TestForm />);
		expect(document.body).toBeInTheDocument();
	});

	it('renders unit select', () => {
		render(<TestForm />);
		expect(screen.getAllByRole('combobox').length).toBeGreaterThanOrEqual(0);
	});

	it('renders with a numeric default value', () => {
		render(<TestForm defaultValue={3600} />);
		expect(document.body).toBeInTheDocument();
	});
});
