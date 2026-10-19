import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { RHFFormControl } from './RHFFormControl';

function TestForm() {
	const { control } = useForm({ defaultValues: { field: 'test' } });
	return (
		<RHFFormControl
			name="field"
			control={control}
			label="My Label"
			render={({ field }) => <input {...field} data-testid="input" />}
		/>
	);
}

describe('RHFFormControl', () => {
	it('renders the control', () => {
		render(<TestForm />);
		expect(screen.getByTestId('input')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('My Label')).toBeInTheDocument();
	});

	it('passes value to render', () => {
		render(<TestForm />);
		expect(screen.getByDisplayValue('test')).toBeInTheDocument();
	});

	it('renders with required indicator', () => {
		function RequiredForm() {
			const { control } = useForm({ defaultValues: { field: '' } });
			return (
				<RHFFormControl
					name="field"
					control={control}
					label="Required"
					required
					render={({ field }) => <input {...field} />}
				/>
			);
		}
		render(<RequiredForm />);
		expect(screen.getByText('Required')).toBeInTheDocument();
	});
});
