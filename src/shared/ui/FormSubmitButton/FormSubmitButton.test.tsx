import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { FormSubmitButton } from './FormSubmitButton';

function Wrapper({
	loading = false,
	isDirtyOverride = false,
}: {
	loading?: boolean;
	isDirtyOverride?: boolean;
}) {
	const { control, setValue } = useForm({ defaultValues: { field: '' } });

	if (isDirtyOverride) {
		setValue('field', 'changed', { shouldDirty: true });
	}

	return (
		<FormSubmitButton
			formId="test-form"
			loading={loading}
			control={control}
		/>
	);
}

describe('FormSubmitButton', () => {
	it('renders with default label', () => {
		render(<Wrapper />);
		expect(screen.getByText('Зберегти зміни')).toBeInTheDocument();
	});

	it('renders custom label', () => {
		const { control } = (() => {
			let c: any;
			function F() {
				const form = useForm({ defaultValues: { x: '' } });
				c = form.control;
				return null;
			}
			render(<F />);
			return { control: c };
		})();

		if (!control) return;
		render(
			<FormSubmitButton formId="form" loading={false} control={control} label="Надіслати" />
		);
		expect(screen.getByText('Надіслати')).toBeInTheDocument();
	});

	it('shows pendingLabel when loading=true', () => {
		render(<Wrapper loading />);
		expect(screen.getByText('Збереження...')).toBeInTheDocument();
	});

	it('is disabled when form is not dirty', () => {
		render(<Wrapper />);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('is of type submit', () => {
		render(<Wrapper />);
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
	});
});
