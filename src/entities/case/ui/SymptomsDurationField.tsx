import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Control, useWatch } from 'react-hook-form';
import {
	CaseWriteFormValues,
	CaseWritePayload,
} from '~/shared/api/endpoints/case';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import { encodedDurationToString } from '../lib/encodedDurationToString';
import { getReactionClassification } from '../lib/getReactionClassification';
import { SymptomsDurationSelector } from './SymptomsDurationSelector';

interface SymptomsDurationFieldProps {
	control: Control<CaseWriteFormValues, any, CaseWritePayload>;
	isEditMode?: boolean;
}

export const SymptomsDurationField = ({
	control,
	isEditMode = false,
}: SymptomsDurationFieldProps) => {
	const symptomsTime = useWatch({
		name: 'symptomsTime',
		control: control,
	});
	const reaction = getReactionClassification(symptomsTime);

	const symptomsLabel = (
		<Stack direction="row" alignItems="center" spacing={1}>
			<Typography>Час виникнення симптомів</Typography>
			{reaction && (
				<Chip
					label={reaction.label}
					color={reaction.type === 'immediate' ? 'error' : 'warning'}
					size="small"
					sx={{ fontSize: '0.75rem', textAlign: 'center' }}
				/>
			)}
		</Stack>
	);

	return (
		<>
			<EditableField
				name="symptomsTime"
				control={control}
				label={symptomsLabel}
				renderReadMode={
					isEditMode ? (val) => encodedDurationToString(val) : undefined
				}
				renderEditMode={(props) => <SymptomsDurationSelector {...props} />}
			/>
		</>
	);
};
