import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

export function ChartCard({
	title,
	height = 280,
	children,
}: {
	title: string;
	height?: number;
	children: React.ReactNode;
}) {
	return (
		<Card
			elevation={0}
			sx={{
				border: '1px solid',
				borderColor: 'divider',
				height: '100%',
				p: { xs: 1, sm: 2 },
			}}
		>
			<CardHeader
				title={title}
				slotProps={{
					title: { variant: 'subtitle1', fontWeight: 600 },
				}}
				sx={{ pb: 1.5 }}
			/>
			<CardContent sx={{ height, width: '100%' }}>{children}</CardContent>
		</Card>
	);
}
