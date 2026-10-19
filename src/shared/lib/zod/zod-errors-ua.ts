import { z } from 'zod';

export const ukrainianCustomError: z.core.$ZodErrorMap<z.core.$ZodIssue> = (
	iss
) => {
	switch (iss.code) {
		case 'invalid_type':
			if (
				iss.input === undefined ||
				iss.input === null ||
				iss.input === ''
			) {
				return "Обов'язкове поле";
			}
			return 'Некоректний формат даних';

		case 'too_small':
			if (iss.origin === 'string') {
				if (iss.exact) return `Потрібно рівно ${iss.minimum} символів`;
				return iss.minimum === 1 ?
						'Поле не може бути порожнім'
					:	`Мінімум ${iss.minimum} символів`;
			}
			if (
				iss.origin === 'number' ||
				iss.origin === 'int' ||
				iss.origin === 'bigint'
			) {
				return iss.inclusive ?
						`Значення має бути ≥ ${iss.minimum}`
					:	`Значення має бути > ${iss.minimum}`;
			}
			return undefined;

		case 'too_big':
			if (iss.origin === 'string') {
				if (iss.exact) return `Потрібно рівно ${iss.maximum} символів`;
				return `Максимум ${iss.maximum} символів`;
			}
			return undefined;

		case 'invalid_value':
			return 'Будь ласка, оберіть значення із запропонованого списку';

		case 'invalid_union':
			return 'Будь ласка, перевірте правильність вибору';

		default:
			return undefined;
	}
};
