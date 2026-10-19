import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { casesQueries } from '~/shared/api/endpoints/case';
import { PATHS } from '~/shared/routes';
import Loader from '~/shared/ui/Loader/Loader';
import { TestingsTableWidget } from '~/widgets/testings-table';
import { Route } from '../+types';

export const CaseTestingsPage = ({ params }: Route.ComponentProps) => {
	const { data: loadedCase, isLoading } = useQuery(
		casesQueries.detail(params.caseID)
	);

	if (!loadedCase || isLoading) {
		return <Loader />;
	}

	return (
		<Stack spacing={2}>
			<TestingsTableWidget
				caseId={loadedCase.id}
				renderActions={(testing) => (
					<Stack direction="row" spacing={1}>
						<IconButton
							component={Link}
							to={PATHS.cases.testing.byId.get(
								testing.caseId,
								testing.id
							)}
						>
							<EditIcon />
						</IconButton>
					</Stack>
				)}
			/>
		</Stack>
	);
};
