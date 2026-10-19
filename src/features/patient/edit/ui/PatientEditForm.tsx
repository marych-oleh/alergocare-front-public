import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useForm, Watch } from 'react-hook-form';
import {
	DISCOVERY_METHOD_LABEL,
	GENDER_LABEL,
	PatientDiscoverySelect,
	PatientGenderSelect,
} from '~/entities/patient';
import {
	PatientDetail,
	patientsQueries,
	PatientWritePayload,
	PatientWriteSchema,
} from '~/shared/api/endpoints/patient';
import { dateFormatters } from '~/shared/lib/date';
import { setFormErrorsFromServer } from '~/shared/lib/errors';
import {
	CountryCodeEnum,
	getCountryNameInUkrainian,
	UKRAINE_DISTRICT_LABELS,
} from '~/shared/lib/location';
import { CountryAutocomplete } from '~/shared/ui/autocomplete/CountryAutocomplete';
import { UkraineDistrictAutocomplete } from '~/shared/ui/autocomplete/UkraineDistrictAutocomplete';
import { CalendarDatePicker } from '~/shared/ui/DatePicker/CalendarDatePicker';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import { FormSubmitButton } from '~/shared/ui/FormSubmitButton/FormSubmitButton';
import Loader from '~/shared/ui/Loader/Loader';
import { RHFTextField } from '~/shared/ui/rhf/RHFTextField';
import { useUpdatePatientMutation } from '../api/mutation';

type PatientEditFormProps = {
	onSuccess?: (data: PatientDetail) => void;
	patientId: string;
	// Add a slot for extending the modal UI
	additionalElements?: ReactNode;
};

const FORM_ID = 'patient-edit-form';

export const PatientEditForm = ({
	onSuccess,
	patientId,
	additionalElements,
}: PatientEditFormProps) => {
	const { data: patient, isLoading } = useQuery(
		patientsQueries.detail(patientId)
	);

	const { control, handleSubmit, setError, setValue } = useForm({
		resolver: zodResolver(PatientWriteSchema),
		values: patient,
		mode: 'onBlur',
	});

	const { mutate: update, isPending } = useUpdatePatientMutation(patientId);

	const onSubmit = (payload: PatientWritePayload) => {
		update(payload, {
			onSuccess,
			onError: (error) => setFormErrorsFromServer(error, setError),
		});
	};

	return (
		<>
			{isLoading || !patient ?
				<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
					<Loader />
				</Box>
			:	<Box component="form" id={FORM_ID} onSubmit={handleSubmit(onSubmit)}>
					<Stack gap={2}>
						<EditableField
							name="surname"
							control={control}
							required
							label="Прізвище"
							renderReadMode={(val) => val}
							renderEditMode={(props) => (
								<RHFTextField {...props} size="small" />
							)}
						/>

						<EditableField
							name="gender"
							control={control}
							required
							label="Стать"
							renderReadMode={(val) => (val ? GENDER_LABEL[val] : '')}
							renderEditMode={(props) => (
								<PatientGenderSelect {...props} size="small" />
							)}
						/>

						<EditableField
							name="discoveryMethod"
							control={control}
							label="Джерело залучення"
							required
							renderReadMode={(val) =>
								val ? DISCOVERY_METHOD_LABEL[val] : ''
							}
							renderEditMode={(props) => (
								<PatientDiscoverySelect {...props} size="small" />
							)}
						/>

						<EditableField
							name="birthday"
							control={control}
							required
							label="Дата народження"
							renderReadMode={(val) =>
								val ? dateFormatters.toUiDate(val) : ''
							}
							renderEditMode={(props) => (
								<CalendarDatePicker {...props} disableFuture />
							)}
						/>

						<EditableField
							name="countryCode"
							control={control}
							required
							label="Країна"
							renderReadMode={(val) =>
								val ? getCountryNameInUkrainian(val) : 'Не обрано'
							}
							renderEditMode={(props) => (
								<CountryAutocomplete
									{...props}
									onChange={(_, val) => {
										if (val?.code !== CountryCodeEnum.UA)
											setValue('districtCode', null);
										return val;
									}}
								/>
							)}
						/>

						<Watch
							control={control}
							name="countryCode"
							render={(countryCode) => {
								if (countryCode !== CountryCodeEnum.UA) return null;
								return (
									<EditableField
										name="districtCode"
										control={control}
										required
										label="Область"
										renderReadMode={(val) =>
											val ?
												UKRAINE_DISTRICT_LABELS[val]
											:	'Не обрано'
										}
										renderEditMode={(props) => (
											<UkraineDistrictAutocomplete {...props} />
										)}
									/>
								);
							}}
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
