import { http, HttpResponse } from 'msw';

const BASE = 'http://localhost:8080';

// Valid RFC 4122 UUID v4 (3rd group [1-8]xxx, 4th group [89ab]xxx)
const IDS = {
	patient: '123e4567-e89b-42d3-a456-426614174001',
	case: '123e4567-e89b-42d3-a456-426614174002',
	option: '123e4567-e89b-42d3-a456-426614174010',
	drug: '123e4567-e89b-42d3-a456-426614174011',
	drugCategory: '123e4567-e89b-42d3-a456-426614174012',
	testing: '123e4567-e89b-42d3-a456-426614174020',
	user: '123e4567-e89b-42d3-a456-426614174099',
};

export const mockPatient = {
	id: IDS.patient,
	surname: 'Тестовий',
	gender: 'male' as const,
	countryCode: 'UA',
	districtCode: 'UA-46',
	birthday: '1990-05-15',
	discoveryMethod: 'self_discovered' as const,
	createdAt: '2024-01-01T00:00:00.000Z',
	updatedAt: '2024-01-01T00:00:00.000Z',
};

export const mockCase = {
	id: IDS.case,
	patientId: IDS.patient,
	symptomsTime: 0,
	drugTestBefore: false,
	needAllergyTesting: false,
	createdAt: '2024-01-01T00:00:00.000Z',
	updatedAt: '2024-01-01T00:00:00.000Z',
	patient: {
		id: IDS.patient,
		surname: 'Тестовий',
		gender: 'male' as const,
		countryCode: 'UA',
		districtCode: 'UA-46',
		birthday: '1990-05-15',
		createdAt: '2024-01-01T00:00:00.000Z',
		updatedAt: '2024-01-01T00:00:00.000Z',
		discoveryMethod: 'self_discovered' as const,
	},
	testings: [],
	allergies: [],
	comorbidities: [],
	symptoms: [],
	drugAllergies: [],
	preliminaryDiagnoses: [],
};

export const mockOption = {
	id: IDS.option,
	name: 'Тест опція',
};

export const mockSymptomOption = {
	id: IDS.option,
	name: 'Тест симптом',
	category: 'respiratory' as const,
};

export const mockExaminationOption = {
	id: IDS.option,
	name: 'Тест обстеження',
	type: 'text',
};

export const mockDrug = {
	id: IDS.drug,
	name: 'Амоксицилін',
	categoryId: IDS.drugCategory,
};

export const mockDrugCategory = {
	id: IDS.drugCategory,
	name: 'Антибіотики',
	parentId: null as null,
};

export const mockTesting = {
	id: IDS.testing,
	caseId: IDS.case,
	type: 'suspected',
	method: 'skin',
	isPositive: false,
	finalStage: null as null,
	drug: mockDrug,
	testingDate: '2024-03-15T10:00:00.000Z',
	complications: [] as typeof mockOption[],
	createdAt: '2024-03-15T10:00:00.000Z',
	updatedAt: '2024-03-15T10:00:00.000Z',
};

const paginatedList = (items: unknown[]) => ({
	ok: true,
	result: { items, rowCount: items.length },
});

export const handlers = [
	// ─── Patients ─────────────────────────────────────────────────
	http.post(`${BASE}/patients`, () =>
		HttpResponse.json({ ok: true, result: mockPatient })
	),
	http.get(`${BASE}/patients/:id`, ({ params }) =>
		HttpResponse.json({ ok: true, result: { ...mockPatient, id: params.id } })
	),
	http.delete(`${BASE}/patients/:id`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.put(`${BASE}/patients/:id`, ({ params }) =>
		HttpResponse.json({ ok: true, result: { ...mockPatient, id: params.id } })
	),
	http.patch(`${BASE}/patients/:id`, ({ params }) =>
		HttpResponse.json({ ok: true, result: { ...mockPatient, id: params.id } })
	),
	http.post(`${BASE}/patients/search`, () =>
		HttpResponse.json(paginatedList([mockPatient]))
	),

	// ─── Cases ────────────────────────────────────────────────────
	http.post(`${BASE}/cases`, () =>
		HttpResponse.json({ ok: true, result: mockCase })
	),
	http.get(`${BASE}/cases/:id`, ({ params }) =>
		HttpResponse.json({ ok: true, result: { ...mockCase, id: params.id } })
	),
	http.delete(`${BASE}/cases/:id`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.patch(`${BASE}/cases/:id`, ({ params }) =>
		HttpResponse.json({ ok: true, result: { ...mockCase, id: params.id } })
	),
	http.post(`${BASE}/cases/search`, () =>
		HttpResponse.json(paginatedList([mockCase]))
	),
	http.post(`${BASE}/cases/patients/:patientId/search`, () =>
		HttpResponse.json(paginatedList([mockCase]))
	),

	// ─── Testings ─────────────────────────────────────────────────
	http.post(`${BASE}/testings`, () =>
		HttpResponse.json({ ok: true, result: mockTesting })
	),
	http.get(`${BASE}/testings/:id`, ({ params }) =>
		HttpResponse.json({ ok: true, result: { ...mockTesting, id: params.id } })
	),
	http.delete(`${BASE}/testings/:id`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.patch(`${BASE}/testings/:id`, ({ params }) =>
		HttpResponse.json({ ok: true, result: { ...mockTesting, id: params.id } })
	),
	http.post(`${BASE}/testings/cases/:caseId/search`, () =>
		HttpResponse.json(paginatedList([mockTesting]))
	),

	// ─── Allergies ────────────────────────────────────────────────
	http.get(`${BASE}/allergies`, () =>
		HttpResponse.json({ ok: true, result: [mockOption] })
	),
	http.get(`${BASE}/allergies/:id`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),
	http.delete(`${BASE}/allergies/:id`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.patch(`${BASE}/allergies/:id`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),
	http.post(`${BASE}/allergies`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),

	// ─── Complications ────────────────────────────────────────────
	http.get(`${BASE}/complications`, () =>
		HttpResponse.json({ ok: true, result: [mockOption] })
	),
	http.get(`${BASE}/complications/:id`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),
	http.delete(`${BASE}/complications/:id`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.patch(`${BASE}/complications/:id`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),
	http.post(`${BASE}/complications`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),

	// ─── Comorbidities ────────────────────────────────────────────
	http.get(`${BASE}/comorbidities`, () =>
		HttpResponse.json({ ok: true, result: [mockOption] })
	),
	http.get(`${BASE}/comorbidities/:id`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),
	http.delete(`${BASE}/comorbidities/:id`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.patch(`${BASE}/comorbidities/:id`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),
	http.post(`${BASE}/comorbidities`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),

	// ─── Drugs ────────────────────────────────────────────────────
	http.get(`${BASE}/drugs`, () =>
		HttpResponse.json({ ok: true, result: [mockDrug] })
	),
	http.get(`${BASE}/drugs/:id`, () =>
		HttpResponse.json({ ok: true, result: mockDrug })
	),
	http.delete(`${BASE}/drugs/:id`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.patch(`${BASE}/drugs/:id`, () =>
		HttpResponse.json({ ok: true, result: mockDrug })
	),
	http.post(`${BASE}/drugs`, () =>
		HttpResponse.json({ ok: true, result: mockDrug })
	),

	// ─── Drug Categories ──────────────────────────────────────────
	http.get(`${BASE}/drug-categories`, () =>
		HttpResponse.json({ ok: true, result: [mockDrugCategory] })
	),
	http.get(`${BASE}/drug-categories/tree`, () =>
		HttpResponse.json({
			ok: true,
			result: [{ ...mockDrugCategory, children: [] }],
		})
	),
	http.get(`${BASE}/drug-categories/:id`, () =>
		HttpResponse.json({ ok: true, result: mockDrugCategory })
	),
	http.delete(`${BASE}/drug-categories/:id`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.patch(`${BASE}/drug-categories/:id`, () =>
		HttpResponse.json({ ok: true, result: mockDrugCategory })
	),
	http.post(`${BASE}/drug-categories`, () =>
		HttpResponse.json({ ok: true, result: mockDrugCategory })
	),

	// ─── Symptoms ─────────────────────────────────────────────────
	http.get(`${BASE}/symptoms`, () =>
		HttpResponse.json({ ok: true, result: [mockSymptomOption] })
	),
	http.get(`${BASE}/symptoms/:id`, () =>
		HttpResponse.json({ ok: true, result: mockSymptomOption })
	),
	http.delete(`${BASE}/symptoms/:id`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.patch(`${BASE}/symptoms/:id`, () =>
		HttpResponse.json({ ok: true, result: mockSymptomOption })
	),
	http.post(`${BASE}/symptoms`, () =>
		HttpResponse.json({ ok: true, result: mockSymptomOption })
	),

	// ─── Examinations ─────────────────────────────────────────────
	http.get(`${BASE}/examinations`, () =>
		HttpResponse.json({ ok: true, result: [mockExaminationOption] })
	),
	http.get(`${BASE}/examinations/:id`, () =>
		HttpResponse.json({ ok: true, result: mockExaminationOption })
	),
	http.delete(`${BASE}/examinations/:id`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.patch(`${BASE}/examinations/:id`, () =>
		HttpResponse.json({ ok: true, result: mockExaminationOption })
	),
	http.post(`${BASE}/examinations`, () =>
		HttpResponse.json({ ok: true, result: mockExaminationOption })
	),

	// ─── Preliminary Diagnoses ────────────────────────────────────
	http.get(`${BASE}/preliminary-diagnoses`, () =>
		HttpResponse.json({ ok: true, result: [mockOption] })
	),
	http.get(`${BASE}/preliminary-diagnoses/:id`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),
	http.delete(`${BASE}/preliminary-diagnoses/:id`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.patch(`${BASE}/preliminary-diagnoses/:id`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),
	http.post(`${BASE}/preliminary-diagnoses`, () =>
		HttpResponse.json({ ok: true, result: mockOption })
	),

	// ─── Auth ─────────────────────────────────────────────────────
	http.post(`${BASE}/auth/sign-in`, () =>
		HttpResponse.json({
			ok: true,
			result: {
				id: IDS.user,
				firstName: 'Іван',
				lastName: 'Лікар',
				username: 'doctor',
				createdAt: '2024-01-01T00:00:00.000Z',
				updatedAt: '2024-01-01T00:00:00.000Z',
			},
		})
	),
	http.post(`${BASE}/auth/sign-out`, () =>
		HttpResponse.json({ ok: true, result: null })
	),
	http.get(`${BASE}/auth/me`, () =>
		HttpResponse.json({
			ok: true,
			result: {
				id: IDS.user,
				firstName: 'Іван',
				lastName: 'Лікар',
				username: 'doctor',
				createdAt: '2024-01-01T00:00:00.000Z',
				updatedAt: '2024-01-01T00:00:00.000Z',
			},
		})
	),
];
