import { describe, it, expect } from 'vitest';
import {
	getCountryNameInUkrainian,
	COUNTRY_OPTIONS,
	UKRAINE_DISTRICT_OPTIONS,
	UKRAINE_DISTRICT_LABELS,
} from './dictionary';
import { UkraineDistrictCodeEnum, CountryCodeEnum } from './location-codes';

describe('getCountryNameInUkrainian', () => {
	it('returns Ukrainian name for valid country code', () => {
		const name = getCountryNameInUkrainian('UA');
		expect(typeof name).toBe('string');
		expect(name.length).toBeGreaterThan(0);
	});

	it('returns Ukrainian name for another valid code', () => {
		const name = getCountryNameInUkrainian('DE');
		expect(typeof name).toBe('string');
		expect(name.length).toBeGreaterThan(0);
	});

	it('returns fallback for invalid/unknown code', () => {
		const name = getCountryNameInUkrainian('ZZZ', 'Невідомо');
		expect(name).toBe('Невідомо');
	});

	it('uses default fallback when none provided', () => {
		const name = getCountryNameInUkrainian('INVALID_CODE');
		expect(name).toBe('Невідомий код');
	});
});

describe('UKRAINE_DISTRICT_LABELS', () => {
	it('has an entry for every UkraineDistrictCodeEnum value', () => {
		const enumValues = Object.values(UkraineDistrictCodeEnum);
		enumValues.forEach((code) => {
			expect(UKRAINE_DISTRICT_LABELS[code]).toBeDefined();
			expect(UKRAINE_DISTRICT_LABELS[code].length).toBeGreaterThan(0);
		});
	});

	it('has Lviv district', () => {
		expect(UKRAINE_DISTRICT_LABELS[UkraineDistrictCodeEnum.LVIV]).toBe(
			'Львівська область'
		);
	});
});

describe('COUNTRY_OPTIONS', () => {
	it('is a non-empty sorted array', () => {
		expect(COUNTRY_OPTIONS.length).toBeGreaterThan(0);
	});

	it('contains UA entry', () => {
		const ua = COUNTRY_OPTIONS.find((o) => o.code === CountryCodeEnum.UA);
		expect(ua).toBeDefined();
	});

	it('each option has code and label', () => {
		COUNTRY_OPTIONS.slice(0, 5).forEach((opt) => {
			expect(opt.code).toBeTruthy();
			expect(opt.label).toBeTruthy();
		});
	});
});

describe('UKRAINE_DISTRICT_OPTIONS', () => {
	it('is sorted alphabetically by label', () => {
		const labels = UKRAINE_DISTRICT_OPTIONS.map((o) => o.label);
		const sorted = [...labels].sort((a, b) => a.localeCompare(b));
		expect(labels).toEqual(sorted);
	});

	it('has same count as enum values', () => {
		expect(UKRAINE_DISTRICT_OPTIONS.length).toBe(
			Object.keys(UkraineDistrictCodeEnum).length
		);
	});
});
