import { AutocompleteValue } from '@mui/material/useAutocomplete';
import { useMemo } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
	BaseAutocomplete,
	BaseAutocompleteProps,
} from '../autocomplete/BaseAutocomplete';
import { RHFFormControl, RHFFormControlProps } from './RHFFormControl';

interface DictionaryOption {
	code: string;
	label: string;
}

export type RHFStaticAutocompleteProps<
	TOption extends DictionaryOption,
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
	DisableClearable extends boolean | undefined = undefined,
> = Omit<
	BaseAutocompleteProps<TOption, Multiple, DisableClearable, false>,
	'value'
> &
	Omit<
		RHFFormControlProps<TFieldValues, TContext, TTransformedValues, TName>,
		'render' | 'onChange'
	>;

export const RHFStaticAutocomplete = <
	TOption extends DictionaryOption,
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
	DisableClearable extends boolean | undefined = undefined,
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
	onChange: externalOnChange,
	multiple,
	...rest
}: RHFStaticAutocompleteProps<
	TOption,
	TFieldValues,
	TContext,
	TTransformedValues,
	TName,
	Multiple,
	DisableClearable
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
			render={({ field, fieldState }) => {
				const mappedValue = useMemo(() => {
					if (multiple && Array.isArray(field.value)) {
						return options.filter((opt) =>
							field.value.includes(opt.code)
						);
					}
					return options.find((opt) => opt.code === field.value) ?? null;
				}, [field.value, options, multiple]);

				return (
					<BaseAutocomplete
						{...rest}
						multiple={multiple}
						options={options}
						value={
							mappedValue as AutocompleteValue<
								TOption,
								Multiple,
								DisableClearable,
								false
							>
						}
						error={!!fieldState.error}
						getOptionLabel={(option) => (option as TOption).label || ''}
						isOptionEqualToValue={(option, val) => {
							if (val === null) return false;
							const valCode =
								typeof val === 'string' ? val : (val as TOption).code;
							return (option as TOption).code === valCode;
						}}
						onChange={(e, newValue, r) => {
							const valueToSave =
								Array.isArray(newValue) ?
									newValue.map((v) => (v as TOption).code)
								:	((newValue as TOption)?.code ?? null);

							field.onChange(valueToSave);
							externalOnChange?.(e, newValue, r);
						}}
					/>
				);
			}}
		/>
	);
};
