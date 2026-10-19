import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { Control, useController, useWatch } from 'react-hook-form';

import {
	CaseWriteFormValues,
	CaseWritePayload,
} from '~/shared/api/endpoints/case';
import { RHFSelect } from '~/shared/ui/rhf/RHFSelect';
import { RHFTextField } from '~/shared/ui/rhf/RHFTextField';
import { ExaminationAutocomplete } from './ExaminationAutocomplete';

interface ExaminationRecordRowProps {
	index: number;
	remove: (index: number) => void;
	control: Control<CaseWriteFormValues, any, CaseWritePayload>;
}

export const ExaminationRecordRow = ({
	index,
	remove,
	control,
}: ExaminationRecordRowProps) => {
	const selectedExamination = useWatch({
		control,
		name: `examinationRecords.${index}.examination`,
	});

	const { field: resultField } = useController({
		name: `examinationRecords.${index}.result`,
		control,
	});

	const previousExamId = useRef(selectedExamination?.id);

	useEffect(() => {
		if (
			previousExamId.current &&
			previousExamId.current !== selectedExamination?.id
		) {
			resultField.onChange('');
		}
		previousExamId.current = selectedExamination?.id;
	}, [selectedExamination?.id, resultField]);

	const { isNumeric, selectOptions } = useMemo(() => {
		let isNumeric = false;
		let selectOptions: { value: string | number; label: string }[] = [];

		if (selectedExamination?.type) {
			const typeVal = selectedExamination.type;

			if (
				typeVal === 'number' ||
				(Array.isArray(typeVal) && typeVal[0] === 'number')
			) {
				isNumeric = true;
			} else if (Array.isArray(typeVal)) {
				selectOptions = typeVal.map((opt) => ({ value: opt, label: opt }));
			} else if (typeof typeVal === 'string') {
				try {
					const parsed = JSON.parse(typeVal);
					if (Array.isArray(parsed)) {
						selectOptions = parsed.map((opt) => ({
							value: opt,
							label: opt,
						}));
					}
				} catch {
					selectOptions = typeVal.split(',').map((opt) => ({
						value: opt.trim(),
						label: opt.trim(),
					}));
				}
			}
		}

		return { isNumeric, selectOptions };
	}, [selectedExamination?.type]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				gap: 1,
				alignItems: { xs: 'stretch', sm: 'flex-start' },
				mb: 1.5,
				p: { xs: 1, sm: 0 },
				bgcolor: { xs: 'background.default', sm: 'transparent' },
				borderWidth: { xs: 1, sm: 0 },
				borderColor: 'divider',
				borderStyle: 'solid',
				borderRadius: { xs: 1, sm: 0 },
			}}
		>
			<Box sx={{ flex: 1, width: '100%' }}>
				<ExaminationAutocomplete
					name={`examinationRecords.${index}.examination`}
					control={control}
					multiple={false}
					label="Обстеження"
					required
				/>
			</Box>

			<Box sx={{ flex: 1, width: '100%' }}>
				{selectedExamination &&
					(isNumeric ?
						<RHFTextField
							name={`examinationRecords.${index}.result`}
							control={control}
							label="Результат (Число)"
							type="number"
							required
						/>
					:	<RHFSelect
							name={`examinationRecords.${index}.result`}
							control={control}
							label="Результат"
							options={selectOptions}
							multiple={false}
							required
						/>)}
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					mt: { xs: 0, sm: 1 },
					alignSelf: { sm: 'center' },
				}}
			>
				<IconButton color="error" onClick={() => remove(index)}>
					<DeleteIcon />
				</IconButton>
			</Box>
		</Box>
	);
};
