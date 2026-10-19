import { z } from 'zod';
import {
	discoveryMethodEnum,
	genderEnum,
	PaginatedPatientsRequestSchema,
	PaginatedPatientsSchema,
	PatientDetailSchema,
	PatientsFilterSchema,
	PatientTableSchema,
	PatientWriteSchema,
} from './patients.schema';

export type Gender = z.infer<typeof genderEnum>;
export type DiscoveryMethod = z.infer<typeof discoveryMethodEnum>;

// Complex Objects
export type PatientShort = z.infer<typeof PatientTableSchema>;
export type PaginatedPatients = z.infer<typeof PaginatedPatientsSchema>;
export type PatientFilterForm = z.input<typeof PatientsFilterSchema>;
export type PatientFilterPayload = z.output<typeof PatientsFilterSchema>;

export type PaginatedPatientsRequest = z.infer<
	typeof PaginatedPatientsRequestSchema
>;

export type PatientDetail = z.infer<typeof PatientDetailSchema>;

// For form resolver
export type PatientWriteFormValues = z.input<typeof PatientWriteSchema>;

// for API check
export type PatientWritePayload = z.output<typeof PatientWriteSchema>;
