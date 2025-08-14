import { useState, type MouseEvent } from "react";
import useTodoDetailItemStore from "@/stores/todo-detail-item";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { PiTrashSimpleBold } from "react-icons/pi";
import { FiEdit2 } from "react-icons/fi";

import { cn } from "@/lib/utils";
import getSession from "@/utils/get-session";
import { deleteTodoMutationOptions, updateTodoMutationOptions } from "@/services/todos";

export default function TodoItem({ todo }: { todo: TTodoItem }) {
    const queryClient = useQueryClient();
    const [completed, setCompleted] = useState(todo.completed);
    const { setOpenDialog, setOpenType, setTodoDetailItem } = useTodoDetailItemStore();

    const handleOpenDialog = (type: string) => {
        setOpenDialog(true);
        setOpenType(type);
        setTodoDetailItem({
            priority: todo.priority,
            content: todo.content,
            completed: todo.completed,
            id: todo.id
        })
    }

    // handle update todo
    const { mutate: mutateUpdate } = useMutation(updateTodoMutationOptions<TInputUpdateTodo, TOutputFetchResponse>(queryClient));

    const handleCompleteTodo = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        const session = getSession();
        mutateUpdate({
            accountId: session.data?.id,
            todoId: todo.id,
            content: todo.content,
            completed: !completed,
            priority: todo.priority
        });
        setCompleted(!completed);
    }

    // handle delete todo
    const { mutate: mutateDelete } = useMutation(deleteTodoMutationOptions<TInputDeleteTodo, TOutputFetchResponse>(queryClient));

    const handleDeleteTodo = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        const session = getSession();
        mutateDelete({
            accountId: session.data?.id,
            todoId: todo.id
        });
    }

    return (
        <li
            className="flex items-center justify-between gap-[15px] p-[10px] rounded-[10px] hover:bg-neutral-50 transition-colors cursor-pointer"
            onClick={() => { handleOpenDialog("DETAIL"); }}
        >
            <div className="flex items-center gap-[8px] overflow-hidden">
                <div
                    className="shrink-0 flex items-center justify-center w-[30px] aspect-square rounded-[5px] text-neutral-400 bg-neutral-50 hover:bg-neutral-200 hover:text-neutral-600 transition-colors"
                    onClick={(e) => { e.stopPropagation(); handleOpenDialog("UPDATE"); }}
                >
                    <FiEdit2 size={16} className="cursor-pointer" />
                </div>

                <div
                    className="shrink-0 flex items-center justify-center w-[30px] aspect-square rounded-[5px] text-neutral-400 bg-neutral-50 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    onClick={handleDeleteTodo}
                >
                    <PiTrashSimpleBold size={16} className="cursor-pointer" />
                </div>

                <p className={cn(
                    "text-[16px] text-neutral-700 truncate",
                    completed ? "text-neutral-400 line-through italic" : ""
                )}>
                    {todo.content}
                </p>
            </div>

            <div className="flex items-center gap-[10px]">
                <Badge className={todo.priority.color}>{todo.priority.name}</Badge>

                <Checkbox
                    className="border-neutral-400 cursor-pointer"
                    onClick={handleCompleteTodo}
                />
            </div>
        </li>
    )
}
