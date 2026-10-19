import {
	Control,
	FieldPath,
	FieldPathValue,
	FieldValues,
	useWatch,
} from 'react-hook-form';

// The engine that maps either a single string path OR an array/tuple of paths
type WatchValueResult<TFieldValues extends FieldValues, TName> =
	TName extends readonly any[] ?
		{
			[K in keyof TName]: TName[K] extends FieldPath<TFieldValues> ?
				FieldPathValue<TFieldValues, TName[K]>
			:	never;
		}
	: TName extends FieldPath<TFieldValues> ? FieldPathValue<TFieldValues, TName>
	: never;

interface RHFWatchValueProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues> | readonly FieldPath<TFieldValues>[],
	TTransformedValues,
> {
	control: Control<TFieldValues, any, TTransformedValues>;
	name: TName;
	render: (
		value: WatchValueResult<TFieldValues, TName>
	) => React.ReactElement | undefined | null;
}

export const RHFWatchValue = <
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues> | readonly FieldPath<TFieldValues>[],
	TTransformedValues = TFieldValues,
>({
	control,
	name,
	render,
}: RHFWatchValueProps<TFieldValues, TName, TTransformedValues>) => {
	const value = useWatch({
		control,
		name: name as any,
	});

	return render(value as any) ?? null;
};
