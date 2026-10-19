import { Button, ButtonProps } from '@mui/material';
import { Control, FieldValues, useFormState } from 'react-hook-form';

interface FormSubmitButtonProps<
	TFieldValues extends FieldValues = FieldValues,
	TTransformedValues = TFieldValues,
> extends Omit<ButtonProps, 'disabled' | 'type'> {
	formId: string;
	loading: boolean;
	control: Control<TFieldValues, any, TTransformedValues>;
	label?: string;
	pendingLabel?: string;
}

export const FormSubmitButton = <
	TFieldValues extends FieldValues,
	TTransformedValues = TFieldValues,
>({
	formId,
	loading,
	control,
	label = 'Зберегти зміни',
	pendingLabel = 'Збереження...',
	color = 'secondary',
	variant = 'contained',
	...props
}: FormSubmitButtonProps<TFieldValues, TTransformedValues>) => {
	const { isDirty } = useFormState({ control });

	return (
		<Button
			{...props}
			color={color}
			variant={variant}
			form={formId}
			type="submit"
			loading={loading}
			disabled={loading || !isDirty}
		>
			{loading ? pendingLabel : label}
		</Button>
	);
};
