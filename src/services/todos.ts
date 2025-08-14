import { toast } from "sonner";
import { privateDelete, privateGet, privatePost, privatePut } from "@/lib/private-fetch";
import { queryOptions, mutationOptions, QueryClient, type UseQueryOptions } from "@tanstack/react-query";

export const getTodosQueryOptions = <O>(
    params: TGetTodosParams,
    options?: Omit<UseQueryOptions<O>, "queryKey" | "queryFn"> | undefined
) => {
    return queryOptions({
        queryKey: ["get-todos"],
        queryFn: () => {
            return privateGet<O>("/todos", {
                params: {
                    accountId: params.accountId,
                    page: params.page,
                    limit: params.limit
                }
            })
        },
        ...(options ? options : {})
    });
}

export const addTodoMutationOptions = <I, O extends TOutputFetchResponse>(queryClient: QueryClient) => {
    return mutationOptions({
        mutationFn: (data: I) => privatePost<I, O>("/todos", data),
        onSuccess: (result) => {
            if (result.success) {
                toast.success(result.message);
                queryClient.invalidateQueries({ queryKey: ["get-todos"] });
            }
        },
        onError: (error) => { toast.error(error.message) }
    });
}

export const updateTodoMutationOptions = <I, O extends TOutputFetchResponse>(queryClient: QueryClient) => {
    return mutationOptions({
        mutationFn: (data: I) => privatePut<I, O>("/todos", data),
        onSuccess: (result) => {
            if (result.success) {
                toast.success(result.message);
                queryClient.invalidateQueries({ queryKey: ["get-todos"] });
            }
        },
        onError: (error) => { toast.error(error.message) }
    });
}

export const deleteTodoMutationOptions = <I extends TInputDeleteTodo, O extends TOutputFetchResponse>(queryClient: QueryClient) => {
    return mutationOptions({
        mutationFn: (data: I) => {
            return privateDelete<I, O>(
                "/todos",
                {
                    params: {
                        accountId: data.accountId,
                        todoId: data.todoId
                    }
                }
            )
        },
        onSuccess: (result) => {
            if (result.success) {
                toast.success(result.message);
                queryClient.invalidateQueries({ queryKey: ["get-todos"] });
            }
        },
        onError: (error) => { toast.error(error.message) }
    });
}