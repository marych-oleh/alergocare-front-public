import { CaseFilterForm } from '~/shared/api/endpoints/case';
import { FiltersOperatorsMapper } from '~/shared/ui/data-grid/useServerGridAndFilters';

export const casesFilterOperators: FiltersOperatorsMapper<CaseFilterForm> = {
	patientSurname: 'contains',
	patientBirthday: 'equals',
};

export const casesDefaultFilters: CaseFilterForm = {
	patientSurname: '',
};
