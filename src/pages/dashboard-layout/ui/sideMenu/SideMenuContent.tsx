import { styled } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { NavLink } from 'react-router';
import { mainListItems } from '~/shared/routes';
import AccountElement from '../AccountElement';
import AppTitle from './AppTitle';
import { LogoutButton } from './LogoutButton';

export default function SideMenuContent() {
	return (
		<Stack
			sx={{
				minHeight: '100%',
			}}
		>
			<AppTitle p={1} textAlign="center" />
			<Divider />
			<AccountElement />
			<Divider />
			<Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
				<List dense>
					{mainListItems.map((item, index) => (
						<ListItem
							key={index}
							disablePadding
							sx={{ display: 'block' }}
						>
							<ListItemLink {...item} />
						</ListItem>
					))}
				</List>
				{/* <List dense>
					{secondaryListItems.map((item, index) => (
						<ListItem
							key={index}
							disablePadding
							sx={{ display: 'block' }}
						>
							<ListItemButton>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItemButton>
						</ListItem>
					))}
				</List> */}
			</Stack>
			<Divider />
			<Stack sx={{ p: 2 }}>
				<LogoutButton />
			</Stack>
		</Stack>
	);
}

interface ListItemLinkProps {
	icon?: React.ReactElement<unknown>;
	text: string;
	to: string;
	end?: boolean;
}

const StyledNavLink = styled(NavLink)(({ theme }) => ({
	textDecoration: 'none',
	color: 'inherit',

	'&.active': {
		color: theme.palette.primary.main,
		fontWeight: 'bold',
		'& .MuiSvgIcon-root': {
			color: theme.palette.primary.main,
		},
	},
}));

function ListItemLink(props: ListItemLinkProps) {
	const { icon, text, to, end } = props;

	return (
		<ListItemButton component={StyledNavLink} to={to} end={end ?? false}>
			{icon ?
				<ListItemIcon>{icon}</ListItemIcon>
			:	null}
			<ListItemText primary={text} />
		</ListItemButton>
	);
}
