export function clearEmpties<T extends object>(obj: T): Partial<T> {
	return Object.fromEntries(
		Object.entries(obj)
			.map(([k, v]) => [
				k,
				v && typeof v === 'object' && !Array.isArray(v) ?
					clearEmpties(v)
				:	v,
			])
			.filter(
				([_, v]) =>
					v !== null &&
					v !== undefined &&
					v !== '' &&
					(typeof v !== 'object' || Object.keys(v).length > 0)
			)
	) as Partial<T>;
}
