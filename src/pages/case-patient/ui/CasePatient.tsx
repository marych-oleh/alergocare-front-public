import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { PatientEditForm } from '~/features/patient/edit';
import { casesQueries } from '~/shared/api/endpoints/case';
import { PATHS } from '~/shared/routes';
import Loader from '~/shared/ui/Loader/Loader';
import { Route } from '../+types';

export const CasePatient = ({ params }: Route.ComponentProps) => {
	const { data: loadedCase, isLoading } = useQuery(
		casesQueries.detail(params.caseID)
	);

	if (!loadedCase || isLoading) {
		return <Loader />;
	}

	return (
		<Stack spacing={2}>
			<Box sx={{ alignSelf: 'flex-start' }}>
				<Button
					variant="outlined"
					component={Link}
					to={PATHS.patients.cases.get(loadedCase.patientId)}
				>
					Інші звернення пацієнта
				</Button>
			</Box>
			<PatientEditForm patientId={loadedCase.patient.id} />
		</Stack>
	);
};
