import { Stack } from '@mui/material';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { MedicalDocumentsSelect, SymptomsDurationField } from '~/entities/case';
import { UseCaseCreateFormReturn } from '~/features/case/create';
import { ComorbidityAutocomplete } from '~/features/comorbidity-manage';
import {
	ExaminationRecordsBuilder,
	ExaminationRecordsViewer,
} from '~/features/examination-manage';
import { PreliminaryDiagnoseAutocomplete } from '~/features/preliminary-diagnose-manage';
import { SymptomAutocomplete } from '~/features/symptom-manage';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import GenericDialog, {
	DefaultDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
} from '~/shared/ui/modal/GenericDialog';
import { RHFBooleanRadioGroup } from '~/shared/ui/rhf/RHFBooleanRadioGroup';
import { AllergiesSection } from './AllergiesSection';

const FORM_ID = 'case-create-form';

export type CaseCreateModalProps = {
	open: boolean;
	onClose: () => void;
	formId?: string;
	title?: string;
	caseCreateProps: UseCaseCreateFormReturn;
	patientFieldRenderer: () => React.JSX.Element;
};

export const CaseCreateModal = ({
	open,
	onClose,
	caseCreateProps,
	patientFieldRenderer,
	formId = FORM_ID,
	title = 'Створити звернення',
}: CaseCreateModalProps) => {
	const { form, isPending, onSubmit } = caseCreateProps;

	return (
		<GenericDialog open={open} onClose={onClose} fullScreen={true}>
			<StyledDialogTitle>{title}</StyledDialogTitle>
			<StyledDialogContent sx={{ py: 1, px: 1.5 }}>
				<FormProvider {...form}>
					<form id={formId} onSubmit={onSubmit}>
						<Stack spacing={3}>
							{patientFieldRenderer()}

							<SymptomsDurationField control={form.control} />

							<EditableField
								name="drugTestBefore"
								control={form.control}
								label="Чи були проби на медикаменти іншими лікарями"
								required
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
								renderEditMode={(props) => (
									<MedicalDocumentsSelect {...props} />
								)}
							/>

							<AllergiesSection
								control={form.control}
								setValue={form.setValue}
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
								renderEditMode={(props) => (
									<PreliminaryDiagnoseAutocomplete {...props} />
								)}
							/>

							<EditableField
								name="comorbidities"
								control={form.control}
								label="Супутні захворювання"
								renderEditMode={(props) => (
									<ComorbidityAutocomplete {...props} />
								)}
							/>

							<EditableField
								name="symptoms"
								control={form.control}
								label="Симптоми"
								renderEditMode={(props) => (
									<SymptomAutocomplete {...props} />
								)}
							/>
						</Stack>
					</form>
				</FormProvider>
			</StyledDialogContent>
			<DefaultDialogActions
				onCancel={onClose}
				submitLabel={isPending ? 'Збереження...' : title}
				submitButtonProps={{
					form: formId,
					type: 'submit',
					loading: isPending,
					disabled: isPending,
				}}
			/>
		</GenericDialog>
	);
};
