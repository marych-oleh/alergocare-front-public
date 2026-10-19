import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export type StatisticValueCardProps = {
	label: string;
	value?: string | number;
	sub?: string;
	icon: React.ReactNode;
	color: string;
	isLoading?: boolean;
};

export function StatisticValueCard({
	label,
	value,
	sub,
	icon,
	color,
	isLoading = false,
}: StatisticValueCardProps) {
	return (
		<Card
			elevation={0}
			sx={{
				border: '1px solid',
				borderColor: 'divider',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				px: 1.5,
				py: 2,
			}}
		>
			<CardContent>
				<Stack direction="row" spacing={1.5} alignItems="center">
					<Box
						sx={{
							borderRadius: 2,
							color,
							display: 'flex',
						}}
					>
						{icon}
					</Box>
					<Box>
						<Typography variant="h5" fontWeight={700} lineHeight={1.2}>
							{isLoading ?
								<Skeleton
									variant="text"
									sx={{ fontSize: '1rem', lineHeight: 1.2 }}
								/>
							:	value}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{label}
						</Typography>
						{sub && (
							<Typography
								lineHeight={1}
								variant="caption"
								color="text.disabled"
							>
								{sub}
							</Typography>
						)}
					</Box>
				</Stack>
			</CardContent>
		</Card>
	);
}
