import { MenuItem, Select, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
	RHFFormControl,
	RHFFormControlProps,
} from '~/shared/ui/rhf/RHFFormControl';
import { DurationUnit, UNIT_LABELS, UNITS } from '../model/DurationUnits';

export const SymptomsDurationSelector = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
>(
	props: Omit<
		RHFFormControlProps<TFieldValues, any, TTransformedValues, TName>,
		'render'
	>
) => {
	return (
		<RHFFormControl
			{...props}
			render={({ field, fieldState }) => {
				const totalSeconds = Number(field.value) || 0;

				const [unit, setUnit] = useState<DurationUnit>(() => {
					if (totalSeconds > 0) {
						if (totalSeconds % UNITS.WEEKS === 0) return 'WEEKS';
						if (totalSeconds % UNITS.DAYS === 0) return 'DAYS';
						if (totalSeconds % UNITS.HOURS === 0) return 'HOURS';
					}
					return 'MINUTES';
				});

				const isEmpty =
					field.value === null ||
					field.value === undefined ||
					field.value === '';
				const amount = isEmpty ? '' : totalSeconds / UNITS[unit];

				const handleAmountChange = (val: string) => {
					if (val === '') {
						field.onChange(undefined);
						return;
					}
					const num = parseFloat(val) || 0;
					field.onChange(num * UNITS[unit]);
				};

				const handleUnitChange = (newUnit: DurationUnit) => {
					setUnit(newUnit);

					if (amount !== '') {
						const num = parseFloat(String(amount)) || 0;
						field.onChange(num * UNITS[newUnit]);
					}
				};

				return (
					<Stack direction="row" spacing={0}>
						<TextField
							type="number"
							size="small"
							fullWidth
							value={amount}
							onChange={(e) => handleAmountChange(e.target.value)}
							error={!!fieldState.error}
							sx={{
								'& .MuiOutlinedInput-root': {
									borderTopRightRadius: 0,
									borderBottomRightRadius: 0,
								},
							}}
							onBlur={field.onBlur}
							ref={field.ref}
						/>
						<Select
							size="small"
							value={unit}
							onChange={(e) =>
								handleUnitChange(e.target.value as DurationUnit)
							}
							sx={{
								width: '100px',
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 0,
								'& .MuiOutlinedInput-notchedOutline': {
									borderLeft: 'none',
								},
							}}
						>
							{Object.entries(UNIT_LABELS).map(([key, label]) => (
								<MenuItem key={key} value={key}>
									{label}
								</MenuItem>
							))}
						</Select>
					</Stack>
				);
			}}
		/>
	);
};
