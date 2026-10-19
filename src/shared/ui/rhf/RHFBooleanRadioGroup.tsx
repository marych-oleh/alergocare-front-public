import {
	FormControlLabel,
	Radio,
	RadioGroup,
	RadioGroupProps,
} from '@mui/material';
import { FieldPath, FieldValues } from 'react-hook-form';
import { RHFFormControl, RHFFormControlProps } from './RHFFormControl';

export type RHFBooleanRadioGroupProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
> = Omit<
	RHFFormControlProps<TFieldValues, any, TTransformedValues, TName>,
	'render'
> &
	Omit<RadioGroupProps, 'value'> & {
		trueLabel?: string;
		falseLabel?: string;
		row?: boolean;
	};

export const RHFBooleanRadioGroup = <
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

	trueLabel = 'Так',
	falseLabel = 'Ні',
	row = true,
	onChange: externalOnChange,
	...rest
}: RHFBooleanRadioGroupProps<TFieldValues, TName, TTransformedValues>) => {
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
					value={
						field.value === true ? 'true'
						: field.value === false ?
							'false'
						:	''
					}
					onChange={(e, v) => {
						const val = e.target.value;
						field.onChange(val === 'true');
						externalOnChange?.(e, v);
					}}
				>
					<FormControlLabel
						value="true"
						control={
							<Radio
								slotProps={{
									input: { required },
								}}
							/>
						}
						label={trueLabel}
					/>
					<FormControlLabel
						value="false"
						control={<Radio />}
						label={falseLabel}
					/>
				</RadioGroup>
			)}
		/>
	);
};
