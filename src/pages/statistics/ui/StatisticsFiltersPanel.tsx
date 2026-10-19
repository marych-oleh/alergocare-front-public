import { zodResolver } from '@hookform/resolvers/zod';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DrugAutocomplete } from '~/features/drug-manage';
import { StatisticsFilters } from '~/shared/api/endpoints/statistics';
import {
	defaultStatisticsFilters,
	StatisticsFiltersAPI,
	StatisticsFiltersInput,
	StatisticsFiltersSchema,
} from '~/shared/api/endpoints/statistics/statistics.schema';
import { UkraineDistrictAutocomplete } from '~/shared/ui/autocomplete/UkraineDistrictAutocomplete';
import { CalendarDatePicker } from '~/shared/ui/DatePicker/CalendarDatePicker';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import { RHFSelect } from '~/shared/ui/rhf/RHFSelect';
import { RHFTextField } from '~/shared/ui/rhf/RHFTextField';

interface StatisticsFiltersPanelProps {
	filters: StatisticsFilters;
	onChange: (filters: StatisticsFilters) => void;
}

const genderOptions = [
	{
		value: null,
		label: 'Всі',
	},
	{
		value: 'male',
		label: 'Чоловіки',
	},
	{
		value: 'female',
		label: 'Жінки',
	},
];

export function StatisticsFiltersPanel({
	filters,
	onChange,
}: StatisticsFiltersPanelProps) {
	const { control, reset, watch } = useForm<
		StatisticsFiltersInput,
		any,
		StatisticsFiltersAPI
	>({
		resolver: zodResolver(StatisticsFiltersSchema),
		defaultValues: defaultStatisticsFilters,
	});

	const activeCount = Object.values(filters).filter(
		(val) => val !== null && val !== undefined && val !== ''
	).length;

	useEffect(() => {
		let debounceTimer: NodeJS.Timeout;

		const subscription = watch((value) => {
			clearTimeout(debounceTimer);

			debounceTimer = setTimeout(() => {
				const parsed = StatisticsFiltersSchema.safeParse(value);
				if (parsed.success) {
					console.log(parsed.data);
					onChange(parsed.data);
				}
			}, 500);
		});

		return () => {
			subscription.unsubscribe();
			clearTimeout(debounceTimer);
		};
	}, [watch, onChange]);

	const handleReset = () => {
		reset(defaultStatisticsFilters);
		onChange(defaultStatisticsFilters);
	};

	return (
		<Card elevation={2} sx={{ mb: 3 }}>
			<CardContent>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={2}
				>
					<Stack direction="row" alignItems="center" spacing={1}>
						<Typography variant="subtitle1" fontWeight={600}>
							Фільтри
						</Typography>
						{activeCount > 0 && (
							<Chip
								label={`${activeCount} активних`}
								size="small"
								color="primary"
							/>
						)}
					</Stack>

					{activeCount > 0 && (
						<Button
							size="small"
							startIcon={<FilterAltOffIcon />}
							onClick={handleReset}
							color="inherit"
						>
							Скинути все
						</Button>
					)}
				</Stack>

				<Box
					component="form"
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						gap: 2,
						flexWrap: 'wrap',
					}}
				>
					<Box sx={{ minWidth: 220, flex: 1 }}>
						<EditableField
							disableBackground
							name="drugId"
							control={control}
							label="Препарат"
							renderEditMode={(props) => (
								<DrugAutocomplete multiple={false} {...props} />
							)}
						/>
					</Box>

					<Box sx={{ minWidth: 200, flex: 1 }}>
						<EditableField
							disableBackground
							name="districtCode"
							control={control}
							label="Область"
							renderEditMode={(props) => (
								<UkraineDistrictAutocomplete {...props} />
							)}
						/>
					</Box>

					<Box sx={{ minWidth: 150 }}>
						<EditableField
							disableBackground
							name="gender"
							control={control}
							label="Стать"
							renderEditMode={(props) => (
								<RHFSelect
									{...props}
									multiple={false}
									control={control}
									options={genderOptions}
								/>
							)}
						/>
					</Box>

					<Box sx={{ minWidth: 110 }}>
						<EditableField
							disableBackground
							name="ageFrom"
							control={control}
							label="Вік від"
							renderEditMode={(props) => (
								<RHFTextField
									{...props}
									type="number"
									size="small"
									slotProps={{
										htmlInput: { min: 0, max: 120 },
									}}
								/>
							)}
						/>
					</Box>

					<Box sx={{ minWidth: 110 }}>
						<EditableField
							disableBackground
							name="ageTo"
							control={control}
							label="Вік до"
							renderEditMode={(props) => (
								<RHFTextField
									{...props}
									type="number"
									size="small"
									slotProps={{
										htmlInput: { min: 0, max: 120 },
									}}
								/>
							)}
						/>
					</Box>

					<Box sx={{ minWidth: 160 }}>
						<EditableField
							disableBackground
							name="dateFrom"
							control={control}
							label="Дата від"
							renderEditMode={(props) => (
								<CalendarDatePicker
									size="small"
									disableFuture
									{...props}
								/>
							)}
						/>
					</Box>

					<Box sx={{ minWidth: 160 }}>
						<EditableField
							disableBackground
							name="dateTo"
							control={control}
							label="Дата до"
							renderEditMode={(props) => (
								<CalendarDatePicker
									size="small"
									disableFuture
									{...props}
								/>
							)}
						/>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}
