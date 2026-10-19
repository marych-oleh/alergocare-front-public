import { z } from 'zod';
import { AllNull } from '~/shared/lib/objects';
import { DateSchemas } from '../../common';
import { DistrictCodeSchema } from '../../common/location.schema';
import { DrugOptionSchema } from '../drug';
import { genderEnum } from '../patient/patients.schema';

// ====================================
// ==========  FILTERS
// ====================================
const ageNumberSchema = z.preprocess(
	(val) =>
		val === '' || val === null || val === undefined ? null : Number(val),
	z.number().int().min(0).nullish()
);

export const StatisticsFiltersSchema = z.object({
	drugId: DrugOptionSchema.nullable().transform((drug) => drug?.id ?? null),
	districtCode: DistrictCodeSchema.nullish(),
	gender: genderEnum.nullish(),

	dateFrom: DateSchemas.calendar.write.nullish(),
	dateTo: DateSchemas.calendar.write.nullish(),

	ageFrom: ageNumberSchema,
	ageTo: ageNumberSchema,
});

export type StatisticsFilters = z.infer<typeof StatisticsFiltersSchema>;
export type StatisticsFiltersInput = z.input<typeof StatisticsFiltersSchema>;
export type StatisticsFiltersAPI = z.output<typeof StatisticsFiltersSchema>;

// Default empty state for React Hook Form reset
export const defaultStatisticsFilters: AllNull<StatisticsFilters> = {
	drugId: null,
	districtCode: null,
	gender: null,
	dateFrom: null,
	dateTo: null,
	ageFrom: null,
	ageTo: null,
};

// ====================================
// ==========  RESPONSES
// ====================================
export const NameCountSchema = z.object({
	name: z.string(),
	count: z.number(),
});
export type NameCount = z.infer<typeof NameCountSchema>;

export const OverviewStatisticsSchema = z.object({
	totalPatients: z.number(),
	totalCases: z.number(),
	totalTestings: z.number(),
	totalDrugs: z.number(),
	positiveTestingRate: z.number(),
});
export type OverviewStatistics = z.infer<typeof OverviewStatisticsSchema>;

export const CasesByPeriodSchema = z.object({
	period: z.string(),
	count: z.number(),
});
export type CasesByPeriod = z.infer<typeof CasesByPeriodSchema>;

export const TestingResultsSchema = z.object({
	positive: z.number(),
	negative: z.number(),
});
export type TestingResults = z.infer<typeof TestingResultsSchema>;

export const GenderDistributionSchema = z.object({
	male: z.number(),
	female: z.number(),
});

export const AgeGroupSchema = z.object({
	ageGroup: z.string(),
	count: z.number(),
});

export const PatientDemographicsSchema = z.object({
	gender: GenderDistributionSchema,
	ageGroups: z.array(AgeGroupSchema),
	discoveryMethods: z.array(NameCountSchema),
});
export type PatientDemographics = z.infer<typeof PatientDemographicsSchema>;

export const StageByMethodSchema = z.object({
	skin: z.array(NameCountSchema),
	challenge: z.array(NameCountSchema),
});
export type StageByMethod = z.infer<typeof StageByMethodSchema>;

export const ReactionTypeSchema = z.object({
	immediate: z.number(),
	delayed: z.number(),
	unknown: z.number(),
});
export type ReactionType = z.infer<typeof ReactionTypeSchema>;

export const PresenceSchema = z.object({
	withCount: z.number(),
	withoutCount: z.number(),
});
export type Presence = z.infer<typeof PresenceSchema>;
