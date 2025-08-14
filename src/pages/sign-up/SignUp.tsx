import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

import authSchema from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpMutationOptions } from "@/services/auth";

export default function SignUp() {
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(authSchema),
        defaultValues: {
            name: "pvd",
            password: "123"
        }
    });

    const { mutate, isPending } = useMutation(signUpMutationOptions<TInputAuth, TOutputFetchResponse>(navigate));
    const handleSignUp = async (data: TInputAuth) => {
        mutate(data);
    }

    return (
        <section className="p-[20px] bg-white rounded-[15px] w-full max-w-[450px] space-y-[30px]">
            <header className="space=y-[5px]">
                <h1 className="text-[20px] text-neutral-800 font-semibold">Đăng ký</h1>
                <p className="text-[15px] text-neutral-400">Hoàn thành đăng ký tài khoản để bắt đầu ghi chú.</p>
            </header>

            <Form {...form}>
                <form
                    autoComplete="off"
                    className="space-y-[15px]"
                    onSubmit={form.handleSubmit(handleSignUp)}
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => {
                            return (
                                <FormItem className="gap-[5px]">
                                    <FormLabel className="flex w-fit text-[15px] text-neutral-600 font-medium cursor-pointer">Tên đăng nhập</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="Nhập tên đăng nhập . . ."
                                            className="py-[22px]"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => {
                            return (
                                <FormItem className="gap-[5px]">
                                    <FormLabel className="flex w-fit text-[15px] text-neutral-600 font-medium cursor-pointer">Mật khẩu</FormLabel>

                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Nhập mật khẩu . . ."
                                            className="py-[22px]"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />

                    <div className="flex items-center justify-between">
                        <Link
                            to={{ pathname: "/sign-in" }}
                            className="text-[15px] text-indigo-500 font-medium underline"
                        >
                            Đăng nhập
                        </Link>

                        <Button
                            className="cursor-pointer"
                            disabled={isPending}
                        >
                            { isPending ? "Đang đăng ký . . ." : "Đăng ký" }
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}