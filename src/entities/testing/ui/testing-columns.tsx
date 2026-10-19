import { Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { TestingRow } from '~/shared/api/endpoints/testing';
import { dateFormatters } from '~/shared/lib/date';
import {
	TestingMethodDict,
	TestingTypeDict,
	TestingTypeEnum,
} from '../model/testing-dictionaries';
import { TestingDetailCell } from './TestingDetailCell';
import { TestingDrugChip } from './TestingDrugChip';

export const testingColumns: GridColDef<TestingRow>[] = [
	{
		field: 'testingDate',
		headerName: 'Дата',
		width: 100,
		valueGetter: (testingDate) => dateFormatters.toUiDate(testingDate),
	},
	{
		field: 'drug',
		headerName: 'Препарат',
		minWidth: 160,
		flex: 1,
		sortable: false,
		filterable: false,
		renderCell: (params) => <TestingDrugChip testing={params.row} />,
	},
	{
		field: 'type',
		headerName: 'Тип',
		width: 155,
		renderCell: (params) => (
			<Chip
				label={TestingTypeDict[params.row.type]}
				variant={
					params.row.type === TestingTypeEnum.alternative ?
						'outlined'
					:	'filled'
				}
				size="small"
			/>
		),
	},
	{
		field: 'method',
		headerName: 'Метод',
		width: 130,
		valueGetter: (method) => TestingMethodDict[method],
	},
	{
		field: 'details',
		headerName: '',
		width: 60,
		sortable: false,
		filterable: false,
		disableColumnMenu: true,
		align: 'center',
		renderCell: (params) => <TestingDetailCell row={params.row} />,
	},
];
