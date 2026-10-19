import { describe, it, expect, vi } from 'vitest';
import { setFormErrorsFromServer } from './form.utils';
import type { AppError } from '~/shared/api';

const makeValidationError = (fields: { field: string; message: string }[]): AppError => ({
	message: 'Validation failed',
	details: {
		errorCode: 'validation_error',
		timestamp: new Date().toISOString(),
		context: fields.map((f) => ({
			...f,
			errorCode: 'invalid_string',
		})),
	},
});

describe('setFormErrorsFromServer', () => {
	it('sets field errors and returns true for validation errors', () => {
		const setError = vi.fn();
		const error = makeValidationError([
			{ field: 'surname', message: "Прізвище є обов'язковим" },
		]);

		const result = setFormErrorsFromServer(error, setError);

		expect(result).toBe(true);
		expect(setError).toHaveBeenCalledWith('surname', {
			type: 'server',
			message: "Прізвище є обов'язковим",
		});
	});

	it('sets multiple field errors at once', () => {
		const setError = vi.fn();
		const error = makeValidationError([
			{ field: 'surname', message: 'Required' },
			{ field: 'gender', message: 'Invalid' },
		]);

		setFormErrorsFromServer(error, setError);

		expect(setError).toHaveBeenCalledTimes(2);
		expect(setError).toHaveBeenCalledWith('surname', expect.any(Object));
		expect(setError).toHaveBeenCalledWith('gender', expect.any(Object));
	});

	it('returns false for non-validation errors', () => {
		const setError = vi.fn();
		const result = setFormErrorsFromServer(new Error('network'), setError);

		expect(result).toBe(false);
		expect(setError).not.toHaveBeenCalled();
	});

	it('returns false for null', () => {
		const setError = vi.fn();
		expect(setFormErrorsFromServer(null, setError)).toBe(false);
	});

	it('returns false for a plain AppError (non-validation)', () => {
		const setError = vi.fn();
		const appError: AppError = {
			message: 'Not found',
			details: { errorCode: 'not_found', timestamp: new Date().toISOString() },
		};
		expect(setFormErrorsFromServer(appError, setError)).toBe(false);
		expect(setError).not.toHaveBeenCalled();
	});
});
