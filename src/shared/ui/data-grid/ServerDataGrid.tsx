import { GridValidRowModel } from '@mui/x-data-grid';
import CustomizedDataGrid, { CustomDataGridProps } from './CustomizedDataGrid';

interface ServerDataGridProps<R extends GridValidRowModel> extends Omit<
	CustomDataGridProps<R>,
	'paginationMode' | 'sortingMode' | 'filterMode'
> {
	rows: R[];
	rowCount: number;
	loading?: boolean;
}

export const ServerDataGrid = <R extends GridValidRowModel>({
	rows,
	rowCount,
	loading,
	...gridProps
}: ServerDataGridProps<R>) => {
	return (
		<CustomizedDataGrid
			rows={rows}
			loading={loading}
			rowCount={rowCount}
			paginationMode="server"
			sortingMode="server"
			filterMode="server"
			{...gridProps}
		/>
	);
};
