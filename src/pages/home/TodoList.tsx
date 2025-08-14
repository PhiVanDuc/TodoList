import { Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import useTodoDetailItemStore from "@/stores/todo-detail-item";

import TodoItem from "./TodoItem";
import LazyLoadingDialog from "./LazyLoadingDialog";
const TodoDetailItemDialog = lazy(() => import("./TodoDetailItemDialog"));
const TodoUpdateItemDialog = lazy(() => import("./TodoUpdateItemDialog"));

import getSession from "@/utils/get-session";
import { getTodosQueryOptions } from "@/services/todos";

export default function TodoList() {
    const session = getSession();
    const { openDialog, openType } = useTodoDetailItemStore();

    const { data } = useQuery(getTodosQueryOptions<TOutputGetTodos>(
        {
            accountId: session.data?.id,
            page: 1,
            limit: 15
        },
        { retry: 0 }
    ));

    return (
        <>
            <div className="relative flex-1 flex flex-col overflow-y-auto">
                <ul className="flex-1 px-[20px] overflow-y-auto">
                    {
                        data?.data && data.data.length > 0 ?
                        data?.data?.map(todo => {
                            return (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                />
                            )
                        }) :
                        <p className="pt-[20px] text-center text-[15px] text-neutral-500 italic">Danh sách trống</p>
                    }

                    <span className="block pb-[20px]" />
                </ul>

                <span className="block absolute bottom-0 left-0 right-0 h-[50px] bg-linear-to-t from-white to-transparent pointer-events-none" />
            </div>

            {
                (openDialog && openType === "DETAIL") &&
                (
                    <Suspense fallback={<LazyLoadingDialog />}>
                        <TodoDetailItemDialog />
                    </Suspense>
                )
            }

            {
                (openDialog && openType === "UPDATE") &&
                (
                    <Suspense fallback={<LazyLoadingDialog />}>
                        <TodoUpdateItemDialog />
                    </Suspense>
                )
            }
        </>
    )
}