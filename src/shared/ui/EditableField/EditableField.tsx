import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
	Box,
	darken,
	FormHelperText,
	Stack,
	Typography,
	useColorScheme,
	useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import {
	Control,
	ControllerProps,
	FieldPath,
	FieldValues,
	useFormState,
	Watch,
	WatchValue,
} from 'react-hook-form';
import OutlinedIconButton from '../OutlinedIconButton/OutlinedIconButton';

const FieldErrorDisplay = <
	TFieldValues extends FieldValues = FieldValues,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	name,
	control,
}: {
	name: TName;
	control?: Control<TFieldValues, any, TTransformedValues>;
}) => {
	const { errors } = useFormState({ control, name });

	const error = errors[name] as any;

	if (!error?.message) return null;

	return (
		<FormHelperText error sx={{ mt: 1 }}>
			{error.message}
		</FormHelperText>
	);
};

export type EditableFieldContext<
	TFieldValues extends FieldValues = FieldValues,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	required: boolean;
	disableHelperText: boolean;
	control: Control<TFieldValues, any, TTransformedValues>;
} & Omit<
	ControllerProps<TFieldValues, TName, TTransformedValues>,
	'render' | 'defaultValue' | 'control'
>;

type EditableFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
	ControllerProps<TFieldValues, TName, TTransformedValues>,
	'render' | 'defaultValue' | 'control'
> & {
	control: Control<TFieldValues, any, TTransformedValues>;
	label: React.ReactElement | string;
	renderReadMode?: (
		value: WatchValue<TName, TFieldValues>
	) => React.ReactNode | string;
	renderEditMode: (
		context: EditableFieldContext<TFieldValues, TTransformedValues, TName>
	) => React.ReactNode;
	defaultEditing?: boolean;
	required?: boolean;
	disableBackground?: boolean;
};

export const EditableField = <
	TFieldValues extends FieldValues = FieldValues,
	TTransformedValues = TFieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	name,
	control,
	rules,
	shouldUnregister,
	disabled,

	label,
	renderEditMode,
	renderReadMode,
	defaultEditing = false,
	required = false,
	disableBackground = false,
}: EditableFieldProps<TFieldValues, TTransformedValues, TName>) => {
	const isAlwaysEditing = !renderReadMode;
	const [isEditing, setIsEditing] = useState(
		isAlwaysEditing || defaultEditing
	);
	const theme = useTheme();
	const colorMode = useColorScheme();
	const backgroundColor =
		colorMode.colorScheme === 'light' ?
			theme.palette.grey[50]
		:	theme.palette.grey[800];

	const toggleEdit = () => {
		if (!isAlwaysEditing) setIsEditing((prev) => !prev);
	};

	const editContext: EditableFieldContext<
		TFieldValues,
		TTransformedValues,
		TName
	> = {
		name,
		control,
		required,
		disableHelperText: true,
		rules,
		shouldUnregister,
		disabled,
	};

	const readModeRenderer = (
		<Watch
			control={control}
			name={name}
			exact
			render={(value) => {
				const readModeComponent = renderReadMode?.(value);

				return typeof readModeComponent === 'string' ?
						<Typography>{readModeComponent}</Typography>
					:	readModeComponent;
			}}
		/>
	);

	return (
		<Stack
			gap={{ xs: 0.5, md: 1 }}
			sx={{
				backgroundColor:
					!disableBackground ? backgroundColor : 'transparent',
				border:
					!disableBackground ?
						`1px solid ${theme.palette.divider}`
					:	'1px solid transparent',
				py: !disableBackground ? { xs: 1, sm: 1.5 } : 0,
				px: !disableBackground ? { xs: 1.25, sm: 2 } : 0,

				borderRadius: 1,
				transition: 'all 0.2s ease',
				'@media (hover: hover)': {
					'&:hover': {
						backgroundColor:
							!disableBackground ?
								darken(backgroundColor, 0.03)
							:	'transparent',
					},
				},
			}}
		>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				gap={1}
			>
				<Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
					{typeof label === 'string' ?
						<Typography variant="body2" fontWeight={500}>
							{label}
						</Typography>
					:	label}
					{required && (
						<Box
							component="span"
							sx={{
								color: 'error.main',
								fontWeight: 500,
								lineHeight: 1,
							}}
						>
							*
						</Box>
					)}
				</Box>

				{!isAlwaysEditing && (
					<OutlinedIconButton size="small" onClick={toggleEdit}>
						{isEditing ?
							<VisibilityIcon fontSize="small" />
						:	<EditIcon fontSize="small" />}
					</OutlinedIconButton>
				)}
			</Stack>

			<Box>{isEditing ? renderEditMode(editContext) : readModeRenderer}</Box>

			<FieldErrorDisplay name={name} control={control} />
		</Stack>
	);
};
