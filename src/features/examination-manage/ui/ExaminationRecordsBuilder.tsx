import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import { Control, useFieldArray } from 'react-hook-form';
import {
	CaseWriteFormValues,
	CaseWritePayload,
} from '~/shared/api/endpoints/case';
import { ExaminationRecordRow } from './ExaminationRecordRow';

interface ExaminationRecordsBuilderProps {
	control: Control<CaseWriteFormValues, any, CaseWritePayload>;
}

export const ExaminationRecordsBuilder = ({
	control,
}: ExaminationRecordsBuilderProps) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'examinationRecords',
	});

	return (
		<Box sx={{ width: '100%' }}>
			{fields.map((field, index) => (
				<ExaminationRecordRow
					key={field.id}
					index={index}
					remove={remove}
					control={control}
				/>
			))}

			<Button
				startIcon={<AddIcon />}
				variant="outlined"
				onClick={() => append({ examination: null, result: '' })}
				size="small"
			>
				Додати обстеження
			</Button>
		</Box>
	);
};
