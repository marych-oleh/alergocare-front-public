import { makeAutoObservable } from 'mobx';
import { CurrentUser } from './auth.model';

class CurrentUserStoreClass {
	isLoggedIn: boolean = false;
	user: CurrentUser | null = null;
	isInitialized: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	setSession(user: CurrentUser) {
		this.user = user;
		this.isLoggedIn = true;
		this.isInitialized = true;
	}

	clearSession() {
		this.user = null;
		this.isLoggedIn = false;
		this.isInitialized = true;
	}
}

export const CurrentUserStore = new CurrentUserStoreClass();
