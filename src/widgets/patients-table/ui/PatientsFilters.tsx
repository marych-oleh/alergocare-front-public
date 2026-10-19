import { UseFormReturn } from 'react-hook-form';
import {
	PatientFilterForm,
	PatientFilterPayload,
} from '~/shared/api/endpoints/patient';
import { TableFiltersBar } from '~/shared/ui/data-grid/TableFiltersBar';
import { CalendarDatePicker } from '~/shared/ui/DatePicker/CalendarDatePicker';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import { RHFTextField } from '~/shared/ui/rhf/RHFTextField';

interface Props {
	filterForm: UseFormReturn<PatientFilterForm, any, PatientFilterPayload>;
	hidePatientFields?: boolean;
}

export const PatientsFilters = ({ filterForm, hidePatientFields }: Props) => {
	const { control } = filterForm;

	return (
		<TableFiltersBar
			sx={{ flexShrink: 1, flexWrap: 'wrap' }}
			component="form"
		>
			{!hidePatientFields && (
				<>
					<EditableField
						name="surname"
						control={control}
						label="Прізвище"
						disableBackground
						renderEditMode={(props) => (
							<RHFTextField {...props} size="small" />
						)}
					/>
					<EditableField
						name="birthday"
						control={control}
						label="Дата народження"
						disableBackground
						renderEditMode={(props) => (
							<CalendarDatePicker {...props} disableFuture />
						)}
					/>
				</>
			)}
		</TableFiltersBar>
	);
};
