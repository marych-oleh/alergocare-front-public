import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { BaseAutocomplete } from './BaseAutocomplete';

const options = [
	{ id: '1', label: 'Option 1' },
	{ id: '2', label: 'Option 2' },
];

describe('BaseAutocomplete', () => {
	it('renders the combobox input', () => {
		render(
			<BaseAutocomplete
				options={options}
				getOptionLabel={(o) => o.label}
				value={null}
				onChange={() => {}}
			/>
		);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('renders with placeholder', () => {
		render(
			<BaseAutocomplete
				options={options}
				getOptionLabel={(o) => o.label}
				placeholder="Search..."
				value={null}
				onChange={() => {}}
			/>
		);
		expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
	});

	it('shows loading spinner when loading', () => {
		render(
			<BaseAutocomplete
				options={[]}
				getOptionLabel={(o: any) => o.label}
				loading={true}
				value={null}
				onChange={() => {}}
			/>
		);
		expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
	});

	it('renders with helperText', () => {
		render(
			<BaseAutocomplete
				options={options}
				getOptionLabel={(o) => o.label}
				helperText="Helper text here"
				value={null}
				onChange={() => {}}
			/>
		);
		expect(screen.getByText('Helper text here')).toBeInTheDocument();
	});

	it('renders autocomplete wrapper', () => {
		render(
			<BaseAutocomplete
				options={options}
				getOptionLabel={(o) => o.label}
				value={null}
				onChange={() => {}}
			/>
		);
		expect(document.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
	});
});
