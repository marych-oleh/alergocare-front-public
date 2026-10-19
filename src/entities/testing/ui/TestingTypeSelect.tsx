import { FieldPath, FieldValues } from 'react-hook-form';
import {
	RHFRadioGroup,
	RHFRadioGroupProps,
} from '~/shared/ui/rhf/RHFRadioGroup';
import { TestingTypeDict } from '../model/testing-dictionaries';

const options = Object.entries(TestingTypeDict).map(([key, label]) => ({
	value: key,
	label,
}));

export const TestingTypeSelect = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
>({
	name,
	control,
	...props
}: Omit<
	RHFRadioGroupProps<TFieldValues, TName, TTransformedValues>,
	'options' | 'multiple'
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
