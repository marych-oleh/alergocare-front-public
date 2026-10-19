import {
	type RouteConfig,
	index,
	layout,
	prefix,
	route,
} from '@react-router/dev/routes';
import { ROUTES } from './shared/routes';

export default [
	route(ROUTES.LOGIN, 'pages/login/index.ts'),
	route(ROUTES.FORBIDDEN, 'pages/forbidden/index.ts'),

	// PROTECTED ROUTES
	...prefix(ROUTES.DASHBOARD_PREFIX, [
		layout('pages/dashboard-layout/index.ts', [
			index('pages/dashboard-index/index.ts', { id: 'dashboard-index' }),

			// Patients
			...prefix(ROUTES.PATIENTS_PREFIX, [
				index('pages/patients/index.ts'),
				route(
					ROUTES.PATIENT_DETAILS,
					'pages/patient-tabs-layout/index.ts',
					[
						index('pages/patient-details/index.ts'),
						route(ROUTES.PATIENT_CASES, 'pages/patient-cases/index.ts', [
							route(
								ROUTES.CASE_CREATE,
								'pages/patient-case-create/index.ts'
							),
						]),
					]
				),
			]),

			// Statistics
			route(ROUTES.STATISTICS_PREFIX, 'pages/statistics/index.ts', [
				index('pages/statistics/tabs/TabOverview.tsx'),
				route(
					ROUTES.STATISTICS_DRUG_PREFIX,
					'pages/statistics/tabs/TabDrug.tsx'
				),
				route(
					ROUTES.STATISTICS_SYMPTOM_PREFIX,
					'pages/statistics/tabs/TabSymptom.tsx'
				),
				route(
					ROUTES.STATISTICS_TESTING_PREFIX,
					'pages/statistics/tabs/TabTesting.tsx'
				),
				route(
					ROUTES.STATISTICS_DEMOGRAPHICS_PREFIX,
					'pages/statistics/tabs/TabDemographics.tsx'
				),
			]),

			// Cases
			...prefix(ROUTES.CASES_PREFIX, [
				index('pages/cases/index.ts'),
				route(ROUTES.CASE_CREATE, 'pages/case-create/index.ts'),

				route(ROUTES.CASE_DETAILS, 'pages/case-tabs-layout/index.ts', [
					index('pages/case-details/index.ts'),
					route(ROUTES.CASE_PATIENT, 'pages/case-patient/index.ts'),
					...prefix(ROUTES.CASE_TESTINGS, [
						index('pages/case-testings/index.ts'),
						route(
							ROUTES.CASE_TESTING_DETAILS,
							'pages/case-testing-details/index.ts'
						),
					]),
				]),
			]),
		]),
	]),
] satisfies RouteConfig;
