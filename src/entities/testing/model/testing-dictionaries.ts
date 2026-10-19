import {
	TestingMethod,
	TestingMethodSchema,
	TestingType,
	TestingTypeSchema,
} from '~/shared/api/endpoints/testing';

export const TestingTypeEnum = TestingTypeSchema.enum;
export const TestingMethodEnum = TestingMethodSchema.enum;

export const TestingTypeDict: Record<TestingType, string> = {
	[TestingTypeEnum.suspected]: 'Підозрюваний',
	[TestingTypeEnum.alternative]: 'Альтернативний',
};

export const TestingMethodDict: Record<TestingMethod, string> = {
	[TestingMethodEnum.skin]: 'Шкірний',
	[TestingMethodEnum.challenge]: 'Провокаційний',
};

export const TestingStageDict: Record<TestingMethod, Record<number, string>> = {
	[TestingMethodEnum.skin]: {
		1: 'Prick',
		2: 'IDT1',
		3: 'IDT2',
		4: 'IDT3',
		5: 'IDT4',
		6: 'IDT5',
	},
	[TestingMethodEnum.challenge]: {
		1: 'I',
		2: 'II',
		3: 'III',
		4: 'IV',
		5: 'V',
	},
};

export const getTestingStageOptions = (method?: TestingMethod) => {
	if (!method) return [];

	const stages = TestingStageDict[method];
	return Object.entries(stages).map(([value, label]) => ({
		value: Number(value),
		label,
	}));
};
