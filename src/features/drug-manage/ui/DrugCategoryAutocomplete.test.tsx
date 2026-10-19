import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { DrugCategoryAutocomplete } from './DrugCategoryAutocomplete';
import { useDrugCategoryTreeList } from '~/shared/api/endpoints/drug/drug.queries';

function TestForm() {
	const { control } = useForm({ defaultValues: { categoryId: '' } });
	return (
		<DrugCategoryAutocomplete
			name="categoryId"
			control={control}
			label="Категорія"
			useListQuery={useDrugCategoryTreeList}
		/>
	);
}

describe('DrugCategoryAutocomplete', () => {
	it('renders without crashing', () => {
		render(<TestForm />);
		expect(document.body).toBeInTheDocument();
	});

	it('renders the label text', () => {
		render(<TestForm />);
		expect(screen.getAllByText('Категорія').length).toBeGreaterThan(0);
	});
});
