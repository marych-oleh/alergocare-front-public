import { useIsMutating } from '@tanstack/react-query';
import { memo } from 'react';
import { PatientDetail } from '~/shared/api/endpoints/patient';
import GenericDialog, {
	DefaultDialogActions,
	GenericDialogProps,
	StyledDialogContent,
	StyledDialogTitle,
} from '~/shared/ui/modal/GenericDialog';
import { createPatientMutationKey } from '../api/mutation';
import { PatientCreateForm } from './PatientCreateForm';

type PatientCreateFormProps = {
	onSuccess?: (data: PatientDetail) => void;
	onClose: () => void;
} & Pick<GenericDialogProps, 'open' | 'onClose'>;

const FORM_ID = 'patient-create-form';

function Component({ onSuccess, ...props }: PatientCreateFormProps) {
	const isCreating =
		useIsMutating({
			mutationKey: createPatientMutationKey,
		}) > 0;
	return (
		<GenericDialog keepMounted {...props}>
			<StyledDialogTitle>Новий пацієнт</StyledDialogTitle>
			<StyledDialogContent sx={{ py: 1, px: 2 }}>
				<PatientCreateForm onSuccess={onSuccess} formId={FORM_ID} />
			</StyledDialogContent>
			<DefaultDialogActions
				onCancel={props.onClose}
				submitLabel={isCreating ? 'Збереження...' : 'Створити пацієнта'}
				submitButtonProps={{
					form: FORM_ID,
					type: 'submit',
					loading: isCreating,
					disabled: isCreating,
				}}
			/>
		</GenericDialog>
	);
}

export const PatientCreateModal = memo(Component) as typeof Component;
