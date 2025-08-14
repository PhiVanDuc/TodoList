import z from "zod";

const addTodoSchema = z.object({
    accountId: z.
        string(
            { error: "Vui lòng cung cấp id tài khoản!" }
        ),
    content: z.
        string().
        min(
            1,
            { error: "Vui lòng nhập công việc cần làm!" }
        ),
    priority: z.
        object(
            {
                id: z.string(),
                name: z.string(),
                value: z.string(),
                color: z.string()
            },
            { error: "Vui lòng chọn độ ưu tiên!" }
        )
});

const updateTodoSchema = z.object({
    accountId: z.
        string(
            { error: "Vui lòng cung cấp id tài khoản!" }
        ),
    todoId: z.
        string(
            { error: "Vui lòng cung cấp id việc cần làm!" }
        ),
    content: z.
        string().
        min(
            1,
            { error: "Vui lòng nhập công việc cần làm!" }
        ),
    completed: z.
        boolean(
            { error: "Vui lòng cung cấp trạng thái hoàn thành!" }
        ),
    priority: z.
        object(
            {
                id: z.string(),
                name: z.string(),
                value: z.string(),
                color: z.string()
            },
            { error: "Vui lòng chọn độ ưu tiên!" }
        )
});

export {
    addTodoSchema,
    updateTodoSchema
}