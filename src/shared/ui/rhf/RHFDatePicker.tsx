import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import React, { memo, useMemo } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { dayjs } from '~/shared/lib/date';
import { RHFFormControl, RHFFormControlProps } from './RHFFormControl';

export type RHFDatePickerProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DatePickerProps, 'name' | 'label'> &
	Omit<
		RHFFormControlProps<TFieldValues, TContext, TTransformedValues, TName>,
		'render'
	>;

const CURRENT_DATE = dayjs();

const RHFDatePickerComponent = <
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

	disableFuture,
	maxDate,

	...props
}: RHFDatePickerProps<TFieldValues, TContext, TTransformedValues, TName>) => {
	const resolvedMaxDate = useMemo(() => {
		if (maxDate) return maxDate;
		if (disableFuture) return dayjs().endOf('day');
		return undefined;
	}, [maxDate, disableFuture]);
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
			render={({
				field: { value, ...fieldProps },
				fieldState: { error },
			}) => (
				<DatePicker
					{...props}
					{...fieldProps}
					value={value ?? null}
					maxDate={resolvedMaxDate}
					slotProps={{
						field: {
							clearable: true,
						},
						textField: {
							size: 'small',
							error: !!error,
							required: required,
						},
					}}
				/>
			)}
		/>
	);
};

export const RHFDatePicker = memo(RHFDatePickerComponent) as <
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
	props: RHFDatePickerProps<TFieldValues, TContext, TTransformedValues, TName>
) => React.ReactElement;
