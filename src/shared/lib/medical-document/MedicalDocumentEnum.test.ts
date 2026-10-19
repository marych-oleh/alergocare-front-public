import { describe, it, expect } from 'vitest';
import { MedicalDocumentEnum } from './MedicalDocumentEnum';

describe('MedicalDocumentEnum', () => {
	it('has DISCHARGE_SUMMARY', () => {
		expect(MedicalDocumentEnum.DISCHARGE_SUMMARY).toBe('discharge_summary');
	});

	it('has EMERGENCY_REPORT', () => {
		expect(MedicalDocumentEnum.EMERGENCY_REPORT).toBe('emergency_report');
	});

	it('has MEDICATION_HISTORY', () => {
		expect(MedicalDocumentEnum.MEDICATION_HISTORY).toBe('medication_history');
	});

	it('has exactly 3 values', () => {
		expect(Object.keys(MedicalDocumentEnum).length).toBe(3);
	});
});
