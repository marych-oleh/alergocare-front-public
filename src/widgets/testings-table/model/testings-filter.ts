import { TestingFilterForm } from '~/shared/api/endpoints/testing';
import { FiltersOperatorsMapper } from '~/shared/ui/data-grid/useServerGridAndFilters';

export const testingsFilterOperators: FiltersOperatorsMapper<TestingFilterForm> =
	{
		createdAt: 'contains',
	};

export const testingsDefaultFilters: Partial<TestingFilterForm> = {
	// createdAt: undefined,
};
