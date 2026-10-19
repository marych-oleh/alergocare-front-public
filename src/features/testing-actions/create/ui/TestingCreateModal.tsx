import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useForm, Watch } from 'react-hook-form';
import {
	TestingMethodSelect,
	TestingStageSelect,
	TestingTypeSelect,
} from '~/entities/testing';
import { ComplicationAutocomplete } from '~/features/complication-manage';
import { DrugAutocomplete } from '~/features/drug-manage';
import {
	TestingDetail,
	TestingWriteFormValues,
	TestingWritePayload,
	TestingWriteSchema,
} from '~/shared/api/endpoints/testing';
import { dayjs } from '~/shared/lib/date';
import { setFormErrorsFromServer } from '~/shared/lib/errors';
import { NullableObject } from '~/shared/lib/objects';
import { CalendarDatePicker } from '~/shared/ui/DatePicker/CalendarDatePicker';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import GenericDialog, {
	DefaultDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
} from '~/shared/ui/modal/GenericDialog';
import { RHFBooleanRadioGroup } from '~/shared/ui/rhf/RHFBooleanRadioGroup';
import { useCreateTestingMutation } from '../api/mutation';

type TestingCreateModalProps = {
	onSuccess?: (data: TestingDetail) => void;
	formId?: string;
	onClose: () => void;
	open: boolean;
	caseId: string;
};

const defaultValues = {
	testingDate: dayjs(),
	type: null,
	method: null,
	isPositive: null,
	finalStage: null,
} as NullableObject<TestingWriteFormValues>;

export const TestingCreateModal = ({
	onSuccess,
	formId,
	open,
	onClose,
	caseId,
}: TestingCreateModalProps) => {
	const { control, handleSubmit, setError, reset, setValue } = useForm<
		TestingWriteFormValues,
		any,
		TestingWritePayload
	>({
		resolver: zodResolver(TestingWriteSchema),
		defaultValues: {
			...(defaultValues as any),
			caseId: caseId,
		},
		mode: 'onBlur',
	});

	const { mutate: create, isPending } = useCreateTestingMutation({
		onSuccess,
	});

	const onSubmit = (data: TestingWritePayload) => {
		create(data, {
			onSuccess: () => {
				reset({
					...(defaultValues as any),
					caseId: caseId,
				});
			},
			onError: (error) => {
				console.log(error);
				return setFormErrorsFromServer(error, setError);
			},
		});
	};

	const handleOnClose = () => {
		reset({
			...(defaultValues as any),
			caseId: caseId,
		});
		onClose();
	};

	return (
		<GenericDialog open={open} onClose={handleOnClose}>
			<StyledDialogTitle>Нове тестування</StyledDialogTitle>
			<StyledDialogContent sx={{ py: 1, px: 2 }}>
				<Box
					component="form"
					id={formId}
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						gap: 3,
					}}
				>
					<EditableField
						name="drug"
						control={control}
						required
						label="Препарат"
						renderEditMode={(props) => (
							<DrugAutocomplete multiple={false} {...props} />
						)}
					/>
					<EditableField
						name="type"
						control={control}
						required
						label="Категорія"
						renderEditMode={(props) => <TestingTypeSelect {...props} />}
					/>
					<EditableField
						name="method"
						control={control}
						required
						label="Спосіб"
						renderEditMode={(props) => (
							<TestingMethodSelect
								{...props}
								onChange={() => {
									setValue('finalStage', null);
								}}
							/>
						)}
					/>
					<EditableField
						name="isPositive"
						required
						control={control}
						label="Результат тестування"
						renderEditMode={(props) => (
							<RHFBooleanRadioGroup
								{...props}
								trueLabel="Позитивний"
								falseLabel="Негативний"
								onChange={() => {
									setValue('finalStage', null);
									setValue('complications', undefined);
								}}
							/>
						)}
					/>

					<Watch
						control={control}
						name={['isPositive', 'method']}
						render={([isPositive, method]) => {
							if (!isPositive) return null;
							return (
								<>
									<EditableField
										name="finalStage"
										control={control}
										label="Кінцевий етап тестування"
										required
										renderEditMode={(props) => (
											<TestingStageSelect
												methodValue={method}
												{...props}
											/>
										)}
									/>
									<EditableField
										name="complications"
										control={control}
										label="Ускладнення"
										renderEditMode={(props) => (
											<ComplicationAutocomplete {...props} />
										)}
									/>
								</>
							);
						}}
					/>

					<EditableField
						name="testingDate"
						control={control}
						required
						label="Дата проведення тестування"
						renderEditMode={(props) => (
							<CalendarDatePicker {...props} disableFuture />
						)}
					/>
				</Box>
			</StyledDialogContent>
			<DefaultDialogActions
				onCancel={handleOnClose}
				submitLabel={isPending ? 'Збереження...' : 'Створити тестування'}
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
