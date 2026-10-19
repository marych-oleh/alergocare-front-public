import { describe, it, expect, beforeEach } from 'vitest';
import { CurrentUserStore } from './auth.store';
import type { CurrentUser } from './auth.model';

const mockUser: CurrentUser = {
	id: '00000000-0000-0000-0000-000000000001',
	firstName: 'Іван',
	lastName: 'Лікар',
	username: 'doctor',
	createdAt: '2024-01-01T00:00:00.000Z',
	updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('CurrentUserStore', () => {
	beforeEach(() => {
		CurrentUserStore.clearSession();
	});

	describe('initial state', () => {
		it('starts with isLoggedIn = false after clearSession', () => {
			expect(CurrentUserStore.isLoggedIn).toBe(false);
		});

		it('starts with user = null after clearSession', () => {
			expect(CurrentUserStore.user).toBeNull();
		});

		it('isInitialized is true after clearSession', () => {
			expect(CurrentUserStore.isInitialized).toBe(true);
		});
	});

	describe('setSession', () => {
		it('sets isLoggedIn to true', () => {
			CurrentUserStore.setSession(mockUser);
			expect(CurrentUserStore.isLoggedIn).toBe(true);
		});

		it('sets the user', () => {
			CurrentUserStore.setSession(mockUser);
			expect(CurrentUserStore.user).toEqual(mockUser);
		});

		it('sets isInitialized to true', () => {
			CurrentUserStore.setSession(mockUser);
			expect(CurrentUserStore.isInitialized).toBe(true);
		});
	});

	describe('clearSession', () => {
		it('clears user after session was set', () => {
			CurrentUserStore.setSession(mockUser);
			CurrentUserStore.clearSession();
			expect(CurrentUserStore.user).toBeNull();
		});

		it('sets isLoggedIn to false', () => {
			CurrentUserStore.setSession(mockUser);
			CurrentUserStore.clearSession();
			expect(CurrentUserStore.isLoggedIn).toBe(false);
		});

		it('keeps isInitialized as true', () => {
			CurrentUserStore.clearSession();
			expect(CurrentUserStore.isInitialized).toBe(true);
		});
	});
});
