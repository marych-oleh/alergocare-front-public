import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material/styles';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { patientColumns } from '~/entities/patient';
import { PatientCreateModal } from '~/features/patient/create';
import {
	PatientDetail,
	PatientsFilterSchema,
	PatientShort,
	patientsQueries,
} from '~/shared/api/endpoints/patient';
import { ServerDataGrid } from '~/shared/ui/data-grid/ServerDataGrid';
import { useServerGridAndFilters } from '~/shared/ui/data-grid/useServerGridAndFilters';
import {
	patientsDefaultFilters,
	patientsFilterOperators,
} from '../model/patients-filter';
import { PatientsFilters } from './PatientsFilters';

export type PatientsTableWidgetProps = {
	// Slot for actions (Edit link, Select button, etc.)
	renderActions?: (patient: PatientShort) => React.ReactNode;
	// Callback when a new patient is created via the empty-state button
	onPatientCreated?: (patient: PatientDetail) => void;
	// Custom height or styling
	containerSx?: SxProps;
};

export const PatientsTableWidget = ({
	renderActions,
	onPatientCreated,
	containerSx,
}: PatientsTableWidgetProps) => {
	const [isCreateModalOpen, setCreateModalOpen] = useState(false);

	const { backendRequestParams, filterForm, dataGridProps } =
		useServerGridAndFilters({
			schema: PatientsFilterSchema,
			operators: patientsFilterOperators,
			defaultFilters: patientsDefaultFilters,
		});

	const { data, error, isLoading, isFetching } = useQuery(
		patientsQueries.list(backendRequestParams)
	);

	const columns = useMemo(
		() =>
			[
				...patientColumns,
				...(renderActions ?
					[
						{
							field: 'actions',
							type: 'actions',
							renderCell: (params: GridRenderCellParams) =>
								renderActions(params.row),
						},
					]
				:	[]),
			] as GridColDef<PatientShort>[],
		[renderActions]
	);
	const handleCloseModal = useCallback(() => {
		setCreateModalOpen(false);
	}, []);
	const handleOpenModal = useCallback(() => {
		setCreateModalOpen(true);
	}, []);

	const handleSuccess = useCallback(
		(newPatient: PatientDetail) => {
			onPatientCreated?.(newPatient);
			setCreateModalOpen(false);
		},
		[onPatientCreated]
	);

	if (error) return error.message;

	return (
		<Box sx={{ width: '100%', ...containerSx }}>
			<Stack
				direction={{ xs: 'column-reverse', sm: 'row' }}
				justifyContent="space-between"
				alignItems={{ xs: 'stretch', sm: 'center' }}
				spacing={1.5}
				mb={2}
			>
				<PatientsFilters filterForm={filterForm} />
				<Button
					sx={{ alignSelf: 'flex-end', flexShrink: 0 }}
					variant="contained"
					color="secondary"
					onClick={handleOpenModal}
				>
					Додати пацієнта
				</Button>
			</Stack>

			<ServerDataGrid
				rows={data?.items ?? []}
				rowCount={data?.rowCount ?? 0}
				columns={columns}
				loading={isLoading || isFetching}
				{...dataGridProps}
			/>

			<PatientCreateModal
				open={isCreateModalOpen}
				onClose={handleCloseModal}
				onSuccess={handleSuccess}
			/>
		</Box>
	);
};
