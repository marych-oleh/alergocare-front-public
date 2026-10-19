import { describe, it, expect } from 'vitest';
import { isAppError, isUnAuthorizedError, isValidationError } from './api.types';
import type { AppError } from './api.types';

const makeAppError = (errorCode: string): AppError => ({
	message: 'Error',
	details: { errorCode, timestamp: new Date().toISOString() },
});

const makeValidationError = (): AppError => ({
	message: 'Validation error',
	details: {
		errorCode: 'validation_error',
		timestamp: new Date().toISOString(),
		context: [],
	},
});

describe('isAppError', () => {
	it('returns true for a valid AppError', () => {
		expect(isAppError(makeAppError('some_error'))).toBe(true);
	});

	it('returns false for null', () => {
		expect(isAppError(null)).toBe(false);
	});

	it('returns false for undefined', () => {
		expect(isAppError(undefined)).toBe(false);
	});

	it('returns false for plain Error', () => {
		expect(isAppError(new Error('boom'))).toBe(false);
	});

	it('returns false for object missing details', () => {
		expect(isAppError({ message: 'Error' })).toBe(false);
	});

	it('returns false for object missing message', () => {
		expect(isAppError({ details: { errorCode: 'x', timestamp: '' } })).toBe(false);
	});

	it('returns false for string', () => {
		expect(isAppError('error')).toBe(false);
	});
});

describe('isUnAuthorizedError', () => {
	it('returns true for unauthorized errorCode', () => {
		expect(isUnAuthorizedError(makeAppError('unauthorized'))).toBe(true);
	});

	it('returns true for session_update_failed errorCode', () => {
		expect(isUnAuthorizedError(makeAppError('session_update_failed'))).toBe(true);
	});

	it('returns false for other errorCodes', () => {
		expect(isUnAuthorizedError(makeAppError('not_found'))).toBe(false);
	});

	it('returns false for non-AppError', () => {
		expect(isUnAuthorizedError(null)).toBe(false);
	});
});

describe('isValidationError', () => {
	it('returns true for validation_error errorCode', () => {
		expect(isValidationError(makeValidationError())).toBe(true);
	});

	it('returns false for other AppErrors', () => {
		expect(isValidationError(makeAppError('not_found'))).toBe(false);
	});

	it('returns false for null', () => {
		expect(isValidationError(null)).toBe(false);
	});
});
