import { queryOptions, useQuery } from '@tanstack/react-query';
import { drugAPI, drugCategoryAPI } from './drug.api';

export const drugKeys = {
	all: () => ['drugs'] as const,
	options: () => [...drugKeys.all(), 'options'] as const,
};

export const drugQueries = {
	options: () =>
		queryOptions({
			queryKey: drugKeys.options(),
			queryFn: () => drugAPI.getDrugs(),
			staleTime: 5 * 60 * 1000,
		}),
};

export const useDrugOptionsList = () => {
	return useQuery(drugQueries.options());
};

export const drugCategoryKeys = {
	all: () => ['drugCategories'] as const,
	options: () => [...drugCategoryKeys.all(), 'options'] as const,
	tree: () => [...drugCategoryKeys.all(), 'tree'] as const,
};

export const drugCategoryQueries = {
	options: () =>
		queryOptions({
			queryKey: drugCategoryKeys.options(),
			queryFn: () => drugCategoryAPI.getDrugCategories(),
			staleTime: 5 * 60 * 1000,
		}),
	tree: () =>
		queryOptions({
			queryKey: drugCategoryKeys.tree(),
			queryFn: () => drugCategoryAPI.getDrugCategoriesTree(),
			staleTime: 5 * 60 * 1000,
		}),
};

export const useDrugCategoryTreeList = () => {
	return useQuery(drugCategoryQueries.tree());
};
