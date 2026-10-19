import { describe, it, expect } from 'vitest';
import { MEDICAL_DOCUMENTS_LABELS } from './dictionary';
import { MedicalDocumentEnum } from './MedicalDocumentEnum';

describe('MEDICAL_DOCUMENTS_LABELS', () => {
	it('has a label for every MedicalDocumentEnum value', () => {
		Object.values(MedicalDocumentEnum).forEach((doc) => {
			expect(MEDICAL_DOCUMENTS_LABELS[doc]).toBeDefined();
			expect(MEDICAL_DOCUMENTS_LABELS[doc].length).toBeGreaterThan(0);
		});
	});

	it('label for DISCHARGE_SUMMARY is a non-empty string', () => {
		expect(
			typeof MEDICAL_DOCUMENTS_LABELS[MedicalDocumentEnum.DISCHARGE_SUMMARY]
		).toBe('string');
	});

	it('label for EMERGENCY_REPORT is a non-empty string', () => {
		expect(
			typeof MEDICAL_DOCUMENTS_LABELS[MedicalDocumentEnum.EMERGENCY_REPORT]
		).toBe('string');
	});

	it('label for MEDICATION_HISTORY is a non-empty string', () => {
		expect(
			typeof MEDICAL_DOCUMENTS_LABELS[MedicalDocumentEnum.MEDICATION_HISTORY]
		).toBe('string');
	});
});
