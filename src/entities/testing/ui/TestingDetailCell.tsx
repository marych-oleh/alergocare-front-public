import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Box,
	Chip,
	Divider,
	IconButton,
	Popover,
	Stack,
	Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { TestingRow } from '~/shared/api/endpoints/testing';
import { dateFormatters } from '~/shared/lib/date';
import { ChipList } from '~/shared/ui/ChipList/ChipList';
import { TestingStageDict } from '../model/testing-dictionaries';

export const TestingDetailCell = ({ row }: { row: TestingRow }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		// Prevent row selection or other grid events if needed
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? `testing-popover-${row.id}` : undefined;

	const stageLabel =
		row.finalStage && row.method ?
			TestingStageDict[row.method][row.finalStage]
		:	'Відсутня';

	return (
		<>
			<IconButton
				aria-describedby={id}
				onClick={handleClick}
				size="small"
				// Rotate icon slightly if open for extra UX polish
				sx={{
					transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
					transition: '0.2s',
				}}
			>
				<ExpandMoreIcon />
			</IconButton>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				slotProps={{
					paper: {
						elevation: 4,
						sx: { mt: 1, p: 2, minWidth: 300, borderRadius: 2 },
					},
				}}
			>
				<Stack spacing={1.5}>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="body2" color="text.secondary">
							Дата проведення тесту
						</Typography>
						<Typography variant="body2" fontWeight="medium">
							{dateFormatters.toUiDate(row.testingDate)}
						</Typography>
					</Stack>

					<Divider />

					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="body2" color="text.secondary">
							Результат:
						</Typography>
						<Chip
							color={row.isPositive ? 'success' : 'error'}
							label={row.isPositive ? 'Позитивний' : 'Негативний'}
							size="small"
						/>
					</Stack>

					{row.isPositive && (
						<>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
							>
								<Typography variant="body2" color="text.secondary">
									Спрацював на етапі:
								</Typography>
								<Typography variant="body2" fontWeight="medium">
									{stageLabel}
								</Typography>
							</Stack>

							<Divider />

							<Box>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ mb: 1 }}
								>
									Ускладнення
								</Typography>
								<ChipList
									items={row.complications}
									emptyText="Не вказано ніяке значення"
								/>
							</Box>
						</>
					)}
				</Stack>
			</Popover>
		</>
	);
};
