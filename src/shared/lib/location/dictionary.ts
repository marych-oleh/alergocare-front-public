import { CountryCodeEnum, UkraineDistrictCodeEnum } from './location-codes';

export type LocationNode<T = string> = {
	code: T;
	label: string;
};

export const UKRAINE_DISTRICT_LABELS: Record<UkraineDistrictCodeEnum, string> =
	{
		[UkraineDistrictCodeEnum.CHERKASY]: 'Черкаська область',
		[UkraineDistrictCodeEnum.CHERNIHIV]: 'Чернігівська область',
		[UkraineDistrictCodeEnum.CHERNIVTSI]: 'Чернівецька область',
		[UkraineDistrictCodeEnum.CRIMEA]: 'АР Крим',
		[UkraineDistrictCodeEnum.DNIPROPETROVSK]: 'Дніпропетровська область',
		[UkraineDistrictCodeEnum.DONETSK]: 'Донецька область',
		[UkraineDistrictCodeEnum.IVANO_FRANKIVSK]: 'Івано-Франківська область',
		[UkraineDistrictCodeEnum.KHARKIV]: 'Харківська область',
		[UkraineDistrictCodeEnum.KHERSON]: 'Херсонська область',
		[UkraineDistrictCodeEnum.KHMELNYTSKYI]: 'Хмельницька область',
		[UkraineDistrictCodeEnum.KIROVOHRAD]: 'Кіровоградська область',
		[UkraineDistrictCodeEnum.KYIV]: 'м. Київ',
		[UkraineDistrictCodeEnum.KYIV_OBLAST]: 'Київська область',
		[UkraineDistrictCodeEnum.LUHANSK]: 'Луганська область',
		[UkraineDistrictCodeEnum.LVIV]: 'Львівська область',
		[UkraineDistrictCodeEnum.MYKOLAIV]: 'Миколаївська область',
		[UkraineDistrictCodeEnum.ODESA]: 'Одеська область',
		[UkraineDistrictCodeEnum.POLTAVA]: 'Полтавська область',
		[UkraineDistrictCodeEnum.RIVNE]: 'Рівненська область',
		[UkraineDistrictCodeEnum.SEVASTOPOL]: 'м. Севастополь',
		[UkraineDistrictCodeEnum.SUMY]: 'Сумська область',
		[UkraineDistrictCodeEnum.TERNOPIL]: 'Тернопільська область',
		[UkraineDistrictCodeEnum.VINNYTSIA]: 'Вінницька область',
		[UkraineDistrictCodeEnum.VOLYN]: 'Волинська область',
		[UkraineDistrictCodeEnum.ZAKARPATTIA]: 'Закарпатська область',
		[UkraineDistrictCodeEnum.ZAPORIZHZHIA]: 'Запорізька область',
		[UkraineDistrictCodeEnum.ZHYTOMYR]: 'Житомирська область',
	};

// Native Browser API
const regionNamesInUkrainian = new Intl.DisplayNames(['uk'], {
	type: 'region',
});

export const getCountryNameInUkrainian = (
	code: string,
	fallbackName: string = 'Невідомий код'
): string => {
	try {
		return regionNamesInUkrainian.of(code) || fallbackName;
	} catch (e) {
		// Fallback just in case a weird code gets passed
		return fallbackName;
	}
};

export const COUNTRY_OPTIONS: LocationNode<CountryCodeEnum>[] = Object.values(
	CountryCodeEnum
)
	.map((countryCode) => ({
		code: countryCode as CountryCodeEnum,
		label: getCountryNameInUkrainian(countryCode),
	}))
	.sort((a, b) => a.label.localeCompare(b.label));

export const UKRAINE_DISTRICT_OPTIONS: LocationNode<UkraineDistrictCodeEnum>[] =
	Object.entries(UKRAINE_DISTRICT_LABELS)
		.map(([code, label]) => ({
			code: code as UkraineDistrictCodeEnum,
			label,
		}))
		.sort((a, b) => a.label.localeCompare(b.label));
