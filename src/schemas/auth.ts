import z from "zod";

const authSchema = z.object({
    name: z.
        string().
        min(
            1,
            { error: "Vui lòng nhập tên đăng nhập!" }
        ),
    password: z.
        string().
        min(
            1,
            { error: "Vui lòng nhập mật khẩu!" }
        )
});

export default authSchema;