import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { FieldPath, FieldValues } from 'react-hook-form';
import { RHFFormControl, RHFFormControlProps } from './RHFFormControl';

export type RHFToggleProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<SwitchProps, 'name'> &
	Omit<
		RHFFormControlProps<TFieldValues, TContext, TTransformedValues, TName>,
		'render'
	>;

export const RHFToggle = <
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	name,
	control,
	label,
	required,
	fullWidth = false,
	disableHelperText,
	...props
}: RHFToggleProps<TFieldValues, TContext, TTransformedValues, TName>) => (
	<RHFFormControl
		name={name}
		control={control}
		required={required}
		fullWidth={fullWidth}
		disableHelperText={disableHelperText}
		render={({ field: { value, onChange, ...restField } }) => (
			<FormControlLabel
				control={
					<Switch
						{...restField}
						{...props}
						checked={!!value}
						onChange={(e) => onChange(e.target.checked)}
						id={name as string}
					/>
				}
				label={label}
				required={required}
			/>
		)}
	/>
);
