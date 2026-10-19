import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { gray } from '../../config/themePrimitives';

const OutlinedIconButton = styled(IconButton)(({ theme }) => ({
	borderRadius: (theme.vars || theme).shape.borderRadius,
	border: '1px solid ',
	borderColor: gray[200],
	'&:hover': {
		backgroundColor: gray[100],
		borderColor: gray[300],
	},
	...theme.applyStyles('dark', {
		borderColor: gray[700],
		'&:hover': {
			backgroundColor: gray[900],
			borderColor: gray[600],
		},
	}),
}));

export default OutlinedIconButton;
