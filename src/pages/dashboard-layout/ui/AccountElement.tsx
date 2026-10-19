import { Avatar, Box, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { CurrentUserStore } from '~/shared/auth';
import { ColorModeIconDropdown } from '~/shared/ui/colorMode/ColorModeIconDropdown';

function AccountElement() {
	const user = CurrentUserStore.user;

	return (
		<Box
			sx={{
				pt: 3,
				pb: 2,
				pl: 3.5,
				pr: 2.5,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					mt: 'calc(var(--template-frame-height, 0px) + 4px)',
					mb: 2,
					width: '100%',
				}}
			>
				<Stack
					direction="row"
					sx={{
						gap: 2,
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Stack
						direction="row"
						sx={{
							gap: 1,
							alignItems: 'center',
							width: '100%',
						}}
					>
						<Avatar
							sizes="small"
							alt="Riley Carter"
							sx={{ width: 36, height: 36 }}
						/>
						<Box sx={{ mr: 'auto' }}>
							<Typography
								variant="body2"
								sx={{ fontWeight: 500, lineHeight: '16px' }}
							>
								{user?.username || "Ім'я користувача"}
							</Typography>
						</Box>
					</Stack>
					<ColorModeIconDropdown />
				</Stack>
			</Box>
		</Box>
	);
}

export default observer(AccountElement);
