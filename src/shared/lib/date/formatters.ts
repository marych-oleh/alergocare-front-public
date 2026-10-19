import { DATE_FORMATS } from '~/shared/config';
import { dayjs } from './dayjs';

export const dateFormatters = {
	toUiDateTime: (date: string | dayjs.Dayjs) =>
		dayjs(date).format(DATE_FORMATS.DISPLAY_FULL),
	toUiDate: (date: string | dayjs.Dayjs) =>
		dayjs(date).format(DATE_FORMATS.DISPLAY_DATE),

	toIso: (date: dayjs.Dayjs) => date.toISOString(),
};
