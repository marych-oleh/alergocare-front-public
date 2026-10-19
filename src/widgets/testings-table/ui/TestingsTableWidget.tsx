import { Box, Button, Stack } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { testingColumns } from '~/entities/testing';
import { TestingCreateModal } from '~/features/testing-actions/create';
import {
	TestingRow,
	TestingsFilterSchema,
	testingsQueries,
} from '~/shared/api/endpoints/testing';
import { ServerDataGrid } from '~/shared/ui/data-grid/ServerDataGrid';
import { useServerGridAndFilters } from '~/shared/ui/data-grid/useServerGridAndFilters';
import {
	testingsDefaultFilters,
	testingsFilterOperators,
} from '../model/testings-filter';

export type TestingsTableWidgetProps = {
	caseId: string;
	renderActions?: (row: TestingRow) => React.ReactNode;
};

export const TestingsTableWidget = ({
	caseId,
	renderActions,
}: TestingsTableWidgetProps) => {
	const [searchParams, setSearchParams] = useSearchParams();

	// URL param create to initially open create modal
	const [isCreateModalOpen, setCreateModalOpen] = useState(() =>
		searchParams.has('create')
	);

	const { backendRequestParams, dataGridProps } = useServerGridAndFilters({
		schema: TestingsFilterSchema,
		operators: testingsFilterOperators,
		defaultFilters: testingsDefaultFilters,
	});

	const closeCreateModal = useCallback(() => {
		setCreateModalOpen(false);
		if (searchParams.has('create')) {
			const newParams = new URLSearchParams(searchParams);
			newParams.delete('create');
			setSearchParams(newParams, { replace: true });
		}
	}, []);

	const queryToUse = testingsQueries.caseList(caseId, backendRequestParams);

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
							width: 50,
							renderCell: (params: GridRenderCellParams<TestingRow>) =>
								renderActions(params.row),
						},
					]
				:	[]),
				...testingColumns,
			] as GridColDef<TestingRow>[],
		[renderActions]
	);

	if (error) {
		return (
			<Box>{error.message || 'Помилка завантаження даних тестувань'}</Box>
		);
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Stack
				direction={{ xs: 'column-reverse', lg: 'row' }}
				justifyContent="space-between"
				alignItems={{ xs: 'stretch', lg: 'center' }}
				spacing={1.5}
				mb={2}
			>
				<Button
					sx={{
						alignSelf: 'flex-end',
						flexShrink: 0,
					}}
					variant="contained"
					color="secondary"
					onClick={() => setCreateModalOpen(true)}
				>
					Створити тестування
				</Button>
			</Stack>

			<ServerDataGrid
				rows={data?.items ?? []}
				rowCount={data?.rowCount || 0}
				columns={columns}
				loading={isLoading || isFetching}
				// rowHeight={62}
				enableAllRowsAutoHeight
				{...dataGridProps}
			/>
			<TestingCreateModal
				open={isCreateModalOpen}
				onClose={closeCreateModal}
				onSuccess={closeCreateModal}
				formId="testing-create-form"
				caseId={caseId}
			/>
		</Box>
	);
};
