import {
	Box,
	Checkbox,
	Chip,
	ListItemText,
	MenuItem,
	Select,
	SelectProps,
} from '@mui/material';
import { FieldPath, FieldValues } from 'react-hook-form';
import { RHFFormControl, RHFFormControlProps } from './RHFFormControl';

type Option = { value: string | number | null; label: string };

export type RHFSelectProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
> = Omit<
	RHFFormControlProps<TFieldValues, any, TTransformedValues, TName>,
	'render'
> &
	Omit<SelectProps, 'value' | 'onChange'> & {
		options: Option[];
		placeholder?: string;
	};

export const RHFSelect = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues,
>({
	name,
	control,
	rules,
	shouldUnregister,
	disabled,

	label,
	required,
	disableHelperText,

	options,
	multiple,
	placeholder,
	...rest
}: RHFSelectProps<TFieldValues, TName, TTransformedValues>) => {
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
				const value =
					multiple ?
						Array.isArray(field.value) ?
							field.value
						:	[]
					:	(field.value ?? '');

				return (
					<Select
						{...rest}
						multiple={multiple}
						value={value}
						error={!!fieldState.error}
						displayEmpty={!!placeholder}
						onChange={(e) => {
							if (multiple) {
								field.onChange(e.target.value);
								return;
							}

							const selected = options.find(
								(o) => (o.value ?? '') === e.target.value
							);
							field.onChange(selected ? selected.value : e.target.value);
						}}
						required={required}
						renderValue={
							multiple || placeholder ?
								(selected: string | (string | number)[] | null) => {
									const isEmpty =
										multiple ?
											Array.isArray(selected) &&
											selected.length === 0
										:	selected === '' || selected == null;

									if (isEmpty && placeholder) {
										return (
											<em style={{ opacity: 0.6 }}>{placeholder}</em>
										);
									}

									if (multiple) {
										return (
											<Box
												sx={{
													display: 'flex',
													flexWrap: 'wrap',
													gap: 0.5,
													py: 0.5,
												}}
											>
												{(selected as (string | number)[]).map(
													(val) => {
														const optionLabel =
															options.find(
																(o) => o.value === val
															)?.label || val;
														return (
															<Chip
																key={optionLabel}
																label={optionLabel}
																size="small"
															/>
														);
													}
												)}
											</Box>
										);
									}

									const selectedOption = options.find(
										(o) => o.value === selected
									);
									return selectedOption ?
											selectedOption.label
										:	(selected as string);
								}
							:	undefined
						}
					>
						{options.map((option) => (
							<MenuItem
								key={option.value ?? ''}
								value={option.value ?? ''}
							>
								{multiple && (
									<Checkbox
										size="small"
										checked={(value as (string | number)[]).includes(
											option.value ?? ''
										)}
									/>
								)}
								<ListItemText primary={option.label} />
							</MenuItem>
						))}
					</Select>
				);
			}}
		/>
	);
};
