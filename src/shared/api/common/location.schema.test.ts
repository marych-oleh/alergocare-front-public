import { describe, it, expect } from 'vitest';
import { CountryCodeSchema, DistrictCodeSchema } from './location.schema';

describe('CountryCodeSchema', () => {
	it('accepts UA', () => {
		expect(CountryCodeSchema.safeParse('UA').success).toBe(true);
	});

	it('rejects invalid code', () => {
		expect(CountryCodeSchema.safeParse('INVALID').success).toBe(false);
	});
});

describe('DistrictCodeSchema', () => {
	it('accepts UA-46', () => {
		expect(DistrictCodeSchema.safeParse('UA-46').success).toBe(true);
	});

	it('rejects invalid district', () => {
		expect(DistrictCodeSchema.safeParse('INVALID').success).toBe(false);
	});
});
