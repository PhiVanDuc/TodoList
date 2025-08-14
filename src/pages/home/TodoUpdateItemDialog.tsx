import { useForm, useWatch } from "react-hook-form";
import useTodoDetailItemStore from "@/stores/todo-detail-item";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import getSession from "@/utils/get-session";
import { updateTodoSchema } from "@/schemas/todo";
import { updateTodoMutationOptions } from "@/services/todos";
import todoFilterPrioritiesConst from "@/consts/todo-filter-priorities-const";

export default function TodoUpdateItemDialog() {
    const { openDialog, setOpenDialog, setOpenType, todoDetailItem, setTodoDetailItem } = useTodoDetailItemStore();

    const form = useForm({
        defaultValues: {
            content: todoDetailItem.content,
            priority: todoDetailItem.priority,
        }
    });

    const watchPriority = useWatch({
        control: form.control,
        name: "priority"
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation(updateTodoMutationOptions<TInputUpdateTodo, TOutputFetchResponse>(queryClient));

    const handleUpdateTodo = async (data: TInputAddTodo) => {
        const session = getSession();

        const validate = updateTodoSchema.safeParse({
            accountId: session.data?.id,
            todoId: todoDetailItem.id,
            content: data.content,
            completed: todoDetailItem.completed,
            priority: data.priority
        });

        if (!validate.success) {
            toast.error(validate.error.issues[0].message);
            return;
        }

        mutate({
            accountId: session.data?.id,
            todoId: todoDetailItem.id,
            content: data.content,
            completed: todoDetailItem.completed,
            priority: data.priority
        });

        setOpenDialog(false);
    }

    return (
        <Dialog
            open={openDialog}
            onOpenChange={(isOpen: boolean) => {
                setOpenDialog(isOpen);
                setOpenType("");
                setTodoDetailItem({
                    priority: {
                        id: "",
                        name: "",
                        value: "",
                        color: ""
                    },
                    content: "",
                    completed: false,
                    id: ""
                });
            }}
        >
            <DialogContent className="gap-[20px]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa</DialogTitle>
                    <DialogDescription>Chỉnh sửa lại thông tin việc cần làm.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        autoComplete="off"
                        className="space-y-[15px]"
                        onSubmit={form.handleSubmit(handleUpdateTodo)}
                    >
                        <div className="flex gap-[10px]">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <Badge className={watchPriority.color}>{watchPriority.name}</Badge>
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
                        </div>

                        <div className="flex items-center justify-end gap-[10px]">
                            <Button
                                type="button"
                                variant="outline"
                                className="shrink-0 cursor-pointer"
                                onClick={() => { setOpenDialog(false); }}
                            >
                                Đóng
                            </Button>

                            <Button
                                className="cursor-pointer"
                                disabled={isPending}
                            >
                                { isPending ? "Đang lưu . . ." : "Lưu thay đổi" }
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
