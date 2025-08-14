import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

import { cn } from "@/lib/utils";

export default function Todo() {
    return (
        <section className={cn(
            "bg-white w-full h-dvh flex-1 flex flex-col rounded-[15px] border border-neutral-200 shadow-sm",
            "md:w-[600px] md:flex-none md:h-[700px]"
        )}>
            <header className="px-[20px] py-[20px]">
                <h1 className="text-[20px] text-neutral-800 font-semibold">Danh sách công việc</h1>
                <p className="text-[15px] text-neutral-600">Ghi chú kế hoạch hoặc công việc quan trọng cần làm.</p>
            </header>

            <TodoList />
            <TodoForm />
        </section>
    )
}