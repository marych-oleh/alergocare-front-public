import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { ChipList } from './ChipList';

describe('ChipList', () => {
	it('renders "Не вказано" when items is empty', () => {
		render(<ChipList items={[]} />);
		expect(screen.getByText('Не вказано')).toBeInTheDocument();
	});

	it('renders custom emptyText when items is empty', () => {
		render(<ChipList items={[]} emptyText="Нічого немає" />);
		expect(screen.getByText('Нічого немає')).toBeInTheDocument();
	});

	it('renders "Не вказано" when items is undefined', () => {
		render(<ChipList />);
		expect(screen.getByText('Не вказано')).toBeInTheDocument();
	});

	it('renders chips for string items', () => {
		render(<ChipList items={['Алергія', 'Астма']} />);
		expect(screen.getByText('Алергія')).toBeInTheDocument();
		expect(screen.getByText('Астма')).toBeInTheDocument();
	});

	it('uses getLabel when provided', () => {
		const items = [{ id: 1, title: 'Ускладнення' }];
		render(<ChipList items={items} getLabel={(item) => item.title} />);
		expect(screen.getByText('Ускладнення')).toBeInTheDocument();
	});

	it('renders label from "name" property when no getLabel', () => {
		const items = [{ name: 'Симптом 1' }];
		render(<ChipList items={items} />);
		expect(screen.getByText('Симптом 1')).toBeInTheDocument();
	});

	it('falls back to JSON.stringify for unknown object shape', () => {
		const items = [{ unknown: 'field' }];
		render(<ChipList items={items} />);
		expect(screen.getByText(JSON.stringify(items[0]))).toBeInTheDocument();
	});

	it('renders multiple chips', () => {
		render(<ChipList items={['A', 'B', 'C']} />);
		expect(document.querySelectorAll('.MuiChip-root').length).toBe(3);
	});
});
