import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test-utils';
import { useForm } from 'react-hook-form';
import { TestingStageSelect } from './TestingStageSelect';

function TestForm({ methodValue }: { methodValue?: 'skin' | 'challenge' }) {
	const { control } = useForm({ defaultValues: { stage: '' } });
	return <TestingStageSelect name="stage" control={control} label="Стадія" methodValue={methodValue} />;
}

describe('TestingStageSelect', () => {
	it('shows hint when no method selected', () => {
		render(<TestForm />);
		expect(screen.getByText(/Оберіть спосіб/)).toBeInTheDocument();
	});

	it('renders radio options for skin method', () => {
		render(<TestForm methodValue="skin" />);
		expect(screen.getAllByRole('radio').length).toBeGreaterThan(0);
	});

	it('renders radio options for challenge method', () => {
		render(<TestForm methodValue="challenge" />);
		expect(screen.getAllByRole('radio').length).toBeGreaterThan(0);
	});
});
