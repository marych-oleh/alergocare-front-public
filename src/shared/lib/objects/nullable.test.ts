import { describe, it, expect } from 'vitest';
import type { Nullable, NullableObject, DeepNullable } from './nullable';

describe('Nullable types', () => {
	it('Nullable<string> accepts string', () => {
		const val: Nullable<string> = 'hello';
		expect(val).toBe('hello');
	});

	it('Nullable<string> accepts null', () => {
		const val: Nullable<string> = null;
		expect(val).toBeNull();
	});

	it('NullableObject wraps object fields as nullable', () => {
		const obj: NullableObject<{ name: string; age: number }> = { name: null, age: null };
		expect(obj.name).toBeNull();
		expect(obj.age).toBeNull();
	});

	it('DeepNullable wraps nested object fields', () => {
		const obj: DeepNullable<{ user: { name: string } }> = { user: null };
		expect(obj.user).toBeNull();
	});
});
