export type Nullable<T> = T | null;
export type DeepNullable<T> = {
	[K in keyof T]: DeepNullable<T[K]> | null;
};
export type NullableObject<T> = {
	[K in keyof T]: Nullable<T[K]> | null;
};
export type AllNull<T> = {
	[K in keyof T]: null;
};
