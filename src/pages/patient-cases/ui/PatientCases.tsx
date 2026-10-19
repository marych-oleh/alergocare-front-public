import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Link, Outlet } from 'react-router';
import { PATHS } from '~/shared/routes';
import { CasesTableWidget } from '~/widgets/cases-table';
import { Route } from '../+types';

export const PatientCases = ({ params }: Route.ComponentProps) => {
	return (
		<>
			<CasesTableWidget
				patientId={params.patientID}
				renderActions={(caseRow) => (
					<Stack direction="row" spacing={1}>
						<IconButton
							component={Link}
							to={PATHS.cases.byId.get(caseRow.id)}
						>
							<EditIcon />
						</IconButton>
					</Stack>
				)}
			/>
			<Outlet />
		</>
	);
};
