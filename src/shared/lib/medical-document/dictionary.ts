import { MedicalDocumentEnum } from './MedicalDocumentEnum';

export const MEDICAL_DOCUMENTS_LABELS: Record<MedicalDocumentEnum, string> = {
	[MedicalDocumentEnum.DISCHARGE_SUMMARY]:
		'Виписки з лікарні про надання допомоги та подальше лікування в стаціонарі',
	[MedicalDocumentEnum.EMERGENCY_REPORT]:
		'Опис випадку, що стався, лікарем, що безпосередньо надавав невідкладну допомогу',
	[MedicalDocumentEnum.MEDICATION_HISTORY]:
		'Запис переліку препаратів, що напередодні використовувались та часові рамки їх застосування',
};
