import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test-utils';
import { DictionaryFormModal } from './DictionaryFormModal';
import { z } from 'zod';

const TestSchema = z.object({ name: z.string().min(1) });

describe('DictionaryFormModal', () => {
	it('renders when open', () => {
		render(
			<DictionaryFormModal
				open
				onClose={vi.fn()}
				onSubmit={vi.fn()}
				isPending={false}
				title="Новий елемент"
				schema={TestSchema}
				defaultValues={{ name: '' }}
			/>
		);
		expect(screen.getByText('Новий елемент')).toBeInTheDocument();
	});

	it('does not render when closed', () => {
		render(
			<DictionaryFormModal
				open={false}
				onClose={vi.fn()}
				onSubmit={vi.fn()}
				isPending={false}
				title="Test"
				schema={TestSchema}
				defaultValues={{ name: '' }}
			/>
		);
		expect(screen.queryByText('Test')).not.toBeInTheDocument();
	});

	it('renders name input when open', () => {
		render(
			<DictionaryFormModal
				open
				onClose={vi.fn()}
				onSubmit={vi.fn()}
				isPending={false}
				title="Modal"
				schema={TestSchema}
				defaultValues={{ name: 'Initial' }}
			/>
		);
		expect(screen.getByDisplayValue('Initial')).toBeInTheDocument();
	});
});
