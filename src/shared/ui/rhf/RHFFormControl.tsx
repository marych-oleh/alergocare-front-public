import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import {
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
} from 'react-hook-form';

export type RHFFormControlProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName, TTransformedValues> &
	Omit<FormControlProps, 'error' | 'onChange'> & {
		label?: string;
		disableHelperText?: boolean;
	};

export const RHFFormControl = <
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	name,
	control,
	render,
	rules,
	shouldUnregister,
	defaultValue,
	disabled,

	label,
	required,
	fullWidth = true,
	disableHelperText = false,
	...formControlProps
}: RHFFormControlProps<TFieldValues, TContext, TTransformedValues, TName>) => (
	<Controller
		{...{
			name,
			control,
			render,
			rules,
			shouldUnregister,
			defaultValue,
			disabled,
		}}
		render={({ field, fieldState, formState }) => (
			<FormControl
				required={required}
				error={!!fieldState.error}
				fullWidth={fullWidth}
				{...formControlProps}
			>
				{label && (
					<FormLabel required={required} htmlFor={name as string}>
						{label}
					</FormLabel>
				)}
				{render({ field, fieldState, formState })}
				{!disableHelperText && fieldState.error && (
					<FormHelperText>{fieldState.error.message}</FormHelperText>
				)}
			</FormControl>
		)}
	/>
);
