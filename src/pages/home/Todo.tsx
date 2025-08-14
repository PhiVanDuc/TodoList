import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import TodoHeader from "./TodoHeader";

import { Helmet } from "react-helmet";
import { cn } from "@/lib/utils";

export default function Todo() {
    return (
        <>
            <Helmet>
                <title>Todo List</title>
                <meta name="description" content="Website giúp bạn nhanh chóng ghi chú lại công việc cần làm." />
            </Helmet>

            <section className={cn(
                "bg-white w-full h-dvh flex-1 flex flex-col rounded-[15px] border border-neutral-200 shadow-sm",
                "md:w-[600px] md:flex-none md:h-[700px]"
            )}>
                <TodoHeader />
                <TodoList />
                <TodoForm />
            </section>
        </>
    )
}