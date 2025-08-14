import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    Form,
    FormField,
    FormItem,
    FormControl
} from "@/components/ui/form";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import getSession from "@/utils/get-session";
import { addTodoSchema } from "@/schemas/todo";
import { addTodoMutationOptions } from "@/services/todos";
import todoFilterPrioritiesConst from "@/consts/todo-filter-priorities-const";

export default function TodoForm() {
    const form = useForm({
        defaultValues: {
            content: "",
            priority: todoFilterPrioritiesConst[0]
        }
    });

    const watchPriority = useWatch({
        control: form.control,
        name: "priority"
    });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation(addTodoMutationOptions<TInputAddTodo, TOutputFetchResponse>(queryClient));

    const handleAddTodo = (data: TInputAddTodo) => {
        const session = getSession();
        const finalData = { ...data, accountId: session.data?.id};

        const validate = addTodoSchema.safeParse(finalData);
        if (!validate.success) {
            toast.error(validate.error.issues[0].message);
            return;
        }

        form.reset();
        mutate(finalData);
    }

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                className="flex items-stretch gap-[10px] p-[20px]"
                onSubmit={form.handleSubmit(handleAddTodo)}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="shrink-0 self-stretch h-full cursor-pointer hover:bg-neutral-50"
                        >
                            <Badge className={watchPriority.color}>{watchPriority.name}</Badge>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        side="top"
                        align="start"
                        className="flex flex-col gap-[5px]"
                    >
                        {
                            todoFilterPrioritiesConst.map(pr => {
                                return (
                                    <DropdownMenuItem
                                        key={pr.id}
                                        className={cn(
                                            "flex items-center gap-[8px] px-[15px] py-[10px] cursor-pointer",
                                            watchPriority.id === pr.id ? "bg-neutral-100" : ""
                                        )}
                                        onClick={() => { form.setValue("priority", pr) }}
                                    >
                                        <p className="text-[15px] text-neutral-700">Độ ưu tiên</p>
                                        <Badge className={pr.color}>{pr.name}</Badge>
                                    </DropdownMenuItem>
                                )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => {
                        return (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        placeholder="Nhập việc cần làm . . ."
                                        className="w-full py-[22px]"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )
                    }}
                />

                <Button
                    disabled={isPending}
                    className="shrink-0 self-stretch h-full cursor-pointer"
                >
                    { isPending ? "Đang thêm . . ." : "Thêm" }
                </Button>
            </form>
        </Form>
    )
}