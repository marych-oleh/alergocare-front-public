import axios from 'axios';
import { CurrentUserStore } from '../auth/auth.store';
import { getCookie } from '../lib/cookie';
import { ApiService } from './api.lib';
import { isUnAuthorizedError } from './api.types';

const BASE_URL = import.meta.env.VITE_API_URL;
const CSRT_TOKEN_NAME = 'csrf-token';

const $host = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});
const $unauthorizedHost = $host.create();

const setupAuthAxiosInterceptors = () => {
	$host.interceptors.request.use((config) => {
		if (
			['get', 'post', 'put', 'delete', 'patch'].includes(
				config.method?.toLowerCase() ?? ''
			)
		) {
			const csrfToken = getCookie(CSRT_TOKEN_NAME);

			if (csrfToken) {
				config.headers['x-csrf-token'] = csrfToken;
			}
		}

		return config;
	});
	$host.interceptors.response.use(
		(response) => response,
		(error) => {
			const serverError = error.response?.data?.error;

			// server errors (AppError)
			if (serverError) {
				if (isUnAuthorizedError(serverError)) {
					CurrentUserStore.clearSession();
				}
				// other server errors
				return Promise.reject(serverError);
			}

			// other axios client errors
			return Promise.reject(error);
		}
	);
	$unauthorizedHost.interceptors.response.use(
		(response) => response,
		(error) => {
			const serverError = error.response?.data?.error;

			// server errors (AppError)
			if (serverError) {
				// other server errors
				return Promise.reject(serverError);
			}

			// other axios client errors
			return Promise.reject(error);
		}
	);
};
setupAuthAxiosInterceptors();

const api = new ApiService($host);
const unauthorisedApi = new ApiService($unauthorizedHost);

export { api, unauthorisedApi };
