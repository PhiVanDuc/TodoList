import axios from "axios";
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

export const publicGet = <O>(url: string, config?: AxiosRequestConfig) => {
    return request<undefined, O>({ url, method: "GET", config });
}

export const publicPost = <T, O>(url: string, data?: T, config?: AxiosRequestConfig) => {
    return request<T, O>({ url, method: "POST", data, config });
}

export const publicPut = <T, O>(url: string, data?: T, config?: AxiosRequestConfig) => {
    return request<T, O>({ url, method: "PUT", data, config });
}

export const publicPatch = <T, O>(url: string, data?: T, config?: AxiosRequestConfig) => {
    return request<T, O>({ url, method: "PATCH", data, config });
}

export const publicDelete = (url: string, config?: AxiosRequestConfig) => {
    return request({ url, method: "DELETE", config });
}