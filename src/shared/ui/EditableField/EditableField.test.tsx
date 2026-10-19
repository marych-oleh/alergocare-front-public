import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { EditableField } from './EditableField';
import { RHFTextField } from '../rhf/RHFTextField';
import type { EditableFieldContext } from './EditableField';

function AlwaysEditableForm() {
	const { control } = useForm({ defaultValues: { note: '' } });
	return (
		<EditableField
			name="note"
			control={control}
			label="Нотатка"
			required
			renderEditMode={(ctx: EditableFieldContext<any>) => (
				<RHFTextField name={ctx.name} control={ctx.control} />
			)}
		/>
	);
}

function ToggleableForm() {
	const { control } = useForm({ defaultValues: { status: 'активний' } });
	return (
		<EditableField
			name="status"
			control={control}
			label="Статус"
			renderReadMode={(value) => String(value ?? '')}
			renderEditMode={(ctx: EditableFieldContext<any>) => (
				<RHFTextField name={ctx.name} control={ctx.control} />
			)}
		/>
	);
}

describe('EditableField', () => {
	it('renders label', () => {
		render(<AlwaysEditableForm />);
		expect(screen.getByText('Нотатка')).toBeInTheDocument();
	});

	it('shows required asterisk when required=true', () => {
		render(<AlwaysEditableForm />);
		expect(screen.getByText('*')).toBeInTheDocument();
	});

	it('renders edit mode by default when no renderReadMode', () => {
		render(<AlwaysEditableForm />);
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	it('renders read mode by default when renderReadMode is provided', () => {
		render(<ToggleableForm />);
		expect(screen.getByText('активний')).toBeInTheDocument();
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
	});

	it('shows toggle button when renderReadMode is provided', () => {
		render(<ToggleableForm />);
		const toggleButton = screen.getByRole('button');
		expect(toggleButton).toBeInTheDocument();
	});

	it('switches to edit mode when toggle button is clicked', () => {
		render(<ToggleableForm />);
		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	it('switches back to read mode on second toggle click', () => {
		render(<ToggleableForm />);
		fireEvent.click(screen.getByRole('button'));
		fireEvent.click(screen.getByRole('button'));
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
	});
});
