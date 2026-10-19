import Typography from '@mui/material/Typography';
import { FieldPath, FieldValues } from 'react-hook-form';
import { TestingMethod } from '~/shared/api/endpoints/testing';
import {
	RHFRadioGroup,
	RHFRadioGroupProps,
} from '~/shared/ui/rhf/RHFRadioGroup';
import { getTestingStageOptions } from '../model/testing-dictionaries';

export const TestingStageSelect = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
>({
	name,
	control,
	methodValue,
	...props
}: Omit<
	RHFRadioGroupProps<TFieldValues, TName, TTransformedValues>,
	'options' | 'multiple'
> & { methodValue?: TestingMethod }) => {
	const options = getTestingStageOptions(methodValue);

	if (!methodValue) {
		return (
			<Typography variant="body2" color="text.secondary">
				Оберіть спосіб тестування
			</Typography>
		);
	}

	return (
		<RHFRadioGroup
			{...props}
			row
			name={name}
			control={control}
			options={options}
			disabled={props.disabled || !methodValue}
		/>
	);
};
