import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test-utils';
import GenericDialog, {
	ConfirmationDialog as _Conf,
	DefaultDialogActions,
	StyledDialog,
	StyledDialogContent,
	StyledDialogTitle,
} from './GenericDialog';

// ConfirmationDialog is in a separate file but re-uses GenericDialog components
import { ConfirmationDialog } from './ConfirmationDialog';

describe('GenericDialog', () => {
	it('renders children when open', () => {
		render(
			<GenericDialog open onClose={() => {}}>
				<div>Вміст діалогу</div>
			</GenericDialog>
		);
		expect(screen.getByText('Вміст діалогу')).toBeInTheDocument();
	});

	it('does not render children when closed', () => {
		render(
			<GenericDialog open={false} onClose={() => {}}>
				<div>Прихований вміст</div>
			</GenericDialog>
		);
		expect(screen.queryByText('Прихований вміст')).not.toBeInTheDocument();
	});
});

describe('StyledDialogTitle', () => {
	it('renders title text', () => {
		render(
			<StyledDialog open onClose={() => {}}>
				<StyledDialogTitle>Заголовок</StyledDialogTitle>
			</StyledDialog>
		);
		expect(screen.getByText('Заголовок')).toBeInTheDocument();
	});
});

describe('StyledDialogContent', () => {
	it('renders content', () => {
		render(
			<StyledDialog open onClose={() => {}}>
				<StyledDialogContent>Контент</StyledDialogContent>
			</StyledDialog>
		);
		expect(screen.getByText('Контент')).toBeInTheDocument();
	});
});

describe('DefaultDialogActions', () => {
	it('renders cancel and submit buttons', () => {
		render(
			<DefaultDialogActions
				onCancel={() => {}}
				submitLabel="Зберегти"
				cancelLabel="Скасувати"
			/>
		);
		expect(screen.getByText('Зберегти')).toBeInTheDocument();
		expect(screen.getByText('Скасувати')).toBeInTheDocument();
	});

	it('calls onCancel when cancel button clicked', () => {
		const onCancel = vi.fn();
		render(
			<DefaultDialogActions onCancel={onCancel} cancelLabel="Закрити" />
		);
		fireEvent.click(screen.getByText('Закрити'));
		expect(onCancel).toHaveBeenCalledOnce();
	});

	it('does not render submit button when submitLabel is false', () => {
		render(
			<DefaultDialogActions
				onCancel={() => {}}
				submitLabel={false}
				cancelLabel="Закрити"
			/>
		);
		expect(screen.queryByRole('button', { name: /зберегти/i })).toBeNull();
	});

	it('renders custom children', () => {
		render(
			<DefaultDialogActions onCancel={() => {}}>
				<span>Додатковий контент</span>
			</DefaultDialogActions>
		);
		expect(screen.getByText('Додатковий контент')).toBeInTheDocument();
	});
});

describe('ConfirmationDialog', () => {
	it('renders title and description when open', () => {
		render(
			<ConfirmationDialog
				open
				title="Видалити?"
				description="Цю дію неможливо скасувати."
				onClose={() => {}}
				onConfirm={() => {}}
			/>
		);
		expect(screen.getByText('Видалити?')).toBeInTheDocument();
		expect(screen.getByText('Цю дію неможливо скасувати.')).toBeInTheDocument();
	});

	it('renders default button labels', () => {
		render(
			<ConfirmationDialog
				open
				title="Видалити?"
				onClose={() => {}}
				onConfirm={() => {}}
			/>
		);
		expect(screen.getByText('Видалити')).toBeInTheDocument();
		expect(screen.getByText('Скасувати')).toBeInTheDocument();
	});

	it('calls onClose when cancel clicked', () => {
		const onClose = vi.fn();
		render(
			<ConfirmationDialog
				open
				title="Видалити?"
				onClose={onClose}
				onConfirm={() => {}}
			/>
		);
		fireEvent.click(screen.getByText('Скасувати'));
		expect(onClose).toHaveBeenCalledOnce();
	});

	it('calls onConfirm when confirm clicked', () => {
		const onConfirm = vi.fn();
		render(
			<ConfirmationDialog
				open
				title="Видалити?"
				onClose={() => {}}
				onConfirm={onConfirm}
			/>
		);
		fireEvent.click(screen.getByText('Видалити'));
		expect(onConfirm).toHaveBeenCalledOnce();
	});

	it('renders custom children inside content', () => {
		render(
			<ConfirmationDialog
				open
				title="Підтвердіть"
				onClose={() => {}}
				onConfirm={() => {}}
			>
				<span>Спеціальний вміст</span>
			</ConfirmationDialog>
		);
		expect(screen.getByText('Спеціальний вміст')).toBeInTheDocument();
	});
});
