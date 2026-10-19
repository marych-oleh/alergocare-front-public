import { describe, it, expect } from 'vitest';
import { PatientDetailSchema, PatientWriteSchema, genderEnum, discoveryMethodEnum } from './patients.schema';
import { dayjs } from '~/shared/lib/date';

describe('genderEnum', () => {
	it('accepts male', () => {
		expect(genderEnum.safeParse('male').success).toBe(true);
	});

	it('accepts female', () => {
		expect(genderEnum.safeParse('female').success).toBe(true);
	});

	it('rejects other', () => {
		expect(genderEnum.safeParse('other').success).toBe(false);
	});
});

describe('discoveryMethodEnum', () => {
	it('accepts self_discovered', () => {
		expect(discoveryMethodEnum.safeParse('self_discovered').success).toBe(true);
	});

	it('accepts all 6 methods', () => {
		const methods = ['self_discovered', 'social_media', 'internet', 'friends_recommendation', 'dentist_referral', 'doctor_referral'];
		methods.forEach(m => {
			expect(discoveryMethodEnum.safeParse(m).success).toBe(true);
		});
	});

	it('rejects unknown method', () => {
		expect(discoveryMethodEnum.safeParse('unknown').success).toBe(false);
	});
});

describe('PatientWriteSchema', () => {
	it('validates valid patient write data', () => {
		const result = PatientWriteSchema.safeParse({
			surname: 'Коваленко',
			gender: 'male',
			countryCode: 'UA',
			districtCode: null,
			birthday: dayjs('1990-01-01'),
			discoveryMethod: 'self_discovered',
		});
		expect(result.success).toBe(true);
	});

	it('rejects too short surname', () => {
		const result = PatientWriteSchema.safeParse({
			surname: 'K',
			gender: 'male',
			countryCode: 'UA',
			birthday: dayjs('1990-01-01'),
			discoveryMethod: 'self_discovered',
		});
		expect(result.success).toBe(false);
	});
});

describe('PatientDetailSchema', () => {
	it('validates a full patient detail', () => {
		const result = PatientDetailSchema.safeParse({
			id: '123e4567-e89b-42d3-a456-426614174001',
			surname: 'Тестовий',
			gender: 'male',
			countryCode: 'UA',
			districtCode: null,
			birthday: '1990-05-15',
			createdAt: '2024-01-01T00:00:00.000Z',
			updatedAt: '2024-01-01T00:00:00.000Z',
			discoveryMethod: 'self_discovered',
		});
		expect(result.success).toBe(true);
	});
});
