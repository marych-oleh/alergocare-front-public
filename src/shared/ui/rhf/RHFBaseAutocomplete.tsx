import { AutocompleteValue } from '@mui/material/useAutocomplete';
import { SyntheticEvent } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
	BaseAutocomplete,
	BaseAutocompleteProps,
} from '../autocomplete/BaseAutocomplete';
import { RHFFormControl, RHFFormControlProps } from './RHFFormControl';

export type RHFBaseAutocompleteProps<
	TOption,
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
	DisableClearable extends boolean | undefined = undefined,
	FreeSolo extends boolean | undefined = undefined,
> = Omit<
	BaseAutocompleteProps<TOption, Multiple, DisableClearable, FreeSolo>,
	'onChange' | 'value'
> &
	Omit<
		RHFFormControlProps<TFieldValues, TContext, TTransformedValues, TName>,
		'render' | 'onChange'
	> & {
		onChange?: (
			event: SyntheticEvent,
			value: AutocompleteValue<TOption, Multiple, DisableClearable, FreeSolo>
		) => AutocompleteValue<TOption, Multiple, DisableClearable, FreeSolo>;
	};

export const RHFBaseAutocomplete = <
	TOption,
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
	DisableClearable extends boolean | undefined = undefined,
	FreeSolo extends boolean | undefined = undefined,
>({
	name,
	control,
	rules,
	shouldUnregister,
	disabled,
	label,
	disableHelperText,
	required,

	options,
	multiple,
	onChange: externalOnChange,
	...rest
}: RHFBaseAutocompleteProps<
	TOption,
	TFieldValues,
	TContext,
	TTransformedValues,
	TName,
	Multiple,
	DisableClearable,
	FreeSolo
>) => {
	return (
		<RHFFormControl
			{...{
				name,
				control,
				rules,
				shouldUnregister,
				disabled,
				disableHelperText,
				label,
				required,
			}}
			render={({ field, fieldState }) => (
				<BaseAutocomplete
					{...rest}
					multiple={multiple}
					options={options}
					error={!!fieldState.error}
					value={field.value ?? ((multiple ? [] : null) as any)}
					onChange={(event, newValue) => {
						let finalValue = newValue;

						if (externalOnChange) {
							finalValue = externalOnChange(event, newValue);
						}

						// if (finalValue !== null) {
						field.onChange(finalValue);
						// }
					}}
				/>
			)}
		/>
	);
};
