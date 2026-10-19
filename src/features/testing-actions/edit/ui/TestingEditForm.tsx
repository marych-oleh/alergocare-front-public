import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useForm, Watch } from 'react-hook-form';
import {
	TestingMethodDict,
	TestingMethodSelect,
	TestingStageSelect,
	TestingTypeDict,
	TestingTypeSelect,
} from '~/entities/testing';
import { ComplicationAutocomplete } from '~/features/complication-manage';
import { DrugAutocomplete } from '~/features/drug-manage';
import {
	TestingDetail,
	testingsQueries,
	TestingWritePayload,
	TestingWriteSchema,
} from '~/shared/api/endpoints/testing';
import { dateFormatters } from '~/shared/lib/date';
import { setFormErrorsFromServer } from '~/shared/lib/errors';
import { ChipList } from '~/shared/ui/ChipList/ChipList';
import { CalendarDatePicker } from '~/shared/ui/DatePicker/CalendarDatePicker';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import { FormSubmitButton } from '~/shared/ui/FormSubmitButton/FormSubmitButton';
import Loader from '~/shared/ui/Loader/Loader';
import { RHFBooleanRadioGroup } from '~/shared/ui/rhf/RHFBooleanRadioGroup';
import { useUpdateTestingMutation } from '../api/mutation';

type TestingEditFormProps = {
	onSuccess?: (data: TestingDetail) => void;
	testingId: string;
	caseId: string;
	// Add a slot for extending the modal UI
	additionalElements?: ReactNode;
};

const FORM_ID = 'testing-edit-form';

export const TestingEditForm = ({
	onSuccess,
	testingId,
	caseId,
	additionalElements,
}: TestingEditFormProps) => {
	const { data: testing, isLoading } = useQuery(
		testingsQueries.detail(testingId)
	);

	const { control, handleSubmit, setError, setValue } = useForm({
		resolver: zodResolver(TestingWriteSchema),
		values: testing,
		defaultValues: {
			caseId: caseId,
		},
		mode: 'onBlur',
	});

	const { mutate: update, isPending } = useUpdateTestingMutation(testingId);

	const onSubmit = (payload: TestingWritePayload) => {
		update(payload, {
			onSuccess,
			onError: (error) => setFormErrorsFromServer(error, setError),
		});
	};

	return (
		<>
			{isLoading || !testing ?
				<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
					<Loader />
				</Box>
			:	<Box component="form" id={FORM_ID} onSubmit={handleSubmit(onSubmit)}>
					<Stack gap={2}>
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
							renderReadMode={(val) => (val ? TestingTypeDict[val] : '')}
							renderEditMode={(props) => (
								<TestingTypeSelect {...props} />
							)}
						/>
						<EditableField
							name="method"
							control={control}
							required
							label="Спосіб"
							renderReadMode={(val) =>
								val ? TestingMethodDict[val] : ''
							}
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
							renderReadMode={(val) =>
								val ? 'Позитивний' : 'Негативний'
							}
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
											renderReadMode={(val) => (
												<ChipList items={val} />
											)}
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
							renderReadMode={(val) =>
								val ? dateFormatters.toUiDate(val) : 'Не вказано'
							}
							renderEditMode={(props) => (
								<CalendarDatePicker {...props} disableFuture />
							)}
						/>

						<Stack alignItems="flex-end">
							<FormSubmitButton
								formId={FORM_ID}
								loading={isPending || isLoading}
								control={control}
							/>
						</Stack>

						{additionalElements && <Box>{additionalElements}</Box>}
					</Stack>
				</Box>
			}
		</>
	);
};
