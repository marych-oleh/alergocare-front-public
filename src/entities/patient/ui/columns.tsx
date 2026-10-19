import { GridColDef } from '@mui/x-data-grid';
import { Gender, PatientShort } from '~/shared/api/endpoints/patient';
import { dateFormatters } from '~/shared/lib/date';
import { GENDER_LABEL } from '../model/dictionaries';

export const patientColumns: GridColDef<PatientShort>[] = [
	{
		field: 'surname',
		headerName: 'Прізвище',
		minWidth: 130,
		flex: 1,
	},
	{
		field: 'birthday',
		headerName: 'Дата народження',
		minWidth: 150,
		flex: 1,
		valueFormatter: (value) => {
			return value ? dateFormatters.toUiDate(value) : '';
		},
	},
	{
		field: 'gender',
		headerName: 'Стать',
		minWidth: 80,
		flex: 1,
		valueFormatter: (value) => GENDER_LABEL[value as Gender],
	},
];
