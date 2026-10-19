import {
	Mutation,
	MutationCache,
	QueryCache,
	QueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { AppError, isAppError } from './api/api.types';
import { casesKeys } from './api/endpoints/case';
import { patientsKeys } from './api/endpoints/patient';
import { statisticsKeys } from './api/endpoints/statistics';
import { testingsKeys } from './api/endpoints/testing';

const handleGlobalError = (error: unknown, meta: ToastErrorMeta) => {
	if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
		toast.error("Втрачено з'єднання з сервером. Перевірте інтернет.");
		return;
	}
	if (meta?.disableErrorToast) return;

	if (isAppError(error)) {
		toast.error(error.message);
	}
};

const handleGlobalInvalidation = (client: QueryClient, mutation: Mutation) => {
	if (mutation.meta?.skipGlobalInvalidation) return;

	client.invalidateQueries({
		queryKey: casesKeys.all(),
	});
	client.invalidateQueries({
		queryKey: patientsKeys.all(),
	});
	client.invalidateQueries({
		queryKey: testingsKeys.all(),
	});
	client.invalidateQueries({
		queryKey: statisticsKeys.all(),
	});
};

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			handleGlobalError(error, query.meta as QueryMeta);
		},
	}),
	mutationCache: new MutationCache({
		onError: (error, _variables, _context, mutation) => {
			handleGlobalError(error, mutation.meta as MutationMeta);
		},
		onSuccess: (_data, _variables, _context, mutation) => {
			handleGlobalInvalidation(queryClient, mutation as Mutation);
		},
	}),
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 3,
		},
	},
});

interface ToastErrorMeta extends Record<string, unknown> {
	disableErrorToast?: boolean;
}

interface MutationMeta extends ToastErrorMeta, Record<string, unknown> {
	skipGlobalInvalidation?: boolean;
}

interface QueryMeta extends ToastErrorMeta {}

declare module '@tanstack/react-query' {
	interface Register {
		defaultError: AppError;
		mutationMeta: MutationMeta;
		queryMeta: QueryMeta;
	}
}
