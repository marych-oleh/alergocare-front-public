import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Link, Outlet } from 'react-router';
import { PATHS } from '~/shared/routes';
import { CasesTableWidget } from '~/widgets/cases-table';

export function CasesPage() {
	return (
		<Box sx={{ my: { xs: 2, md: 0 } }}>
			<CasesTableWidget
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
		</Box>
	);
}
