import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Menu, MenuItem, Typography } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useMemo, useRef, useState } from 'react';
import { FieldPath, FieldValues, useWatch } from 'react-hook-form';
import { BaseOption } from '~/shared/api/common';
import {
	RHFBaseAutocomplete,
	RHFBaseAutocompleteProps,
} from '../rhf/RHFBaseAutocomplete';

export type GenericDictionaryAutocompleteProps<
	TOption extends BaseOption,
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = undefined,
	DisableClearable extends boolean | undefined = undefined,
	FreeSolo extends boolean | undefined = undefined,
> = {
	onCreateRequest?: (inputValue: string) => void;
	onEditRequest?: (option: TOption) => void;
	onDeleteRequest?: (option: TOption) => void;
} & Omit<
	RHFBaseAutocompleteProps<
		TOption,
		TFieldValues,
		TContext,
		TTransformedValues,
		TName,
		Multiple,
		DisableClearable,
		FreeSolo
	>,
	| 'onChange'
	| 'getOptionLabel'
	| 'filterOptions'
	| 'renderOption'
	| 'onClose'
	| 'open'
	| 'onOpen'
>;

const filter = createFilterOptions<any>();

export const GenericDictionaryAutocomplete = <
	TOption extends BaseOption,
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	Multiple extends boolean | undefined = false,
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

	options,

	onCreateRequest,
	onEditRequest,
	onDeleteRequest,

	...selectProps
}: GenericDictionaryAutocompleteProps<
	TOption,
	TFieldValues,
	TContext,
	TTransformedValues,
	TName,
	Multiple,
	DisableClearable,
	FreeSolo
>) => {
	const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState<{
		mouseX: number;
		mouseY: number;
	} | null>(null);
	const [targetOption, setTargetOption] = useState<TOption | null>(null);
	const touchTimer = useRef<NodeJS.Timeout>(null);

	const selectedValues = useWatch({ control, name });

	const filteredOptions = useMemo(() => {
		if (!selectedValues) return options;

		if (selectProps.multiple && Array.isArray(selectedValues)) {
			const selectedIds = new Set(
				selectedValues.map((item: any) => item?.id)
			);
			return options.filter((option) => !selectedIds.has(option.id));
		}

		// Single select logic
		const selectedId = (selectedValues as any)?.id;
		if (selectedId) {
			return options.filter((option) => option.id !== selectedId);
		}

		return options;
	}, [options, selectedValues, selectProps.multiple]);

	const handleMenuOpen = (
		e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
		option: TOption
	) => {
		e.stopPropagation();
		e.preventDefault();
		if ('clientX' in e) {
			// Mouse Event
			setMenuPosition({ mouseX: e.clientX, mouseY: e.clientY });
		} else if (e.touches && e.touches.length > 0) {
			// Touch Event (Mobile)
			setMenuPosition({
				mouseX: e.touches[0].clientX,
				mouseY: e.touches[0].clientY,
			});
		}
		setTargetOption(option);
	};

	const handleMenuClose = () => setMenuPosition(null);

	return (
		<>
			<RHFBaseAutocomplete
				disableCloseOnSelect
				{...selectProps}
				{...{
					name,
					control,
					rules,
					shouldUnregister,
					disabled,
					disableHelperText,
					label,
				}}
				open={isAutocompleteOpen}
				onOpen={() => setIsAutocompleteOpen(true)}
				onClose={(event, reason) => {
					// IGNORE the close event if it's caused by opening custome context menu
					if (reason === 'blur' && menuPosition) return;
					setIsAutocompleteOpen(false);
				}}
				options={filteredOptions}
				getOptionLabel={(option) => {
					if (typeof option === 'string') return option;
					return option.inputValue || option.name;
				}}
				filterOptions={(opts, params) => {
					const filtered = filter(opts, params);
					const { inputValue } = params;
					const isExisting = opts.some((opt) => inputValue === opt.name);

					if (inputValue !== '' && !isExisting && onCreateRequest) {
						filtered.push({
							inputValue,
							name: `Створити "${inputValue}"`,
						} as TOption);
					}
					return filtered;
				}}
				renderOption={(props, option) => {
					const isCreationOption = !!option.inputValue;
					const hasActions =
						!isCreationOption && (onEditRequest || onDeleteRequest);

					return (
						<li
							{...props}
							key={option.id ?? option.name}
							onContextMenu={(e) => {
								if (hasActions) handleMenuOpen(e, option);
							}}
							onTouchStart={(e) => {
								if (!hasActions) return;
								touchTimer.current = setTimeout(
									() => handleMenuOpen(e, option),
									500
								);
							}}
							onTouchEnd={() =>
								touchTimer.current && clearTimeout(touchTimer.current)
							}
							onTouchMove={() =>
								touchTimer.current && clearTimeout(touchTimer.current)
							}
						>
							<Typography sx={{ width: '100%', userSelect: 'none' }}>
								{option.name}
							</Typography>
						</li>
					);
				}}
				onChange={(_: any, newValue: any) => {
					const processValue = (val: any) => {
						if (val?.inputValue && onCreateRequest) {
							onCreateRequest(val.inputValue);
							return null;
						}
						return val;
					};

					if (selectProps.multiple && Array.isArray(newValue)) {
						return newValue.map(processValue).filter(Boolean);
					}
					return processValue(newValue);
				}}
			/>

			<Menu
				keepMounted
				open={menuPosition !== null}
				onClose={handleMenuClose}
				anchorReference="anchorPosition"
				anchorPosition={
					menuPosition !== null ?
						{ top: menuPosition.mouseY, left: menuPosition.mouseX }
					:	undefined
				}
				onClick={(e) => e.stopPropagation()}
				// zIndex must be higher then in autocomplete dropdown list
				sx={(theme) => ({ zIndex: theme.zIndex.tooltip })}
			>
				{onEditRequest && (
					<MenuItem
						onClick={(e) => {
							e.stopPropagation();
							handleMenuClose();
							if (targetOption) onEditRequest(targetOption);
						}}
					>
						<EditIcon fontSize="small" sx={{ mr: 1 }} /> Редагувати
					</MenuItem>
				)}

				{onDeleteRequest && (
					<MenuItem
						sx={{ color: 'error.main' }}
						onClick={(e) => {
							e.stopPropagation();
							handleMenuClose();
							if (targetOption) onDeleteRequest(targetOption);
						}}
					>
						<DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Видалити
					</MenuItem>
				)}
			</Menu>
		</>
	);
};
