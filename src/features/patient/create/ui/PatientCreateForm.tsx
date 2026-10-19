import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useForm, Watch } from 'react-hook-form';
import {
	PatientDiscoverySelect,
	PatientGenderSelect,
} from '~/entities/patient';
import {
	PatientDetail,
	PatientWriteFormValues,
	PatientWritePayload,
	PatientWriteSchema,
} from '~/shared/api/endpoints/patient';
import { setFormErrorsFromServer } from '~/shared/lib/errors';
import {
	CountryCodeEnum,
	UkraineDistrictCodeEnum,
} from '~/shared/lib/location';
import { CountryAutocomplete } from '~/shared/ui/autocomplete/CountryAutocomplete';
import { UkraineDistrictAutocomplete } from '~/shared/ui/autocomplete/UkraineDistrictAutocomplete';
import { CalendarDatePicker } from '~/shared/ui/DatePicker/CalendarDatePicker';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import { RHFTextField } from '~/shared/ui/rhf/RHFTextField';
import { useCreatePatientMutation } from '../api/mutation';

interface PatientCreateFormProps {
	onSuccess?: (data: PatientDetail) => void;
	formId?: string;
}

const defaultValues: any = {
	surname: '',
	discoveryMethod: null,
	gender: null,
	birthday: null,
	countryCode: CountryCodeEnum.UA,
	districtCode: UkraineDistrictCodeEnum.LVIV,
};

export const PatientCreateForm = ({
	onSuccess,
	formId,
}: PatientCreateFormProps) => {
	const { control, handleSubmit, setError, setValue, reset } = useForm<
		PatientWriteFormValues,
		any,
		PatientWritePayload
	>({
		resolver: zodResolver(PatientWriteSchema),
		defaultValues: defaultValues,
		mode: 'onBlur',
	});

	const { mutate: create } = useCreatePatientMutation({
		onSuccess,
	});

	const onSubmit = (data: PatientWritePayload) => {
		create(data, {
			onSuccess: () => {
				reset(defaultValues);
			},
			onError: (error) => {
				return setFormErrorsFromServer(error, setError);
			},
		});
	};

	return (
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
				name="surname"
				control={control}
				required
				label="Прізвище"
				renderEditMode={(props) => <RHFTextField {...props} size="small" />}
			/>

			<EditableField
				name="gender"
				control={control}
				required
				label="Стать"
				renderEditMode={(props) => (
					<PatientGenderSelect {...props} size="small" />
				)}
			/>

			<EditableField
				name="discoveryMethod"
				control={control}
				label="Джерело залучення"
				required
				renderEditMode={(props) => (
					<PatientDiscoverySelect {...props} size="small" />
				)}
			/>

			<EditableField
				name="birthday"
				control={control}
				required
				label="Дата народження"
				renderEditMode={(props) => (
					<CalendarDatePicker {...props} disableFuture />
				)}
			/>

			<EditableField
				name="countryCode"
				control={control}
				required
				label="Країна"
				renderEditMode={(props) => (
					<CountryAutocomplete
						{...props}
						onChange={(_, val) => {
							if (val?.code !== CountryCodeEnum.UA)
								setValue('districtCode', null);
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
							renderEditMode={(props) => (
								<UkraineDistrictAutocomplete {...props} />
							)}
						/>
					);
				}}
			/>
		</Box>
	);
};
