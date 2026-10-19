import { DiscoveryMethod, Gender } from '~/shared/api/endpoints/patient';

export const GENDER_LABEL: Record<Gender, string> = {
	male: 'Чоловік',
	female: 'Жінка',
};

export const DISCOVERY_METHOD_LABEL: Record<DiscoveryMethod, string> = {
	self_discovered: 'Самостійно',
	social_media: 'Соціальні мережі',
	internet: 'Інтернет',
	friends_recommendation: 'Порада знайомих',
	dentist_referral: 'Скерування стоматолога',
	doctor_referral: 'Скерування лікаря',
};
