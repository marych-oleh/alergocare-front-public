import { z } from 'zod';
import { api } from '../../api.instance';
import {
	CasesByPeriodSchema,
	NameCountSchema,
	OverviewStatisticsSchema,
	PatientDemographicsSchema,
	PresenceSchema,
	ReactionTypeSchema,
	StageByMethodSchema,
	StatisticsFiltersAPI,
	TestingResultsSchema,
} from './statistics.schema';

function filtersToParams(
	filters: StatisticsFiltersAPI
): Record<string, string | number> {
	const params: Record<string, string | number> = {};
	if (filters.drugId) params.drugId = filters.drugId;
	if (filters.districtCode) params.districtCode = filters.districtCode;
	if (filters.gender) params.gender = filters.gender;
	if (filters.dateFrom) params.dateFrom = filters.dateFrom;
	if (filters.dateTo) params.dateTo = filters.dateTo;
	if (filters.ageFrom != undefined) params.ageFrom = filters.ageFrom;
	if (filters.ageTo != undefined) params.ageTo = filters.ageTo;
	return params;
}

export const statisticsAPI = {
	async getOverview(filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/overview',
			schema: OverviewStatisticsSchema,
			params: filtersToParams(filters),
		});
	},

	async getCasesByPeriod(months = 12, filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/cases-by-period',
			schema: z.array(CasesByPeriodSchema),
			params: { months, ...filtersToParams(filters) },
		});
	},

	async getTopDrugs(limit = 10, filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/top-drugs',
			schema: z.array(NameCountSchema),
			params: { limit, ...filtersToParams(filters) },
		});
	},

	async getDrugCategoryDistribution(filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/drug-categories',
			schema: z.array(NameCountSchema),
			params: filtersToParams(filters),
		});
	},

	async getTestingResults(filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/testing-results',
			schema: TestingResultsSchema,
			params: filtersToParams(filters),
		});
	},

	async getSymptomCategoryDistribution(filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/symptom-categories',
			schema: z.array(NameCountSchema),
			params: filtersToParams(filters),
		});
	},

	async getTopSymptoms(limit = 10, filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/top-symptoms',
			schema: z.array(NameCountSchema),
			params: { limit, ...filtersToParams(filters) },
		});
	},

	async getTopAllergens(limit = 10, filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/top-allergens',
			schema: z.array(NameCountSchema),
			params: { limit, ...filtersToParams(filters) },
		});
	},

	async getTopComorbidities(limit = 10, filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/top-comorbidities',
			schema: z.array(NameCountSchema),
			params: { limit, ...filtersToParams(filters) },
		});
	},

	async getPatientDemographics(filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/patient-demographics',
			schema: PatientDemographicsSchema,
			params: filtersToParams(filters),
		});
	},

	async getTopComplications(limit = 10, filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/top-complications',
			schema: z.array(NameCountSchema),
			params: { limit, ...filtersToParams(filters) },
		});
	},

	async getSymptomReactionType(filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/symptom-reaction-type',
			schema: ReactionTypeSchema,
			params: filtersToParams(filters),
		});
	},

	async getComplicationPresence(filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/complication-presence',
			schema: PresenceSchema,
			params: filtersToParams(filters),
		});
	},

	async getComorbidityPresence(filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/comorbidity-presence',
			schema: PresenceSchema,
			params: filtersToParams(filters),
		});
	},

	async getPositiveTestingByStageAndMethod(filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/positive-by-stage-and-method',
			schema: StageByMethodSchema,
			params: filtersToParams(filters),
		});
	},

	async getTestingByType(filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/testing-by-type',
			schema: z.array(NameCountSchema),
			params: filtersToParams(filters),
		});
	},

	async getTestingByMethod(filters: StatisticsFiltersAPI) {
		return await api.get({
			url: '/statistics/testing-by-method',
			schema: z.array(NameCountSchema),
			params: filtersToParams(filters),
		});
	},
};
