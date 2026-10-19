import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
	casesQueries,
	CaseWriteFormValues,
	CaseWritePayload,
	CaseWriteSchema,
} from '~/shared/api/endpoints/case';
import { setFormErrorsFromServer } from '~/shared/lib/errors';
import { useUpdateCaseMutation } from '../api/mutation';

export type useCaseUpdateFormProps = {
	caseId: string;
};

export type useCaseUpdateFormReturn = ReturnType<typeof useCaseUpdateForm>;

export const useCaseUpdateForm = ({ caseId }: useCaseUpdateFormProps) => {
	const { data: loadedCase, isLoading } = useQuery(
		casesQueries.detail(caseId)
	);

	const form = useForm<CaseWriteFormValues, any, CaseWritePayload>({
		resolver: zodResolver(CaseWriteSchema),
		values: loadedCase,
		mode: 'onBlur',
	});

	const { mutate: create, isPending } = useUpdateCaseMutation(caseId);

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
		loadedCase,
		isLoading,
	};
};
