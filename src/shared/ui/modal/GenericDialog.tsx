import {
	Button,
	ButtonProps,
	Dialog,
	DialogActions,
	DialogActionsProps,
	DialogContent,
	DialogContentProps,
	DialogProps,
	DialogTitle,
	DialogTitleProps,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { ReactNode } from 'react';

// Styled DialogTitle component
export const StyledDialogTitle = ({
	children,
	...props
}: DialogTitleProps & { children: ReactNode }) => {
	const theme = useTheme();
	return (
		<DialogTitle
			sx={{
				py: 1,
				px: 1.5,
				[theme.breakpoints.down('sm')]: {
					fontSize: 14,
				},
				...props.sx,
			}}
			{...props}
		>
			{children}
		</DialogTitle>
	);
};

// Styled DialogContent component
export const StyledDialogContent = ({
	children,
	dividers = true,
	...props
}: DialogContentProps & { children: ReactNode }) => (
	<DialogContent
		dividers={dividers}
		sx={{
			borderTop: '2px solid var(--template-palette-divider)',
			borderBottom: '2px solid var(--template-palette-divider)',
			p: 0,
			...props.sx,
		}}
		{...props}
	>
		{children}
	</DialogContent>
);

// Styled DialogActions component
export const StyledDialogActions = ({
	children,
	...props
}: DialogActionsProps & { children: ReactNode }) => (
	<DialogActions
		sx={{
			py: 1,
			px: 1.5,
			...props.sx,
		}}
		{...props}
	>
		{children}
	</DialogActions>
);

export const DefaultDialogActions = ({
	children,
	onCancel,
	submitLabel = 'Зберегти',
	cancelLabel = 'Закрити',
	submitButtonProps = {},
	cancelButtonProps = {},
	...props
}: DialogActionsProps & {
	children?: ReactNode;
	onCancel: () => void;
	cancelLabel?: string;
	submitLabel?: string | false;
	submitButtonProps?: ButtonProps;
	cancelButtonProps?: ButtonProps;
}) => (
	<StyledDialogActions {...props}>
		{children}
		<Button variant="outlined" onClick={onCancel} {...cancelButtonProps}>
			{cancelLabel}
		</Button>
		{submitLabel && (
			<Button
				color="secondary"
				variant="contained"
				type="submit"
				{...submitButtonProps}
			>
				{submitLabel}
			</Button>
		)}
	</StyledDialogActions>
);

// Styled Dialog component
export const StyledDialog = ({
	children,
	...props
}: DialogProps & { children: ReactNode }) => (
	<Dialog
		{...props}
		slotProps={{
			...props.slotProps,
			paper: {
				...props.slotProps?.paper,
				sx: (theme) => ({
					backgroundImage: 'none',
					// @ts-ignore
					...props.slotProps?.paper?.sx,
					...(props.fullScreen && {
						borderRadius: '0 !important',
					}),
				}),
			},
		}}
	>
		{children}
	</Dialog>
);

export type GenericDialogProps = DialogProps;

export default function GenericDialog({
	open,
	children,
	onClose,
	fullWidth = true,
	scroll = 'paper',
	...props
}: GenericDialogProps) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<StyledDialog
			open={open}
			onClose={onClose}
			scroll={scroll}
			fullWidth={fullWidth}
			fullScreen={fullScreen}
			{...props}
		>
			{children}
		</StyledDialog>
	);
}
