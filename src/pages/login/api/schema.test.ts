import { describe, it, expect } from 'vitest';
import { LoginRequestSchema } from './schema';

describe('LoginRequestSchema', () => {
	it('validates valid login data', () => {
		const result = LoginRequestSchema.safeParse({ username: 'user', password: 'password123' });
		expect(result.success).toBe(true);
	});

	it('rejects empty username', () => {
		const result = LoginRequestSchema.safeParse({ username: '', password: 'password123' });
		expect(result.success).toBe(false);
	});

	it('rejects short password', () => {
		const result = LoginRequestSchema.safeParse({ username: 'user', password: 'short' });
		expect(result.success).toBe(false);
	});

	it('rejects missing fields', () => {
		const result = LoginRequestSchema.safeParse({});
		expect(result.success).toBe(false);
	});

	it('password must be at least 8 chars', () => {
		const result = LoginRequestSchema.safeParse({ username: 'user', password: '12345678' });
		expect(result.success).toBe(true);
	});
});
