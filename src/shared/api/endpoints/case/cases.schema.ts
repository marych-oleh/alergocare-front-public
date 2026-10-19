import { z } from 'zod';
import { MedicalDocumentEnum } from '~/shared/lib/medical-document';
import { DateSchemas } from '../../common/date.schema';
import {
	createPaginatedRequestSchema,
	createPaginatedResponseSchema,
} from '../../common/pagination.schema';
import { AllergyOptionSchema } from '../allergy/allergy.schema';
import { ComorbidityOptionSchema } from '../comorbidity/comorbidity.schema';
import { DrugOptionSchema } from '../drug';
import { ExaminationOptionSchema } from '../examination/examination.schema';
import { PatientDetailSchema } from '../patient/patients.schema';
import { PreliminaryDiagnoseOptionSchema } from '../preliminary-diagnose/preliminary-diagnose.schema';
import { SymptomOptionSchema } from '../symptom/symptom.schema';
import { TestingRowSchema } from '../testing';

export const MedicalDocumentSchema = z.enum(MedicalDocumentEnum);

export const ExaminationRecordsSchema = z.array(
	z.object({
		examination: ExaminationOptionSchema.nullable().refine(
			(val) => val !== null,
			{
				error: 'Будь ласка, виберіть обстеження',
			}
		),
		result: z.string().min(1, 'Результат не може бути порожнім'),
	})
);

// Complex Schemas ------------------
export const BaseCaseFields = z.object({
	patientId: z.uuid('Будь ласка, оберіть пацієнта з бази'),
	symptomsTime: z.number().min(0).nullable().default(0),
	drugTestBefore: z.boolean(),
	needAllergyTesting: z.boolean(),
});

// Table view case
export const CaseTableSchema = z.object({
	id: z.uuid(),
	...BaseCaseFields.shape,
	createdAt: DateSchemas.timestamp.read,
	updatedAt: DateSchemas.timestamp.read,
	patient: PatientDetailSchema,

	documents: z
		.array(z.object({ document: MedicalDocumentSchema }))
		.optional()
		.transform((docs) => docs?.map((doc) => doc.document)),
	allergies: z.array(AllergyOptionSchema).optional(),
	preliminaryDiagnoses: z.array(PreliminaryDiagnoseOptionSchema).optional(),
	comorbidities: z.array(ComorbidityOptionSchema).optional(),
	symptoms: z.array(SymptomOptionSchema).optional(),
	drugAllergies: z.array(DrugOptionSchema).optional(),
	examinationRecords: ExaminationRecordsSchema.optional(),

	testings: z.array(
		TestingRowSchema.pick({
			id: true,
			isPositive: true,
			drug: true,
			type: true,
		})
	),
});

// TABLE SCHEMAS
// server response
export const PaginatedCasesSchema =
	createPaginatedResponseSchema(CaseTableSchema);
// server request
export const CasesFilterSchema = z.object({
	patientSurname: z.string().optional(),
	patientBirthday: DateSchemas.calendar.write.optional(),
});
export const PaginatedCasesRequestSchema = createPaginatedRequestSchema(
	CasesFilterSchema.keyof()
);

// Full Case info
export const CaseDetailSchema = z.object({
	id: z.uuid(),
	...BaseCaseFields.shape,
	createdAt: DateSchemas.timestamp.read,
	updatedAt: DateSchemas.timestamp.read,
	patient: PatientDetailSchema,

	documents: z
		.array(z.object({ document: MedicalDocumentSchema }))
		.optional()
		.transform((docs) => docs?.map((doc) => doc.document)),
	allergies: z.array(AllergyOptionSchema).optional(),
	preliminaryDiagnoses: z.array(PreliminaryDiagnoseOptionSchema).optional(),
	comorbidities: z.array(ComorbidityOptionSchema).optional(),
	symptoms: z.array(SymptomOptionSchema).optional(),
	drugAllergies: z.array(DrugOptionSchema).optional(),

	examinationRecords: ExaminationRecordsSchema.optional(),
});

// FOR WRITE OPERATIONS (CREATE/EDIT)
export const CaseWriteSchema = z
	.object({
		...BaseCaseFields.shape,
		documents: z.array(MedicalDocumentSchema).optional(),
		allergies: z.array(AllergyOptionSchema).optional(),
		preliminaryDiagnoses: z.array(PreliminaryDiagnoseOptionSchema).optional(),
		comorbidities: z.array(ComorbidityOptionSchema).optional(),
		symptoms: z.array(ComorbidityOptionSchema).optional(),
		drugAllergies: z.array(DrugOptionSchema).optional(),

		examinationRecords: ExaminationRecordsSchema.optional(),
	})
	.transform((data) => ({
		// Direct fields
		patientId: data.patientId,
		symptomsTime: data.symptomsTime,
		drugTestBefore: data.drugTestBefore,
		needAllergyTesting: data.needAllergyTesting,
		documents: data.documents,

		allergyIds: data.allergies?.map((a) => a.id),
		preliminaryDiagnosisIds: data.preliminaryDiagnoses?.map((d) => d.id),
		comorbidityIds: data.comorbidities?.map((c) => c.id),
		symptomIds: data.symptoms?.map((s) => s.id),
		drugAllergyIds: data.drugAllergies?.map((s) => s.id),

		// Mapping examination records
		examinationRecords: data.examinationRecords?.map((item) => ({
			examinationId: item.examination.id,
			result: item.result,
		})),
	}));
