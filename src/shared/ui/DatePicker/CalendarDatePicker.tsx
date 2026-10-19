import { FieldPath, FieldValues } from 'react-hook-form';
import { DATE_FORMATS } from '~/shared/config';
import { RHFDatePicker, RHFDatePickerProps } from '../rhf/RHFDatePicker';

export const CalendarDatePicker = <
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
	props: RHFDatePickerProps<TFieldValues, TContext, TTransformedValues, TName>
) => {
	return <RHFDatePicker format={DATE_FORMATS.DISPLAY_DATE} {...props} />;
};
