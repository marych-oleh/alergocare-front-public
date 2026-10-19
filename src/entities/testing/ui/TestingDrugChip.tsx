import { Chip, ChipProps, alpha, useTheme } from '@mui/material';
import { TestingRow } from '~/shared/api/endpoints/testing';
import { TestingTypeEnum } from '../model/testing-dictionaries';

type TestingDrugChipProps = {
	testing: Pick<TestingRow, 'type' | 'isPositive' | 'drug'>;
} & Omit<ChipProps, 'label'>;

/**
 *
 * @param testing item to diplay information
 * @returns Chip element with drug name, color: `isPositive` ? 'success' : 'error' + apply variant if `type` is `alternative`
 */
export const TestingDrugChip = ({
	testing,
	sx,
	...props
}: TestingDrugChipProps) => {
	const { drug, isPositive, type } = testing;
	const theme = useTheme();

	const colorKey = isPositive ? 'success' : 'error';

	return (
		<Chip
			size="small"
			{...props}
			label={drug.name}
			color={colorKey}
			variant={type === TestingTypeEnum.alternative ? 'outlined' : 'filled'}
			sx={{
				'&:hover': {
					backgroundColor: alpha(theme.palette[colorKey].main, 0.2),
				},
				...sx,
			}}
		/>
	);
};
