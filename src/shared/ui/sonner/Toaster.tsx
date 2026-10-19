import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { useColorScheme } from '@mui/material/styles';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
	const { colorScheme } = useColorScheme();

	return (
		<Sonner
			theme={colorScheme as ToasterProps['theme']}
			className="toaster group"
			icons={{
				success: (
					<CheckCircleOutlinedIcon sx={{ fontSize: 20 }} color="success" />
				),
				info: <InfoOutlinedIcon sx={{ fontSize: 20 }} color="info" />,
				warning: (
					<WarningAmberOutlinedIcon
						sx={{ fontSize: 20 }}
						color="warning"
					/>
				),
				error: <ErrorOutlineIcon sx={{ fontSize: 20 }} color="error" />,
				loading: <CircularProgress sx={{ fontSize: 20 }} />,
			}}
			style={
				{
					'--normal-bg': 'var(--template-palette-background-paper)',
					'--normal-text': 'var(--template-palette-text-primary)',
					'--normal-border': 'var(--template-palette-divider)',
					'--border-radius': 'var(--template-shape-borderRadius)',
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast: 'cn-toast',
				},
				duration: 2500,
			}}
			position="top-left"
			{...props}
		/>
	);
};

export { Toaster };
