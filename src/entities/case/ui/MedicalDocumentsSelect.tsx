import { FieldPath, FieldValues } from 'react-hook-form';
import { MEDICAL_DOCUMENTS_LABELS } from '~/shared/lib/medical-document';
import { RHFSelect, RHFSelectProps } from '~/shared/ui/rhf/RHFSelect';

const options = Object.entries(MEDICAL_DOCUMENTS_LABELS).map(
	([key, label]) => ({
		value: key,
		label,
	})
);

export const MedicalDocumentsSelect = <
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
			multiple
			name={name}
			control={control}
			options={options}
			placeholder="Відсутня медина документація"
		/>
	);
};
