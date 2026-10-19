import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { validateOrThrow, handleAppError, mapZodToAppError } from './errors';
import type { AppError } from '~/shared/api';

const schema = z.object({ name: z.string().min(1) });

describe('validateOrThrow', () => {
	it('returns parsed data when valid', async () => {
		const result = await validateOrThrow(schema, { name: 'Test' });
		expect(result).toEqual({ name: 'Test' });
	});

	it('throws an AppError when invalid', async () => {
		await expect(validateOrThrow(schema, { name: '' })).rejects.toMatchObject({
			message: 'Помилка валідації (Клієнт)',
			details: {
				errorCode: 'validation_error',
			},
		});
	});

	it('thrown error contains field context', async () => {
		try {
			await validateOrThrow(schema, { name: '' });
		} catch (err: any) {
			expect(err.details.context).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ field: 'name' }),
				])
			);
		}
	});
});

describe('mapZodToAppError', () => {
	it('maps ZodError to AppError structure', () => {
		const result = schema.safeParse({ name: '' });
		const appError = mapZodToAppError((result as any).error);
		expect(appError.details.errorCode).toBe('validation_error');
		expect((appError.details as any).context[0].field).toBe('name');
	});
});

describe('handleAppError', () => {
	it('returns the error as-is when it is already an AppError', () => {
		const appError: AppError = {
			message: 'Помилка',
			details: { errorCode: 'some_error', timestamp: new Date().toISOString() },
		};
		expect(handleAppError(appError)).toBe(appError);
	});

	it('maps ZodError to AppError', () => {
		const zodResult = schema.safeParse({});
		const result = handleAppError((zodResult as any).error);
		expect(result.details.errorCode).toBe('validation_error');
	});

	it('returns unknown_error for unexpected errors', () => {
		const result = handleAppError(new Error('boom'));
		expect(result.details.errorCode).toBe('unknown_error');
		expect(result.message).toBe('Сталася непередбачена помилка');
	});

	it('returns unknown_error for null', () => {
		const result = handleAppError(null);
		expect(result.details.errorCode).toBe('unknown_error');
	});

	it('returns unknown_error for string', () => {
		const result = handleAppError('error string');
		expect(result.details.errorCode).toBe('unknown_error');
	});
});
