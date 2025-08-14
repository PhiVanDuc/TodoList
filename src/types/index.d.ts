export {};
import type { AxiosRequestConfig, Method } from "axios";

declare global {
    // consts

    type TTodoFilterPriorityItem = {
        id: string,
        name: string,
        value: string,
        color: string
    }

    type TPriorities = {
        HIGH: string,
        MEDIUM: string,
        LOW: string
    }

    // stores

    type TTodoDetailItem = {
        id: string,
        priority: TTodoFilterPriorityItem,
        content: string,
        completed: boolean
    }

    type TUseTodoDetailItemStore = {
        openDialog: boolean,
        setOpenDialog: (data: boolean) => void,
        openType: string,
        setOpenType: (data: string) => void,
        todoDetailItem: TTodoDetailItem,
        setTodoDetailItem: (data: TTodoDetailItem) => void,
    }

    type TUseTodosSearchStore = {
        status: string,
        priority: string[],
        setStatus: (data: string) => void,
        setPriority: (data: string[]) => void
    }

    // uitls
    type TGetSession = {
        authed: boolean,
        data: {
            id: string,
            name: string
        } | undefined
    }

    // fetch response
    type TOutputFetchResponse<D = undefined> = {
        success: boolean,
        message: string,
        data?: D
    }

    // fetch refresh token

    type TInputRefreshToken = {
        refreshToken: string
    }

    type TOutputRefreshToken = TOutputFetchResponse<{
        accessToken: string,
        refreshToken: string
    }>

    // auth pages
    type TInputAuth = {
        name: string,
        password: string
    }

    type TOutputSignIn = TOutputRefreshToken;

    // todos page
    type TGetTodosParams = {
        accountId: string | undefined,
        page: number,
        limit: number
    }

    type TTodoItem = {
        id: string,
        content: string,
        completed: boolean,
        priority: {
            id: string,
            name: string,
            value: string,
            color: string
        }
    }

    type TOutputGetTodos = TOutputFetchResponse<TTodoItem[]>

    type TInputAddTodo = {
        accountId?: string,
        content: string,
        priority: TTodoFilterPriorityItem
    }

    type TInputUpdateTodo = {
        accountId?: string,
        todoId: string,
        content: string,
        completed: boolean,
        priority: {
            id: string,
            name: string,
            value: string,
            color: string
        }
    }

    type TInputDeleteTodo = {
        accountId?: string,
        todoId: string
    }

    // axios config
    
    type TRequestOptions<I> = {
        url: string;
        method: Method;
        data?: I;
        config?: AxiosRequestConfig;
    };

    type TFailedQueueItem = {
        resolve: (accessToken: string | null) => void;
        reject: (error: unknown | null) => void;
    };
}