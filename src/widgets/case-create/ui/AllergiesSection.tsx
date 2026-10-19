import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { AllergyAutocomplete } from '~/features/allergy-manage';
import { DrugAutocomplete } from '~/features/drug-manage';
import {
	CaseWriteFormValues,
	CaseWritePayload,
} from '~/shared/api/endpoints/case';
import { ChipList } from '~/shared/ui/ChipList/ChipList';
import { EditableField } from '~/shared/ui/EditableField/EditableField';

interface AllergiesSectionProps {
	control: Control<CaseWriteFormValues, any, CaseWritePayload>;
	setValue: UseFormSetValue<CaseWriteFormValues>;
	isEditMode?: boolean;
}

export const AllergiesSection = ({
	control,
	setValue,
	isEditMode = false,
}: AllergiesSectionProps) => {
	const allergies = useWatch({ control, name: 'allergies' });

	const showDrugAllergies = allergies?.some(
		(allergy: any) => allergy.name.toLowerCase() === 'медикаментозна алергія'
	);

	useEffect(() => {
		if (!showDrugAllergies) {
			setValue('drugAllergies', undefined, { shouldDirty: true });
		}
	}, [showDrugAllergies, setValue]);

	return (
		<Stack spacing={2}>
			<EditableField
				name="allergies"
				control={control}
				label="Алергологічний анамнез"
				renderReadMode={
					isEditMode ? (val) => <ChipList items={val} /> : undefined
				}
				renderEditMode={(props) => <AllergyAutocomplete {...props} />}
			/>

			{showDrugAllergies && (
				<EditableField
					name="drugAllergies"
					control={control}
					label="Медикаментозна алергія"
					renderReadMode={
						isEditMode ? (val) => <ChipList items={val} /> : undefined
					}
					renderEditMode={(props) => <DrugAutocomplete {...props} />}
				/>
			)}
		</Stack>
	);
};
