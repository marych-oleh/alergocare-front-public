import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { CrudDictionaryAutocomplete } from './CrudDictionaryAutocomplete';
import { useAllergyOptionsList } from '~/shared/api/endpoints/allergy';
import { useCreateAllergyMutation, useUpdateAllergyMutation, useDeleteAllergyMutation } from '~/features/allergy-manage/api/mutation';
import { AllergyWriteSchema } from '~/shared/api/endpoints/allergy';

function TestForm() {
	const { control } = useForm({ defaultValues: { allergies: [] } });
	return (
		<CrudDictionaryAutocomplete
			name="allergies"
			control={control}
			label="Алергени"
			multiple={true}
			validationSchema={AllergyWriteSchema}
			useListQuery={useAllergyOptionsList}
			useCreateMutation={useCreateAllergyMutation}
			useUpdateMutation={useUpdateAllergyMutation}
			useDeleteMutation={useDeleteAllergyMutation}
		/>
	);
}

describe('CrudDictionaryAutocomplete', () => {
	it('renders an autocomplete', () => {
		render(<TestForm />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with label', () => {
		render(<TestForm />);
		expect(screen.getByText('Алергени')).toBeInTheDocument();
	});
});
