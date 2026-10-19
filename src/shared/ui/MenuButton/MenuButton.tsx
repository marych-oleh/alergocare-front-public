import Badge, { badgeClasses } from '@mui/material/Badge';
import { type IconButtonProps } from '@mui/material/IconButton';
import OutlinedIconButton from '../OutlinedIconButton/OutlinedIconButton';

export interface MenuButtonProps extends IconButtonProps {
	showBadge?: boolean;
	badgeContent?: number;
}

export default function MenuButton({
	showBadge = false,
	badgeContent,
	...props
}: MenuButtonProps) {
	return (
		<Badge
			color="error"
			variant={badgeContent ? 'standard' : 'dot'}
			invisible={!showBadge}
			showZero={showBadge}
			badgeContent={badgeContent}
			sx={{ [`& .${badgeClasses.badge}`]: { right: 1, top: 2 } }}
		>
			<OutlinedIconButton size="medium" {...props} />
		</Badge>
	);
}
