import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { MedicalDocumentsSelect, SymptomsDurationField } from '~/entities/case';
import { CaseDeleteAction } from '~/features/case/delete';
import { useCaseUpdateFormReturn } from '~/features/case/edit';
import { ComorbidityAutocomplete } from '~/features/comorbidity-manage';
import {
	ExaminationRecordsBuilder,
	ExaminationRecordsViewer,
} from '~/features/examination-manage';
import { PreliminaryDiagnoseAutocomplete } from '~/features/preliminary-diagnose-manage';
import { SymptomAutocomplete } from '~/features/symptom-manage';
import { MEDICAL_DOCUMENTS_LABELS } from '~/shared/lib/medical-document';
import { ChipList } from '~/shared/ui/ChipList/ChipList';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import { FormSubmitButton } from '~/shared/ui/FormSubmitButton/FormSubmitButton';
import { RHFBooleanRadioGroup } from '~/shared/ui/rhf/RHFBooleanRadioGroup';
import { AllergiesSection } from '~/widgets/case-create';

const FORM_ID = 'case-edit-form';
export type CaseEditFormProps = {
	formId?: string;
	caseId: string;
	onClose: () => void;
	caseUpdateProps: useCaseUpdateFormReturn;
	patientFieldRenderer: () => React.JSX.Element;
};

export const CaseEditForm = ({
	caseId,
	onClose,
	caseUpdateProps,
	patientFieldRenderer,
	formId = FORM_ID,
}: CaseEditFormProps) => {
	const { form, isPending, onSubmit } = caseUpdateProps;

	return (
		<Stack spacing={2}>
			<FormProvider {...form}>
				<form id={formId} onSubmit={onSubmit}>
					<Stack spacing={3}>
						{patientFieldRenderer()}

						<SymptomsDurationField control={form.control} isEditMode />

						<EditableField
							name="drugTestBefore"
							control={form.control}
							label="Чи були проби на медикаменти іншими лікарями"
							required
							renderReadMode={(val) => (val ? 'Були проби' : 'Не було')}
							renderEditMode={(props) => (
								<RHFBooleanRadioGroup
									{...props}
									trueLabel="Були проби"
									falseLabel="Не було"
								/>
							)}
						/>

						<EditableField
							name="needAllergyTesting"
							control={form.control}
							label="Чи є потреба в алерготестуванні"
							required
							renderReadMode={(val) =>
								val ? 'Потрібно' : 'Не потрібно'
							}
							renderEditMode={(props) => (
								<RHFBooleanRadioGroup
									{...props}
									trueLabel="Потрібно"
									falseLabel="Не потрібно"
								/>
							)}
						/>

						<EditableField
							name="documents"
							control={form.control}
							label="Медична документація"
							renderReadMode={(val) => (
								<ChipList
									items={val}
									getLabel={(doc) => MEDICAL_DOCUMENTS_LABELS[doc]}
									emptyText="Відсутня медина документація"
								/>
							)}
							renderEditMode={(props) => (
								<MedicalDocumentsSelect {...props} />
							)}
						/>

						<AllergiesSection
							control={form.control}
							setValue={form.setValue}
							isEditMode={true}
						/>

						<EditableField
							name="examinationRecords"
							control={form.control}
							label="Обстеження та результати"
							renderReadMode={(value) => (
								<ExaminationRecordsViewer records={value} />
							)}
							renderEditMode={(props) => (
								<ExaminationRecordsBuilder control={props.control} />
							)}
						/>

						<EditableField
							name="preliminaryDiagnoses"
							control={form.control}
							label="Попередній діагноз"
							renderReadMode={(val) => <ChipList items={val} />}
							renderEditMode={(props) => (
								<PreliminaryDiagnoseAutocomplete {...props} />
							)}
						/>

						<EditableField
							name="comorbidities"
							control={form.control}
							label="Супутні захворювання"
							renderReadMode={(val) => <ChipList items={val} />}
							renderEditMode={(props) => (
								<ComorbidityAutocomplete {...props} />
							)}
						/>

						<EditableField
							name="symptoms"
							control={form.control}
							label="Симптоми"
							renderReadMode={(val) => <ChipList items={val} />}
							renderEditMode={(props) => (
								<SymptomAutocomplete {...props} />
							)}
						/>
					</Stack>
				</form>
			</FormProvider>

			<Stack alignItems="flex-end">
				<FormSubmitButton
					formId={FORM_ID}
					loading={isPending}
					control={form.control}
				/>
			</Stack>

			<CaseDeleteAction caseId={caseId} onSuccess={onClose} />
		</Stack>
	);
};
