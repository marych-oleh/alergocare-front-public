import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { SymptomsDurationField } from './SymptomsDurationField';

function TestForm() {
	const { control } = useForm({ defaultValues: { symptomsTime: 0 } });
	return <SymptomsDurationField control={control as any} />;
}

describe('SymptomsDurationField', () => {
	it('renders without crashing', () => {
		render(<TestForm />);
		expect(screen.getByText(/Час виникнення симптомів/)).toBeInTheDocument();
	});
});
