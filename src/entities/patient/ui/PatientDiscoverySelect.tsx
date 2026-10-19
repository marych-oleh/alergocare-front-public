import { FieldPath, FieldValues } from 'react-hook-form';
import { RHFSelect, RHFSelectProps } from '~/shared/ui/rhf/RHFSelect';
import { DISCOVERY_METHOD_LABEL } from '../model/dictionaries';

const options = Object.entries(DISCOVERY_METHOD_LABEL).map(([key, label]) => ({
	value: key,
	label,
}));

export const PatientDiscoverySelect = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
>({
	name,
	control,
	...props
}: Omit<
	RHFSelectProps<TFieldValues, TName, TTransformedValues>,
	'options' | 'multiple'
>) => {
	return (
		<RHFSelect
			{...props}
			multiple={false}
			name={name}
			control={control}
			options={options}
		/>
	);
};
