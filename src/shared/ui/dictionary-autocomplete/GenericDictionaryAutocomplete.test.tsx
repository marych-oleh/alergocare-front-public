import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { GenericDictionaryAutocomplete } from './GenericDictionaryAutocomplete';

const options = [
	{ id: '123e4567-e89b-42d3-a456-426614174010', name: 'Option A' },
	{ id: '123e4567-e89b-42d3-a456-426614174011', name: 'Option B' },
];

function TestForm() {
	const { control } = useForm({ defaultValues: { field: null } });
	return (
		<GenericDictionaryAutocomplete
			name="field"
			control={control}
			label="Test Field"
			options={options}
		/>
	);
}

describe('GenericDictionaryAutocomplete', () => {
	it('renders an autocomplete', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Test Field')).toBeInTheDocument();
	});

	it('renders with create option handler', () => {
		function TestFormWithCreate() {
			const { control } = useForm({ defaultValues: { field: null } });
			return (
				<GenericDictionaryAutocomplete
					name="field"
					control={control}
					label="With Create"
					options={options}
					onCreateRequest={vi.fn()}
				/>
			);
		}
		render(<TestFormWithCreate />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});
});
