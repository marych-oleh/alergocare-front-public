import { Path, UseFormSetError } from 'react-hook-form';
import { isValidationError } from '~/shared/api';

export function setFormErrorsFromServer<
	TFieldValues extends Record<string, any>,
>(error: unknown, setError: UseFormSetError<TFieldValues>) {
	if (isValidationError(error)) {
		error.details.context.forEach((err) => {
			setError(err.field as Path<TFieldValues>, {
				type: 'server',
				message: err.message,
			});
		});
		return true;
	}
	return false;
}
