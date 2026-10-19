import { queryOptions, useQuery } from '@tanstack/react-query';
import { statisticsAPI } from './statistics.api';
import {
	defaultStatisticsFilters,
	StatisticsFiltersAPI,
} from './statistics.schema';

export const statisticsKeys = {
	all: () => ['statistics'] as const,
	overview: (f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'overview', f] as const,
	casesByPeriod: (months: number, f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'cases-by-period', months, f] as const,
	topDrugs: (limit: number, f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'top-drugs', limit, f] as const,
	drugCategories: (f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'drug-categories', f] as const,
	testingResults: (f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'testing-results', f] as const,
	symptomCategories: (f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'symptom-categories', f] as const,
	topSymptoms: (limit: number, f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'top-symptoms', limit, f] as const,
	topAllergens: (limit: number, f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'top-allergens', limit, f] as const,
	topComorbidities: (limit: number, f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'top-comorbidities', limit, f] as const,
	patientDemographics: (f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'patient-demographics', f] as const,
	topComplications: (limit: number, f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'top-complications', limit, f] as const,
	symptomReactionType: (f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'symptom-reaction-type', f] as const,
	complicationPresence: (f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'complication-presence', f] as const,
	comorbidityPresence: (f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'comorbidity-presence', f] as const,
	positiveByStageAndMethod: (f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'positive-by-stage-and-method', f] as const,
	testingByType: (f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'testing-by-type', f] as const,
	testingByMethod: (f: StatisticsFiltersAPI) =>
		[...statisticsKeys.all(), 'testing-by-method', f] as const,
};

export const statisticsQueries = {
	overview: (f: StatisticsFiltersAPI = defaultStatisticsFilters) =>
		queryOptions({
			queryKey: statisticsKeys.overview(f),
			queryFn: () => statisticsAPI.getOverview(f),
			staleTime: 2 * 60 * 1000,
		}),

	casesByPeriod: (
		months = 12,
		f: StatisticsFiltersAPI = defaultStatisticsFilters
	) =>
		queryOptions({
			queryKey: statisticsKeys.casesByPeriod(months, f),
			queryFn: () => statisticsAPI.getCasesByPeriod(months, f),
			staleTime: 2 * 60 * 1000,
		}),

	topDrugs: (limit = 10, f: StatisticsFiltersAPI = defaultStatisticsFilters) =>
		queryOptions({
			queryKey: statisticsKeys.topDrugs(limit, f),
			queryFn: () => statisticsAPI.getTopDrugs(limit, f),
			staleTime: 2 * 60 * 1000,
		}),

	drugCategories: (f: StatisticsFiltersAPI = defaultStatisticsFilters) =>
		queryOptions({
			queryKey: statisticsKeys.drugCategories(f),
			queryFn: () => statisticsAPI.getDrugCategoryDistribution(f),
			staleTime: 2 * 60 * 1000,
		}),

	testingResults: (f: StatisticsFiltersAPI = defaultStatisticsFilters) =>
		queryOptions({
			queryKey: statisticsKeys.testingResults(f),
			queryFn: () => statisticsAPI.getTestingResults(f),
			staleTime: 2 * 60 * 1000,
		}),

	symptomCategories: (f: StatisticsFiltersAPI = defaultStatisticsFilters) =>
		queryOptions({
			queryKey: statisticsKeys.symptomCategories(f),
			queryFn: () => statisticsAPI.getSymptomCategoryDistribution(f),
			staleTime: 2 * 60 * 1000,
		}),

	topSymptoms: (
		limit = 10,
		f: StatisticsFiltersAPI = defaultStatisticsFilters
	) =>
		queryOptions({
			queryKey: statisticsKeys.topSymptoms(limit, f),
			queryFn: () => statisticsAPI.getTopSymptoms(limit, f),
			staleTime: 2 * 60 * 1000,
		}),

	topAllergens: (
		limit = 10,
		f: StatisticsFiltersAPI = defaultStatisticsFilters
	) =>
		queryOptions({
			queryKey: statisticsKeys.topAllergens(limit, f),
			queryFn: () => statisticsAPI.getTopAllergens(limit, f),
			staleTime: 2 * 60 * 1000,
		}),

	topComorbidities: (
		limit = 10,
		f: StatisticsFiltersAPI = defaultStatisticsFilters
	) =>
		queryOptions({
			queryKey: statisticsKeys.topComorbidities(limit, f),
			queryFn: () => statisticsAPI.getTopComorbidities(limit, f),
			staleTime: 2 * 60 * 1000,
		}),

	patientDemographics: (f: StatisticsFiltersAPI = defaultStatisticsFilters) =>
		queryOptions({
			queryKey: statisticsKeys.patientDemographics(f),
			queryFn: () => statisticsAPI.getPatientDemographics(f),
			staleTime: 2 * 60 * 1000,
		}),

	topComplications: (
		limit = 10,
		f: StatisticsFiltersAPI = defaultStatisticsFilters
	) =>
		queryOptions({
			queryKey: statisticsKeys.topComplications(limit, f),
			queryFn: () => statisticsAPI.getTopComplications(limit, f),
			staleTime: 2 * 60 * 1000,
		}),

	symptomReactionType: (f: StatisticsFiltersAPI = defaultStatisticsFilters) =>
		queryOptions({
			queryKey: statisticsKeys.symptomReactionType(f),
			queryFn: () => statisticsAPI.getSymptomReactionType(f),
			staleTime: 2 * 60 * 1000,
		}),

	complicationPresence: (f: StatisticsFiltersAPI = defaultStatisticsFilters) =>
		queryOptions({
			queryKey: statisticsKeys.complicationPresence(f),
			queryFn: () => statisticsAPI.getComplicationPresence(f),
			staleTime: 2 * 60 * 1000,
		}),

	comorbidityPresence: (f: StatisticsFiltersAPI = defaultStatisticsFilters) =>
		queryOptions({
			queryKey: statisticsKeys.comorbidityPresence(f),
			queryFn: () => statisticsAPI.getComorbidityPresence(f),
			staleTime: 2 * 60 * 1000,
		}),

	positiveByStageAndMethod: (
		f: StatisticsFiltersAPI = defaultStatisticsFilters
	) =>
		queryOptions({
			queryKey: statisticsKeys.positiveByStageAndMethod(f),
			queryFn: () => statisticsAPI.getPositiveTestingByStageAndMethod(f),
			staleTime: 2 * 60 * 1000,
		}),

	testingByType: (f: StatisticsFiltersAPI = defaultStatisticsFilters) =>
		queryOptions({
			queryKey: statisticsKeys.testingByType(f),
			queryFn: () => statisticsAPI.getTestingByType(f),
			staleTime: 2 * 60 * 1000,
		}),

	testingByMethod: (f: StatisticsFiltersAPI = defaultStatisticsFilters) =>
		queryOptions({
			queryKey: statisticsKeys.testingByMethod(f),
			queryFn: () => statisticsAPI.getTestingByMethod(f),
			staleTime: 2 * 60 * 1000,
		}),
};

// ─── Хуки для компонентів ─────────────────────────────────────────────────
export const useOverviewStatistics = (
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.overview(f));

export const useCasesByPeriod = (
	months = 12,
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.casesByPeriod(months, f));

export const useTopDrugs = (
	limit = 10,
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.topDrugs(limit, f));

export const useDrugCategoryDistribution = (
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.drugCategories(f));

export const useTestingResults = (
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.testingResults(f));

export const useSymptomCategoryDistribution = (
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.symptomCategories(f));

export const useTopSymptoms = (
	limit = 10,
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.topSymptoms(limit, f));

export const useTopAllergens = (
	limit = 10,
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.topAllergens(limit, f));

export const useTopComorbidities = (
	limit = 10,
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.topComorbidities(limit, f));

export const usePatientDemographics = (
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.patientDemographics(f));

export const useTopComplications = (
	limit = 10,
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.topComplications(limit, f));

export const useSymptomReactionType = (
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.symptomReactionType(f));

export const useComplicationPresence = (
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.complicationPresence(f));

export const useComorbidityPresence = (
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.comorbidityPresence(f));

export const usePositiveTestingByStageAndMethod = (
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.positiveByStageAndMethod(f));

export const useTestingByType = (
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.testingByType(f));

export const useTestingByMethod = (
	f: StatisticsFiltersAPI = defaultStatisticsFilters
) => useQuery(statisticsQueries.testingByMethod(f));
