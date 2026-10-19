import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { ExaminationRecordsViewer } from './ExaminationRecordsViewer';

describe('ExaminationRecordsViewer', () => {
	it('shows empty message when no records', () => {
		render(<ExaminationRecordsViewer records={[]} />);
		expect(screen.getByText('Немає даних про обстеження')).toBeInTheDocument();
	});

	it('shows empty message when records is undefined', () => {
		render(<ExaminationRecordsViewer records={undefined} />);
		expect(screen.getByText('Немає даних про обстеження')).toBeInTheDocument();
	});

	it('renders records when provided', () => {
		const records = [
			{ examination: { id: '123e4567-e89b-42d3-a456-426614174010', name: 'Аналіз крові', type: 'text' }, result: 'Норма' },
		];
		render(<ExaminationRecordsViewer records={records as any} />);
		expect(screen.getByText('Аналіз крові')).toBeInTheDocument();
		expect(screen.getByText('Норма')).toBeInTheDocument();
	});

	it('renders multiple records', () => {
		const records = [
			{ examination: { id: '123e4567-e89b-42d3-a456-426614174010', name: 'Тест 1', type: 'text' }, result: 'Позитивний' },
			{ examination: { id: '123e4567-e89b-42d3-a456-426614174011', name: 'Тест 2', type: 'text' }, result: 'Негативний' },
		];
		render(<ExaminationRecordsViewer records={records as any} />);
		expect(screen.getByText('Тест 1')).toBeInTheDocument();
		expect(screen.getByText('Тест 2')).toBeInTheDocument();
	});

	it('handles null examination gracefully', () => {
		const records = [{ examination: null, result: 'Результат' }];
		render(<ExaminationRecordsViewer records={records as any} />);
		expect(screen.getByText('Невідоме обстеження')).toBeInTheDocument();
	});
});
