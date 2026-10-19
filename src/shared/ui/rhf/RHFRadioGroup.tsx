import {
	FormControlLabel,
	Radio,
	RadioGroup,
	RadioGroupProps,
} from '@mui/material';
import { FieldPath, FieldValues } from 'react-hook-form';
import { RHFFormControl, RHFFormControlProps } from './RHFFormControl';

export type RHFRadioGroupProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
> = Omit<
	RHFFormControlProps<TFieldValues, any, TTransformedValues, TName>,
	'render'
> &
	Omit<RadioGroupProps, 'value'> & {
		options: { value: string | number; label: string }[];
		row?: boolean;
	};

export const RHFRadioGroup = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
>({
	name,
	control,
	rules,
	shouldUnregister,
	disabled,

	label,
	required,
	disableHelperText,

	options,
	row = false,
	onChange: externalOnChange,
	...rest
}: RHFRadioGroupProps<TFieldValues, TName, TTransformedValues>) => {
	return (
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
			render={({ field }) => (
				<RadioGroup
					{...rest}
					row={row}
					value={field.value ?? ''}
					onChange={(e, v) => {
						field.onChange(e.target.value);
						externalOnChange?.(e, v);
					}}
				>
					{options.map((option, index) => (
						<FormControlLabel
							key={option.value}
							value={option.value}
							control={
								<Radio
									slotProps={{
										input: { required: index === 0 && required },
									}}
								/>
							}
							label={option.label}
						/>
					))}
				</RadioGroup>
			)}
		/>
	);
};
