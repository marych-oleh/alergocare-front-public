import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { TestingDrugChip } from './TestingDrugChip';
import { TestingTypeEnum } from '../model/testing-dictionaries';
import type { TestingRow } from '~/shared/api/endpoints/testing';

const baseTesting: Pick<TestingRow, 'type' | 'isPositive' | 'drug'> = {
	type: TestingTypeEnum.suspected,
	isPositive: true,
	drug: {
		id: '00000000-0000-0000-0000-000000000001',
		name: 'Амоксицилін',
		categoryId: '00000000-0000-0000-0000-000000000002',
	},
};

describe('TestingDrugChip', () => {
	it('renders the drug name', () => {
		render(<TestingDrugChip testing={baseTesting} />);
		expect(screen.getByText('Амоксицилін')).toBeInTheDocument();
	});

	it('renders with success color when isPositive', () => {
		render(<TestingDrugChip testing={baseTesting} />);
		const chip = document.querySelector('.MuiChip-colorSuccess');
		expect(chip).toBeInTheDocument();
	});

	it('renders with error color when not isPositive', () => {
		render(<TestingDrugChip testing={{ ...baseTesting, isPositive: false }} />);
		const chip = document.querySelector('.MuiChip-colorError');
		expect(chip).toBeInTheDocument();
	});

	it('renders outlined variant for alternative type', () => {
		render(
			<TestingDrugChip
				testing={{ ...baseTesting, type: TestingTypeEnum.alternative }}
			/>
		);
		const chip = document.querySelector('.MuiChip-outlined');
		expect(chip).toBeInTheDocument();
	});

	it('renders filled variant for suspected type', () => {
		render(<TestingDrugChip testing={baseTesting} />);
		const chip = document.querySelector('.MuiChip-filled');
		expect(chip).toBeInTheDocument();
	});
});
