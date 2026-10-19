import { describe, it, expect } from 'vitest';
import {
	TestingTypeDict,
	TestingMethodDict,
	TestingStageDict,
	TestingTypeEnum,
	TestingMethodEnum,
	getTestingStageOptions,
} from './testing-dictionaries';

describe('TestingTypeDict', () => {
	it('has labels for all testing types', () => {
		expect(TestingTypeDict[TestingTypeEnum.suspected]).toBeTruthy();
		expect(TestingTypeDict[TestingTypeEnum.alternative]).toBeTruthy();
	});
});

describe('TestingMethodDict', () => {
	it('has labels for all testing methods', () => {
		expect(TestingMethodDict[TestingMethodEnum.skin]).toBeTruthy();
		expect(TestingMethodDict[TestingMethodEnum.challenge]).toBeTruthy();
	});
});

describe('TestingStageDict', () => {
	it('has stages for skin method', () => {
		const skinStages = TestingStageDict[TestingMethodEnum.skin];
		expect(Object.keys(skinStages).length).toBeGreaterThan(0);
	});

	it('has stages for challenge method', () => {
		const challengeStages = TestingStageDict[TestingMethodEnum.challenge];
		expect(Object.keys(challengeStages).length).toBeGreaterThan(0);
	});
});

describe('getTestingStageOptions', () => {
	it('returns empty array when no method provided', () => {
		expect(getTestingStageOptions()).toHaveLength(0);
		expect(getTestingStageOptions(undefined)).toHaveLength(0);
	});

	it('returns options for skin method', () => {
		const options = getTestingStageOptions(TestingMethodEnum.skin);
		expect(options.length).toBeGreaterThan(0);
		options.forEach((opt) => {
			expect(typeof opt.value).toBe('number');
			expect(typeof opt.label).toBe('string');
		});
	});

	it('returns options for challenge method', () => {
		const options = getTestingStageOptions(TestingMethodEnum.challenge);
		expect(options.length).toBeGreaterThan(0);
	});
});
