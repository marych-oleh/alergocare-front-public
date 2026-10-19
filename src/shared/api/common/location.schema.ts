import { z } from 'zod';
import {
	CountryCodeEnum,
	UkraineDistrictCodeEnum,
} from '~/shared/lib/location';

export const CountryCodeSchema = z.enum(CountryCodeEnum);
export type CountryCode = z.infer<typeof CountryCodeSchema>;

export const DistrictCodeSchema = z.enum(UkraineDistrictCodeEnum);
export type DistrictCode = z.infer<typeof DistrictCodeSchema>;
