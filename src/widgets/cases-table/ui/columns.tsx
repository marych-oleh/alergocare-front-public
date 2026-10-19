import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { GridColDef } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { TestingDrugChip } from '~/entities/testing';
import { CaseTable } from '~/shared/api/endpoints/case';
import { dateFormatters } from '~/shared/lib/date';
import { PATHS } from '~/shared/routes';

export const casesColumns: GridColDef<CaseTable>[] = [
	{
		field: 'patientSurname',
		headerName: 'Прізвище',
		minWidth: 120,
		flex: 1,
		valueGetter: (v, row: CaseTable) => {
			return row.patient.surname;
		},
	},
	{
		field: 'patientBirthday',
		headerName: 'Дата народження',
		minWidth: 130,
		flex: 1,
		valueGetter: (v, row: CaseTable) => {
			return dateFormatters.toUiDate(row.patient.birthday);
		},
	},
	{
		field: 'createdAt',
		headerName: 'Створено',
		minWidth: 120,
		flex: 1,
		valueGetter: (v, row: CaseTable) => {
			return dateFormatters.toUiDateTime(row.createdAt);
		},
	},
	{
		field: 'testings',
		headerName: 'Тестування',
		minWidth: 320,
		flex: 1.5,
		sortable: false,
		filterable: false,
		renderCell: (params) => <CaseTestingsColumn caseRow={params.row} />,
	},
];

function CaseTestingsColumn({ caseRow }: { caseRow: CaseTable }) {
	const navigate = useNavigate();

	const navigateToTesting = useCallback(
		(testingId: string) => {
			navigate(PATHS.cases.testing.byId.get(caseRow.id, testingId));
		},
		[navigate]
	);

	if (caseRow.testings.length === 0) {
		return (
			<Box sx={{ color: 'text.disabled', pl: 1 }}>
				<Button
					size="small"
					color="primary"
					variant="outlined"
					component={Link}
					to={PATHS.cases.testing.get(caseRow.id) + '?create=true'}
					sx={{ py: 0, px: 1 }}
				>
					Додати тестування
				</Button>
			</Box>
		);
	}

	return (
		<Stack
			direction="row"
			gap={0.75}
			sx={{
				flexWrap: 'wrap',
				alignItems: 'center',
				py: 1,
				width: '100%',
			}}
		>
			{caseRow.testings.map((test) => (
				<TestingDrugChip
					key={test.id}
					testing={test}
					size="small"
					onClick={() => navigateToTesting(test.id)}
				/>
			))}
		</Stack>
	);
}
