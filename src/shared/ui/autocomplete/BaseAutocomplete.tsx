import {
	Autocomplete,
	AutocompleteProps,
	CircularProgress,
	TextField
} from '@mui/material';

export interface BaseAutocompleteProps<
	Value,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined,
> extends Omit<
	AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>,
	'renderInput'
> {
	label?: string;
	placeholder?: string;
	helperText?: string;
	error?: boolean;
}

export const BaseAutocomplete = <
	T,
	Multiple extends boolean | undefined = undefined,
	DisableClearable extends boolean | undefined = undefined,
	FreeSolo extends boolean | undefined = undefined,
>({
	label,
	placeholder,
	helperText,
	error,
	loading,
	...props
}: BaseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
	return (
		<Autocomplete
			{...props}
			disableCloseOnSelect={props.multiple}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					placeholder={placeholder}
					variant="outlined"
					error={error}
					helperText={helperText}
					slotProps={{
						input: {
							...params.InputProps,
							endAdornment: (
								<>
									{loading ?
										<CircularProgress color="inherit" size={20} />
									:	null}
									{params.InputProps.endAdornment}
								</>
							),
						},
					}}
				/>
			)}
		/>
	);
};
