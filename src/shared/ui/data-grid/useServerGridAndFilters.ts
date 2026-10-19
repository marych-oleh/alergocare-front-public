import { zodResolver } from '@hookform/resolvers/zod';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { ZodType } from 'zod';
import {
	FilterItemDto,
	FilterOperatorEnum,
	PaginatedRequest,
} from '~/shared/api/common';

export type FiltersOperatorsMapper<TFilters> = Partial<
	Record<keyof TFilters, FilterOperatorEnum>
>;

interface ServerGridAndFilters<Input extends FieldValues, Output extends {}> {
	schema: ZodType<Output, Input>;
	defaultFilters: DefaultValues<Input>;
	operators: FiltersOperatorsMapper<Input>;
	debounceMs?: number;
	initialPageSize?: number;
}

export const useServerGridAndFilters = <
	Input extends FieldValues,
	Output extends {},
>({
	schema,
	defaultFilters,
	operators,
	debounceMs = 500,
	initialPageSize = 15,
}: ServerGridAndFilters<Input, Output>) => {
	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
		page: 0,
		pageSize: initialPageSize,
	});
	const [sortModel, setSortModel] = useState<GridSortModel>([]);

	const filterForm = useForm({
		defaultValues: defaultFilters,
		resolver: zodResolver(schema),
	});

	const currentFormValues = filterForm.watch();
	const [debouncedFormValues] = useDebounce(currentFormValues, debounceMs, {
		equalityFn: (prev, next) => JSON.stringify(prev) === JSON.stringify(next),
	});

	const backendRequestParams = useMemo(() => {
		const payload: PaginatedRequest<any> = {
			page: paginationModel.page + 1,
			pageSize: paginationModel.pageSize,
		};

		if (sortModel.length > 0) {
			payload.sort = {
				field: sortModel[0].field,
				order: sortModel[0].sort === 'asc' ? 'asc' : 'desc',
			};
		}

		const parsed = schema.safeParse(debouncedFormValues);

		if (!parsed.success) {
			return payload;
		}

		const filters: FilterItemDto<any>[] = [];
		const transformedValues = parsed.data;

		Object.entries(transformedValues).forEach(([key, value]) => {
			if (value !== '' && value !== null && value !== undefined) {
				filters.push({
					field: key,
					operator: operators[key as keyof typeof operators] || 'equals',
					value: String(value),
				});
			}
		});

		if (filters.length > 0) payload.filters = filters;
		return payload;
	}, [paginationModel, sortModel, debouncedFormValues, schema, operators]);

	return {
		backendRequestParams,
		filterForm,
		dataGridProps: {
			paginationModel,
			onPaginationModelChange: setPaginationModel,
			sortModel,
			onSortModelChange: setSortModel,
			disableColumnFilter: true,
		},
	};
};
