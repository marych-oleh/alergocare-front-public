import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import z from 'zod';
import { ServerResponse } from './api.types';
import { clearEmpties } from '../lib/objects/objects';

// API CLIENT
interface BaseRequestOptions<T> {
	url: string;
	params?: Record<string, string | number>;
	signal?: AbortSignal;
	schema?: z.ZodType<T>;
}

interface MutationOptions<T> extends BaseRequestOptions<T> {
	data?: any;
}

interface InternalRequestOptions<T> extends MutationOptions<T> {
	method: Method;
}

export class ApiService {
	private axiosInstance: AxiosInstance;

	public constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	private async request<T>({
		method,
		url,
		data,
		params = {},
		signal,
		schema,
	}: InternalRequestOptions<T>): Promise<T> {
		try {
			const clearedParams = clearEmpties(params);
			const config: AxiosRequestConfig = {
				method,
				url,
				params: clearedParams,
				data,
				signal,
			};

			const response =
				await this.axiosInstance.request<ServerResponse<T>>(config);

			if (response.data.ok) {
				if (schema) {
					return schema.parse(response.data.result);
				}
				return response.data.result;
			} else {
				throw response.data.error;
			}
		} catch (error) {
			if (axios.isCancel(error)) {
				return null as any;
			}
			console.error(`${method.toUpperCase()} error on ${url}:`, error);
			throw error;
		}
	}

	public async get<T>(options: BaseRequestOptions<T>): Promise<T> {
		return this.request<T>({ ...options, method: 'GET' });
	}

	public async post<T>(options: MutationOptions<T>): Promise<T> {
		return this.request<T>({ ...options, method: 'POST' });
	}

	public async put<T>(options: MutationOptions<T>): Promise<T> {
		return this.request<T>({ ...options, method: 'PUT' });
	}

	public async patch<T>(options: MutationOptions<T>): Promise<T> {
		return this.request<T>({ ...options, method: 'PATCH' });
	}

	public async delete<T>(options: BaseRequestOptions<T>): Promise<T> {
		return this.request<T>({ ...options, method: 'DELETE' });
	}
}
