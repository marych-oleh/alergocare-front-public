import { PatientFilterForm } from '~/shared/api/endpoints/patient';
import { FiltersOperatorsMapper } from '~/shared/ui/data-grid/useServerGridAndFilters';

export const patientsFilterOperators: FiltersOperatorsMapper<PatientFilterForm> =
	{
		surname: 'contains',
		birthday: 'equals',
	};

export const patientsDefaultFilters: PatientFilterForm = {
	surname: '',
};
