import { UseFormReturn } from 'react-hook-form';
import { CaseFilterForm, CaseFilterPayload } from '~/shared/api/endpoints/case';
import { TableFiltersBar } from '~/shared/ui/data-grid/TableFiltersBar';
import { CalendarDatePicker } from '~/shared/ui/DatePicker/CalendarDatePicker';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import { RHFTextField } from '~/shared/ui/rhf/RHFTextField';

interface Props {
	filterForm: UseFormReturn<CaseFilterForm, any, CaseFilterPayload>;
	hidePatientFields?: boolean;
}

export const CasesFilters = ({ filterForm, hidePatientFields }: Props) => {
	const { control } = filterForm;

	return (
		<TableFiltersBar
			sx={{ flexShrink: 1, flexWrap: 'wrap' }}
			component="form"
		>
			{!hidePatientFields && (
				<>
					<EditableField
						name="patientSurname"
						control={control}
						label="Прізвище"
						disableBackground
						renderEditMode={(props) => (
							<RHFTextField {...props} size="small" />
						)}
					/>
					<EditableField
						name="patientBirthday"
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
