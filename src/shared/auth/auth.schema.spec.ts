import { describe, expect, it } from 'vitest';
import { CurrentUserResponseSchema } from './auth.schema';

const VALID_UUID = '123e4567-e89b-12d3-a456-426614174000';
const VALID_DATETIME = '2025-01-01T00:00:00.000Z';

const validUser = {
	id: VALID_UUID,
	firstName: 'Іван',
	lastName: 'Петренко',
	username: 'ivan.petrenko',
	createdAt: VALID_DATETIME,
	updatedAt: VALID_DATETIME,
};

describe('CurrentUserResponseSchema', () => {
	it('валідує коректний обʼєкт користувача', () => {
		expect(CurrentUserResponseSchema.safeParse(validUser).success).toBe(true);
	});

	it('повертає помилку якщо id не є UUID', () => {
		const result = CurrentUserResponseSchema.safeParse({
			...validUser,
			id: 'not-a-valid-uuid',
		});
		expect(result.success).toBe(false);
	});

	it('повертає помилку якщо firstName відсутній', () => {
		const { firstName: _omit, ...without } = validUser;
		expect(CurrentUserResponseSchema.safeParse(without).success).toBe(false);
	});

	it('повертає помилку якщо lastName відсутній', () => {
		const { lastName: _omit, ...without } = validUser;
		expect(CurrentUserResponseSchema.safeParse(without).success).toBe(false);
	});

	it('повертає помилку якщо username відсутній', () => {
		const { username: _omit, ...without } = validUser;
		expect(CurrentUserResponseSchema.safeParse(without).success).toBe(false);
	});

	it('повертає помилку якщо createdAt не є ISO datetime', () => {
		const result = CurrentUserResponseSchema.safeParse({
			...validUser,
			createdAt: '2025-01-01',
		});
		expect(result.success).toBe(false);
	});

	it('повертає помилку якщо updatedAt не є ISO datetime', () => {
		const result = CurrentUserResponseSchema.safeParse({
			...validUser,
			updatedAt: 'вчора',
		});
		expect(result.success).toBe(false);
	});

	it('повертає помилку для порожнього обʼєкта', () => {
		expect(CurrentUserResponseSchema.safeParse({}).success).toBe(false);
	});
});
