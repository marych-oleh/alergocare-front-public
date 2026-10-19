import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material/styles';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link } from 'react-router';
import { CasesFilterSchema, CaseTable } from '~/shared/api/endpoints/case';
import { casesQueries } from '~/shared/api/endpoints/case/';
import { ROUTES } from '~/shared/routes';
import { ServerDataGrid } from '~/shared/ui/data-grid/ServerDataGrid';
import { useServerGridAndFilters } from '~/shared/ui/data-grid/useServerGridAndFilters';
import {
	casesDefaultFilters,
	casesFilterOperators,
} from '../model/cases-filter';
import { CasesFilters } from './CasesFilters';
import { casesColumns } from './columns';

export type CasesTableWidgetProps = {
	patientId?: string;
	renderActions?: (caseRow: CaseTable) => React.ReactNode;
	containerSx?: SxProps;
};

export const CasesTableWidget = ({
	patientId,
	renderActions,
	containerSx,
}: CasesTableWidgetProps) => {
	const { backendRequestParams, filterForm, dataGridProps } =
		useServerGridAndFilters({
			schema: CasesFilterSchema,
			operators: casesFilterOperators,
			defaultFilters: casesDefaultFilters,
		});

	// Select the appropriate query depending on whether patientId is provided
	const queryToUse =
		patientId ?
			casesQueries.patientList(patientId, backendRequestParams)
		:	casesQueries.list(backendRequestParams);

	const { data, error, isLoading, isFetching } = useQuery(queryToUse);

	const columns = useMemo(
		() =>
			[
				...(renderActions ?
					[
						{
							field: 'actions',
							type: 'actions',
							headerName: 'Дії',
							width: 100,
							renderCell: (params: GridRenderCellParams<CaseTable>) =>
								renderActions(params.row),
						},
					]
				:	[]),
				...casesColumns,
			] as GridColDef<CaseTable>[],
		[renderActions]
	);

	if (error) return <Box>{error?.message || 'Помилка завантаження'}</Box>;

	return (
		<Box sx={{ width: '100%', ...containerSx }}>
			<Stack
				direction={{ xs: 'column-reverse', lg: 'row' }}
				justifyContent="space-between"
				alignItems={{ xs: 'stretch', lg: 'center' }}
				spacing={1.5}
				mb={2}
			>
				<CasesFilters
					filterForm={filterForm}
					hidePatientFields={!!patientId}
				/>

				<Button
					sx={{
						alignSelf: 'flex-end',
						flexShrink: 0,
					}}
					variant="contained"
					color="secondary"
					component={Link}
					to={ROUTES.CASE_CREATE}
				>
					Створити звернення
				</Button>
			</Stack>

			<ServerDataGrid
				rows={data?.items ?? []}
				rowCount={data?.rowCount ?? 0}
				columns={columns}
				loading={isLoading || isFetching}
				enableAllRowsAutoHeight
				{...dataGridProps}
			/>
		</Box>
	);
};
