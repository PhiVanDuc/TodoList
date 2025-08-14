import { create } from "zustand";

const useTodoDetailItemStore = create<TUseTodoDetailItemStore>((set) => ({
    openDialog: false,
    setOpenDialog: (data: boolean) => set({ openDialog: data }),
    openType: "",
    setOpenType: (data: string) => set({ openType: data }),
    todoDetailItem: {
        priority: {
            id: "",
            name: "",
            value: "",
            color: ""
        },
        content: "",
        completed: false,
        id: ""
    },
    setTodoDetailItem: (data: TTodoDetailItem) => set({ todoDetailItem: data })
}));

export default useTodoDetailItemStore;