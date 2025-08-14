import useTodoDetailItemStore from "@/stores/todo-detail-item";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TodoDetailItemDialog() {
    const { openDialog, setOpenDialog, setOpenType, todoDetailItem, setTodoDetailItem } = useTodoDetailItemStore();

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
                    <DialogTitle>Chi tiết</DialogTitle>
                    <DialogDescription>Hiển thị chi tiết thông tin của việc cần làm.</DialogDescription>
                </DialogHeader>

                <div className="space-y-[30px]">
                    <div className="space-y-[5px]">
                        <div className="flex items-center gap-[10px]">
                            <p className="text-[15px] text-neutral-600 font-medium">Độ ưu tiên:</p>
                            <Badge className={todoDetailItem.priority.color}>{todoDetailItem.priority.name}</Badge>
                        </div>

                        <p className="text-[16px] text-neutral-700">{todoDetailItem.content}</p>
                    </div>

                    <div className="flex items-center justify-end gap-[8px]">
                        <Button
                            variant="outline"
                            onClick={() => { setOpenDialog(false) }}
                            className="w-full cursor-pointer"
                        >
                            Đóng
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}