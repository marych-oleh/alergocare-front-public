import { z } from 'zod';
import { DateSchemas } from '../../common/date.schema';
import {
	CountryCodeSchema,
	DistrictCodeSchema,
} from '../../common/location.schema';
import {
	createPaginatedRequestSchema,
	createPaginatedResponseSchema,
} from '../../common/pagination.schema';

export const genderEnum = z.enum(['male', 'female']);

export const discoveryMethodEnum = z.enum([
	'self_discovered', // Самостійно
	'social_media', // Соціальні мережі
	'internet', // Інтернет
	'friends_recommendation', // Порада знайомих
	'dentist_referral', // Скерування стоматолога
	'doctor_referral', // Скерування лікаря
]);

// Complex Schemas ------------------
export const basePatientFields = z.object({
	surname: z.string().min(2),
	gender: genderEnum,
	countryCode: CountryCodeSchema,
	districtCode: DistrictCodeSchema.nullish(),
});

// Table view patient
export const PatientTableSchema = z.object({
	id: z.uuid(),
	...basePatientFields.shape,
	birthday: DateSchemas.calendar.read,
});

// TABLE SCHEMAS
// server response
export const PaginatedPatientsSchema =
	createPaginatedResponseSchema(PatientTableSchema);
// server request
export const PatientsFilterSchema = z.object({
	surname: z.string().optional(),
	birthday: DateSchemas.calendar.write.optional(),
});
export const PaginatedPatientsRequestSchema = createPaginatedRequestSchema(
	PatientsFilterSchema.keyof()
);

// Full Patient info
export const PatientDetailSchema = z.object({
	id: z.uuid(),
	...basePatientFields.shape,
	birthday: DateSchemas.calendar.read,
	createdAt: DateSchemas.timestamp.read,
	updatedAt: DateSchemas.timestamp.read,
	discoveryMethod: discoveryMethodEnum,
});

// for write operations
export const PatientWriteSchema = z.object({
	...basePatientFields.shape,
	birthday: DateSchemas.calendar.write,
	discoveryMethod: discoveryMethodEnum,
});
