import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { RHFWatchValue } from './RHFWatchValue';

function TestForm() {
	const { control } = useForm({ defaultValues: { name: 'Тест' } });
	return (
		<RHFWatchValue
			control={control}
			name="name"
			render={(value) => <span data-testid="value">{value as string}</span>}
		/>
	);
}

describe('RHFWatchValue', () => {
	it('renders the current value', () => {
		render(<TestForm />);
		expect(screen.getByTestId('value')).toHaveTextContent('Тест');
	});

	it('renders null when render returns null', () => {
		function NullForm() {
			const { control } = useForm({ defaultValues: { name: '' } });
			return (
				<RHFWatchValue
					control={control}
					name="name"
					render={() => null}
				/>
			);
		}
		render(<NullForm />);
		expect(screen.queryByTestId('value')).not.toBeInTheDocument();
	});
});
