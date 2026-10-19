import { FieldPath, FieldValues } from 'react-hook-form';
import {
	RHFRadioGroup,
	RHFRadioGroupProps,
} from '~/shared/ui/rhf/RHFRadioGroup';
import { GENDER_LABEL } from '../model/dictionaries';

const options = Object.entries(GENDER_LABEL).map(([key, label]) => ({
	value: key,
	label,
}));

export const PatientGenderSelect = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
>({
	name,
	control,
	...props
}: Omit<
	RHFRadioGroupProps<TFieldValues, TName, TTransformedValues>,
	'options'
>) => {
	return (
		<RHFRadioGroup
			{...props}
			row
			name={name}
			control={control}
			options={options}
		/>
	);
};
