import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
	CaseWriteFormValues,
	CaseWritePayload,
	CaseWriteSchema,
} from '~/shared/api/endpoints/case';
import { setFormErrorsFromServer } from '~/shared/lib/errors';
import { PATHS } from '~/shared/routes';
import { useCreateCaseMutation } from '../api/mutation';

export const BASE_DEFAULTS: CaseWriteFormValues = {
	patientId: '',
	drugTestBefore: false,
	needAllergyTesting: true,
};

export type UseCaseCreateFormReturn = ReturnType<typeof useCaseCreateForm>;

export type UseCaseCreateFormProps = {
	initialValues?: Partial<CaseWriteFormValues>;
};

export const useCaseCreateForm = ({
	initialValues = BASE_DEFAULTS,
}: UseCaseCreateFormProps = {}) => {
	const navigate = useNavigate();

	const defaultValues = useMemo(
		() => ({
			...BASE_DEFAULTS,
			...initialValues,
		}),
		[initialValues]
	);

	const form = useForm<CaseWriteFormValues, any, CaseWritePayload>({
		resolver: zodResolver(CaseWriteSchema),
		defaultValues,
		mode: 'onBlur',
	});

	const { mutate: create, isPending } = useCreateCaseMutation({
		onSuccess: (newCase) => {
			form.reset(initialValues);
			navigate(PATHS.cases.byId.get(newCase.id));
		},
	});

	const onSubmit = form.handleSubmit((data) => {
		create(data, {
			onError: (error) => {
				setFormErrorsFromServer(error, form.setError);
				console.error(error);
			},
		});
	});

	return {
		form,
		isPending,
		onSubmit,
	};
};
