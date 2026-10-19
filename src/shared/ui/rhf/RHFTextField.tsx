import { TextField, TextFieldProps } from '@mui/material';
import { FieldPath, FieldValues } from 'react-hook-form';
import { RHFFormControl, RHFFormControlProps } from './RHFFormControl';

type RHFTextFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<TextFieldProps, 'name' | 'label'> &
	Omit<
		RHFFormControlProps<TFieldValues, TContext, TTransformedValues, TName>,
		'render'
	>;

export const RHFTextField = <
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	name,
	control,
	rules,
	shouldUnregister,
	disabled,

	label,
	required,
	disableHelperText,
	...props
}: RHFTextFieldProps<TFieldValues, TContext, TTransformedValues, TName>) => (
	<RHFFormControl
		{...{
			name,
			control,
			rules,
			shouldUnregister,
			disabled,
			disableHelperText,
			label,
			required,
		}}
		render={({ field: { value, ...fieldProps }, fieldState: { error } }) => (
			<TextField
				{...fieldProps}
				{...props}
				value={value ?? ''}
				error={!!error}
			/>
		)}
	/>
);
