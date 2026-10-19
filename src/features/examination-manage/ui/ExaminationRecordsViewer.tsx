import { Box, Divider, Paper, Typography } from '@mui/material';
import { CaseWriteFormValues } from '~/shared/api/endpoints/case';

interface ExaminationRecordsViewerProps {
	records: CaseWriteFormValues['examinationRecords'];
}

export const ExaminationRecordsViewer = ({
	records,
}: ExaminationRecordsViewerProps) => {
	if (!records || records.length === 0) {
		return (
			<Typography variant="body2">Немає даних про обстеження</Typography>
		);
	}

	return (
		<Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
			{records.map((record, index) => (
				<Box key={index}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: { xs: 'column', sm: 'row' },
							justifyContent: 'space-between',
							alignItems: { xs: 'flex-start', sm: 'center' },
							p: 2,
							gap: 1,
							bgcolor: index % 2 === 0 ? 'transparent' : 'action.hover',
						}}
					>
						<Typography variant="body2">
							{record.examination?.name || 'Невідоме обстеження'}
						</Typography>
						<Typography variant="body1" fontWeight="medium">
							{record.result}
						</Typography>
					</Box>
					{index < records.length - 1 && <Divider />}
				</Box>
			))}
		</Paper>
	);
};
