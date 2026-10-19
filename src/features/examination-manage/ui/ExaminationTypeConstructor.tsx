import {
	Box,
	createFilterOptions,
	FormControl,
	FormHelperText,
	FormLabel,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import React, { useMemo } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { BaseAutocomplete } from '~/shared/ui/autocomplete/BaseAutocomplete';

interface ExaminationTypeConstructorProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
}

const filter = createFilterOptions<string>();

export const ExaminationTypeConstructor = <T extends FieldValues>({
	name,
	control,
}: ExaminationTypeConstructorProps<T>) => {
	const {
		field: { value, onChange },
		fieldState: { error },
	} = useController({ name, control });

	const currentValues = Array.isArray(value) ? (value as string[]) : [];
	const isNumericMode =
		currentValues.length === 1 && currentValues[0] === 'number';
	const activeMode = isNumericMode ? 'number' : 'options';

	const handleModeChange = (
		_: React.MouseEvent<HTMLElement>,
		newMode: 'number' | 'options' | null
	) => {
		if (!newMode) return;

		if (newMode === 'number') {
			onChange(['number']); // Lock to backend numeric signature
		} else {
			onChange([]); // Reset to empty option list for user input
		}
	};

	// Filter out 'number' safely if it leaked into the list rendering options
	const optionsListValues = useMemo(() => {
		return currentValues.filter((v) => v !== 'number');
	}, [currentValues]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				width: '100%',
				mt: 1,
			}}
		>
			<FormControl fullWidth error={!!error}>
				<FormLabel sx={{ mb: 1 }}>Тип результату обстеження</FormLabel>
				<ToggleButtonGroup
					value={activeMode}
					exclusive
					onChange={handleModeChange}
					size="small"
					fullWidth
					color="primary"
				>
					<ToggleButton value="number">Числове значення</ToggleButton>
					<ToggleButton value="options">
						Перелік варіантів (Enum)
					</ToggleButton>
				</ToggleButtonGroup>
			</FormControl>

			{activeMode === 'options' && (
				<BaseAutocomplete
					multiple
					freeSolo
					options={[] as string[]}
					value={optionsListValues}
					onChange={(_, newValue) => {
						onChange(
							newValue.map((val) =>
								typeof val === 'string' ? val.trim() : val
							)
						);
					}}
					filterOptions={(options, params) => {
						const filtered = filter(options, params);
						const { inputValue } = params;

						const isExisting = optionsListValues.some(
							(val) =>
								val.toLowerCase() === inputValue.trim().toLowerCase()
						);

						if (inputValue !== '' && !isExisting) {
							filtered.push(inputValue);
						}

						return filtered;
					}}
					renderOption={(props, option) => {
						const { key, ...optionProps } = props;
						return (
							<li key={key} {...optionProps}>
								{option}
							</li>
						);
					}}
				/>
			)}

			{activeMode === 'number' && error && (
				<FormHelperText error>{error.message}</FormHelperText>
			)}
		</Box>
	);
};
