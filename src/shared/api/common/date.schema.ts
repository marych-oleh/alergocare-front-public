import z from 'zod';
import { dayjs, Dayjs } from '../../lib/date/dayjs';

export const DateSchemas = {
	timestamp: {
		read: z.string().transform((str) => dayjs.utc(str)),
		write: z
			.custom<Dayjs>((val) => val !== null && val !== undefined, {
				error: "Обов'язкове поле",
			})
			.refine((d) => dayjs.isDayjs(d) && d.isValid(), {
				error: 'Введено некоректну дату (або неіснуючий день)',
			})
			.transform((d) => d.toISOString()),
	},
	calendar: {
		read: z.string().transform((str) => dayjs.utc(str).startOf('day')),
		write: z
			.custom<Dayjs>((val) => val !== null && val !== undefined, {
				error: "Обов'язкове поле",
			})
			.refine((d) => dayjs.isDayjs(d) && d.isValid(), {
				error: 'Введено некоректну дату',
			})
			.transform((d) => d.format('YYYY-MM-DD')),
	},
};
