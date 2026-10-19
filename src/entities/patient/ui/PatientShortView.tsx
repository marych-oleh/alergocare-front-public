import Card, { CardProps } from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { PatientShort } from '~/shared/api/endpoints/patient';
import { dateFormatters } from '~/shared/lib/date';
import { GENDER_LABEL } from '../model/dictionaries';

type PatientShortViewProps = {
	patient: PatientShort;
} & CardProps;

export const PatientShortView = ({
	patient,
	sx,
	...props
}: PatientShortViewProps) => {
	return (
		<Card sx={{ px: 1.5, py: 1, ...sx }} {...props}>
			<Typography sx={{ color: 'text.secondary' }}>
				{GENDER_LABEL[patient.gender]} |{' '}
				{dateFormatters.toUiDate(patient.birthday)}
			</Typography>
			<Typography variant="h6" fontWeight={400} component="div">
				{patient.surname}
			</Typography>
		</Card>
	);
};
