import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { RHFBooleanRadioGroup } from './RHFBooleanRadioGroup';

function TestForm({ defaultValue = undefined }: { defaultValue?: boolean }) {
	const { control } = useForm({ defaultValues: { flag: defaultValue } });
	return <RHFBooleanRadioGroup name="flag" control={control} label="Питання" />;
}

describe('RHFBooleanRadioGroup', () => {
	it('renders true/false radio options', () => {
		render(<TestForm />);
		expect(screen.getByText('Так')).toBeInTheDocument();
		expect(screen.getByText('Ні')).toBeInTheDocument();
	});

	it('renders label', () => {
		render(<TestForm />);
		expect(screen.getByText('Питання')).toBeInTheDocument();
	});

	it('renders custom true/false labels', () => {
		const { control } = (() => {
			let ctrl: any;
			function F() {
				const form = useForm({ defaultValues: { flag: false } });
				ctrl = form.control;
				return <RHFBooleanRadioGroup name="flag" control={form.control} trueLabel="Yes" falseLabel="No" />;
			}
			render(<F />);
			return { control: ctrl };
		})();
		expect(screen.getByText('Yes')).toBeInTheDocument();
		expect(screen.getByText('No')).toBeInTheDocument();
	});

	it('can select true', () => {
		render(<TestForm />);
		const trueRadio = screen.getByDisplayValue('true');
		fireEvent.click(trueRadio);
		expect(trueRadio).toBeChecked();
	});

	it('can select false', () => {
		render(<TestForm />);
		const falseRadio = screen.getByDisplayValue('false');
		fireEvent.click(falseRadio);
		expect(falseRadio).toBeChecked();
	});

	it('defaults to false value', () => {
		render(<TestForm defaultValue={false} />);
		expect(screen.getByDisplayValue('false')).toBeChecked();
	});
});
