import z from 'zod';
import { AppError, isAppError } from '~/shared/api';

// A utility function to run Zod and fake a server error if it fails
export async function validateOrThrow<T>(
	schema: z.ZodSchema<T>,
	data: unknown
): Promise<T> {
	const result = schema.safeParse(data);

	if (!result.success) {
		const fakeServerError: AppError = {
			message: 'Помилка валідації (Клієнт)',
			details: {
				errorCode: 'validation_error',
				timestamp: new Date().toISOString(),
				context: result.error.issues.map((issue) => ({
					field: issue.path.join('.'),
					message: issue.message,
					errorCode: issue.code,
				})),
			},
		};
		throw fakeServerError;
	}

	return result.data;
}

export function handleAppError(error: unknown): AppError {
	if (isAppError(error)) {
		return error as AppError;
	}

	if (error instanceof z.ZodError) {
		return mapZodToAppError(error);
	}

	return {
		message: 'Сталася непередбачена помилка',
		details: {
			errorCode: 'unknown_error',
			timestamp: new Date().toISOString(),
		},
	};
}

export function mapZodToAppError(zodError: z.ZodError): AppError {
	return {
		message: 'Помилка валідації на клієнті',
		details: {
			errorCode: 'validation_error',
			timestamp: new Date().toISOString(),
			context: zodError.issues.map((issue) => ({
				field: issue.path.join('.'),
				message: issue.message,
				errorCode: issue.code,
			})),
		},
	};
}
