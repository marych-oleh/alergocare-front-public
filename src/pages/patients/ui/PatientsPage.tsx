import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { PatientsTableWidget } from '@widgets/patients-table';
import { useCallback } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { PatientDetail } from '~/shared/api/endpoints/patient';
import { PATHS } from '~/shared/routes';

export const PatientsPage = () => {
	const navigate = useNavigate();
	const onPatientCreated = useCallback((patient: PatientDetail) => {
		navigate(PATHS.patients.byId.get(patient.id));
	}, []);

	return (
		<Box sx={{ my: { xs: 2, md: 0 } }}>
			<PatientsTableWidget
				onPatientCreated={onPatientCreated}
				renderActions={(patient) => (
					<Stack direction="row" spacing={1}>
						<IconButton
							component={Link}
							to={PATHS.patients.byId.get(patient.id)}
						>
							<EditIcon />
						</IconButton>
					</Stack>
				)}
			/>
			<Outlet />
		</Box>
	);
};
