import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../test-utils';
import { TestingCreateModal } from './TestingCreateModal';

const CASE_ID = '123e4567-e89b-42d3-a456-426614174002';

describe('TestingCreateModal', () => {
	it('renders title when open', () => {
		render(<TestingCreateModal open caseId={CASE_ID} onClose={vi.fn()} formId="test-form" />);
		expect(screen.getByText('Нове тестування')).toBeInTheDocument();
	});

	it('renders drug field', () => {
		render(<TestingCreateModal open caseId={CASE_ID} onClose={vi.fn()} formId="test-form" />);
		expect(screen.getByText('Препарат')).toBeInTheDocument();
	});

	it('renders result field', () => {
		render(<TestingCreateModal open caseId={CASE_ID} onClose={vi.fn()} formId="test-form" />);
		expect(screen.getByText('Результат тестування')).toBeInTheDocument();
	});

	it('renders method field', () => {
		render(<TestingCreateModal open caseId={CASE_ID} onClose={vi.fn()} formId="test-form" />);
		expect(screen.getByText('Спосіб')).toBeInTheDocument();
	});

	it('renders create button', async () => {
		render(<TestingCreateModal open caseId={CASE_ID} onClose={vi.fn()} formId="test-form" />);
		expect(await screen.findByText(/Створити тестування/i, {}, { timeout: 3000 })).toBeInTheDocument();
	});
});
