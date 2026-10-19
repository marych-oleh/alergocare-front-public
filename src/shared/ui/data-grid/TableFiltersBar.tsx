import { Stack, StackProps } from '@mui/material';

export const TableFiltersBar = ({ children, sx, ...props }: StackProps) => {
	return (
		<Stack
			direction={{ xs: 'column', sm: 'row' }}
			justifyContent="space-between"
			alignItems={{ xs: 'stretch', sm: 'center' }}
			spacing={1}
			{...props}
		>
			{children}
		</Stack>
	);
};
