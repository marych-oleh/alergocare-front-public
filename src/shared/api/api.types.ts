export interface BaseErrorDetails {
	errorCode: string;
	timestamp: string;
}

export interface ValidationErrorContext {
	field: string;
	message: string;
	errorCode: string;
}

export interface ValidationErrorDetails extends BaseErrorDetails {
	errorCode: 'validation_error';
	context: ValidationErrorContext[];
}

export interface AuthErrorDetails extends BaseErrorDetails {
	errorCode: 'credentials_mismatch';
}

export interface UnAuthorizedError extends BaseErrorDetails {
	errorCode: 'unauthorized' | 'session_update_failed';
}

// All possible details combined
export type AppErrorDetails =
	| ValidationErrorDetails
	| AuthErrorDetails
	| BaseErrorDetails;

export interface AppError {
	message: string;
	details: AppErrorDetails;
}

export type ServerResponse<T> =
	| { ok: true; result: T }
	| { ok: false; error: AppError };

//========================================================================================================================================================
// TYPE GUARDS
export function isAppError(err: any): err is AppError {
	return (
		typeof err === 'object' &&
		err !== null &&
		'message' in err &&
		'details' in err &&
		typeof err.details === 'object' &&
		err.details !== null &&
		'errorCode' in err.details
	);
}

export function isUnAuthorizedError(
	err: any
): err is AppError & { details: UnAuthorizedError } {
	return (
		isAppError(err) &&
		(err.details?.errorCode === 'unauthorized' ||
			err.details?.errorCode === 'session_update_failed')
	);
}

export function isValidationError(
	err: any
): err is AppError & { details: ValidationErrorDetails } {
	return isAppError(err) && err.details.errorCode === 'validation_error';
}
