import { Box, Chip, Typography } from '@mui/material';

interface ChipListProps<T> {
	items?: T[];
	getLabel?: (item: T) => string;
	emptyText?: string;
}

export function ChipList<T>({
	items,
	getLabel,
	emptyText = 'Не вказано',
}: ChipListProps<T>) {
	const resolveLabel = (item: T): string => {
		if (getLabel) return getLabel(item);

		if (typeof item === 'object' && item !== null) {
			if ('name' in item && typeof (item as any).name === 'string') {
				return (item as any).name;
			}
			return JSON.stringify(item);
		}

		return String(item ?? '');
	};

	if (!items || items.length === 0) {
		return (
			<Typography
				variant="body2"
				color="text.secondary"
				sx={{ fontStyle: 'italic' }}
			>
				{emptyText}
			</Typography>
		);
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: 1,
				mt: 0.5, // Small gap from the label
			}}
		>
			{items.map((item, index) => (
				<Chip key={index} label={resolveLabel(item)} size="small" />
			))}
		</Box>
	);
}
