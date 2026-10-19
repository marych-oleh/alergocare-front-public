import { z } from 'zod';
import { ua } from 'zod/locales';
import { ukrainianCustomError } from './zod-errors-ua';

export function setZodConfig() {
	z.config({ customError: ukrainianCustomError, ...ua() });
}
