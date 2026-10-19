import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import uk from 'dayjs/locale/uk';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
// dayjs.extend(timezone);
dayjs.locale(uk);

export { dayjs, Dayjs };
