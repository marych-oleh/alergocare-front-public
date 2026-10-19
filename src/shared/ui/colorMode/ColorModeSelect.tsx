import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';
import { useColorScheme } from '@mui/material/styles';

export function ColorModeSelect(props: SelectProps) {
	const { mode, setMode } = useColorScheme();
	if (!mode) {
		return null;
	}
	return (
		<Select
			value={mode}
			onChange={(event) =>
				setMode(event.target.value as 'system' | 'light' | 'dark')
			}
			SelectDisplayProps={{
				// @ts-ignore
				'data-screenshot': 'toggle-mode',
			}}
			{...props}
		>
			<MenuItem value="system">Системна</MenuItem>
			<MenuItem value="light">Світла</MenuItem>
			<MenuItem value="dark">Темна</MenuItem>
		</Select>
	);
}
