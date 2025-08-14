import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { Helmet } from "react-helmet";

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
import { signInMutationOptions } from "@/services/auth";

export default function SignIn() {
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(authSchema),
        defaultValues: {
            name: "pvd",
            password: "123"
        }
    });

    const { mutate, isPending } = useMutation(signInMutationOptions<TInputAuth, TOutputSignIn>(navigate));
    const handleSignIn = async (data: TInputAuth) => {
        mutate(data);
    }

    return (
        <>
            <Helmet>
                <title>Todo List - Đăng nhập</title>
                <meta name="description" content="Website giúp bạn nhanh chóng ghi chú lại công việc cần làm." />
            </Helmet>

            <section className="p-[20px] bg-white rounded-[15px] w-full max-w-[450px] space-y-[30px]">
                <header className="space=y-[5px]">
                    <h1 className="text-[20px] text-neutral-800 font-semibold">Đăng nhập</h1>
                    <p className="text-[15px] text-neutral-400">Vui lòng đăng nhập để bắt đầu ghi chú.</p>
                </header>

                <Form {...form}>
                    <form
                        autoComplete="off"
                        className="space-y-[15px]"
                        onSubmit={form.handleSubmit(handleSignIn)}
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
                                to={{ pathname: "/sign-up" }}
                                className="text-[15px] text-indigo-500 font-medium underline"
                            >
                                Đăng ký
                            </Link>

                            <Button
                                className="cursor-pointer"
                                disabled={isPending}
                            >
                                { isPending ? "Đang đăng nhập . . ." : "Đăng nhập" }
                            </Button>
                        </div>
                    </form>
                </Form>
            </section>
        </>
    )
}