import GenericDialog, {
	DefaultDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
} from '~/shared/ui/modal/GenericDialog';
import {
	PatientsTableWidget,
	PatientsTableWidgetProps,
} from './PatientsTableWidget';

type PatientsTableModalWidgetProps = PatientsTableWidgetProps & {
	title: string;
	open: boolean;
	onClose: () => void;
};

export const PatientsTableModalWidget = ({
	open,
	onClose,
	title,
	...props
}: PatientsTableModalWidgetProps) => {
	return (
		<GenericDialog
			open={open}
			onClose={onClose}
			fullScreen={true}
		>
			<StyledDialogTitle>{title}</StyledDialogTitle>
			<StyledDialogContent sx={{ py: 1, px: 1 }}>
				<PatientsTableWidget {...props} />
			</StyledDialogContent>
			<DefaultDialogActions onCancel={onClose} submitLabel={false} />
		</GenericDialog>
	);
};
