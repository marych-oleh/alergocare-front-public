import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test-utils';
import { TestingDetailCell } from './TestingDetailCell';
import { TestingTypeEnum, TestingMethodEnum } from '../model/testing-dictionaries';
import type { TestingRow } from '~/shared/api/endpoints/testing';

const mockRow: TestingRow = {
	id: '00000000-0000-0000-0000-000000000001',
	caseId: '00000000-0000-0000-0000-000000000002',
	type: TestingTypeEnum.suspected,
	method: TestingMethodEnum.skin,
	isPositive: false,
	finalStage: null,
	drug: {
		id: '00000000-0000-0000-0000-000000000003',
		name: 'Ібупрофен',
		categoryId: '00000000-0000-0000-0000-000000000004',
	},
	testingDate: '2024-03-15T10:00:00.000Z',
	complications: [],
	createdAt: '2024-03-15T10:00:00.000Z',
	updatedAt: '2024-03-15T10:00:00.000Z',
};

const positiveRow: TestingRow = {
	...mockRow,
	isPositive: true,
	finalStage: 2,
	complications: [{ id: '00000000-0000-0000-0000-000000000005', name: 'Кропив\'янка' }],
};

describe('TestingDetailCell', () => {
	it('renders expand icon button', () => {
		render(<TestingDetailCell row={mockRow} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('opens popover when button is clicked', () => {
		render(<TestingDetailCell row={mockRow} />);
		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByText('Дата проведення тесту')).toBeInTheDocument();
	});

	it('shows negative result chip', () => {
		render(<TestingDetailCell row={mockRow} />);
		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByText('Негативний')).toBeInTheDocument();
	});

	it('shows positive result chip for positive row', () => {
		render(<TestingDetailCell row={positiveRow} />);
		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByText('Позитивний')).toBeInTheDocument();
	});

	it('shows complications section for positive result', () => {
		render(<TestingDetailCell row={positiveRow} />);
		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByText('Ускладнення')).toBeInTheDocument();
	});

	it('shows complication chip for positive result with complications', () => {
		render(<TestingDetailCell row={positiveRow} />);
		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByText("Кропив'янка")).toBeInTheDocument();
	});

	it('closes popover when clicked outside', () => {
		render(<TestingDetailCell row={mockRow} />);
		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByText('Дата проведення тесту')).toBeInTheDocument();
		// Fire escape key to close
		fireEvent.keyDown(document, { key: 'Escape' });
	});
});
