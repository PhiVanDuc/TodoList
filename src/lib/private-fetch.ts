import axios from "axios";
import { signOutService } from "@/services/auth";

import type { AxiosRequestConfig } from "axios";

const base = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: { 'Cache-Control': 'no-cache' }
});

function handleError(method: string, error: unknown): never {
    console.error(`API ${method} Error:`, error);
    let message = "Lỗi gọi API!";
    
    if (axios.isAxiosError(error)) {
        message =
            error?.response?.data?.message?.toString() ||
            error?.message ||
            message;   
    }

    throw new Error(message);
}

const request = async <I = unknown, O = unknown>(
    {
        url,
        method,
        data,
        config
    }: TRequestOptions<I>
): Promise<O> => {
    try {
        const res = await base.request<O>({
            url,
            method,
            data,
            ...(config || {}),
        });

        const resData = res.data;
        return resData;
    } catch (error: unknown) {
        handleError(method, error);
    }
};

export const privateGet = <O>(url: string, config?: AxiosRequestConfig) => {
    return request<undefined, O>({ url, method: "GET", config });
}

export const privatePost = <T, O>(url: string, data?: T, config?: AxiosRequestConfig) => {
    return request<T, O>({ url, method: "POST", data, config });
}

export const privatePut = <T, O>(url: string, data?: T, config?: AxiosRequestConfig) => {
    return request<T, O>({ url, method: "PUT", data, config });
}

export const privatePatch = <T, O>(url: string, data?: T, config?: AxiosRequestConfig) => {
    return request<T, O>({ url, method: "PATCH", data, config });
}

export const privateDelete = <T, O>(url: string, config?: AxiosRequestConfig) => {
    return request<T, O>({ url, method: "DELETE", config });
}

base.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem("access-token")?.trim();
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    error => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: TFailedQueueItem[] = [];

const handleQueue = (
    error: unknown | null,
    accessToken: string | null
) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (!error) resolve(accessToken);
        else reject(error);
    });

    failedQueue = [];
}

base.interceptors.response.use(
    (response) => { return response },
    async (error) => {
        const originalRequest = error.config;
        const responseStatus = error.response?.status;

        if (responseStatus === 410 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (accessToken: string | null) => {
                            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                            resolve(base(originalRequest));
                        },
                        reject: (error: unknown | null) => reject(error)
                    })
                })
            }

            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refresh-token');
                if (!refreshToken) {
                    signOutService();
                    throw new Error("Không thể làm mới phiên đăng nhập!");
                }

                const response = await base.post<TOutputRefreshToken>("/token/refresh", { refreshToken });
                const result = response.data;
                const newAccessToken = result?.data?.accessToken;
                const newRefreshToken = result?.data?.refreshToken;

                if (!result.success || !newAccessToken || !newRefreshToken) {
                    signOutService();
                    throw new Error("Không thể làm mới phiên đăng nhập!");
                }

                localStorage.setItem('access-token', newAccessToken);
                localStorage.setItem('refresh-token', newRefreshToken);

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                handleQueue(null, newAccessToken);
                return base(originalRequest);
            }
            catch(error) {
                handleQueue(error, null);
                return Promise.reject(error);
            }
            finally {
                isRefreshing = false;
            }
        }
        else if (responseStatus === 401) signOutService();

        return Promise.reject(error);
    }
)