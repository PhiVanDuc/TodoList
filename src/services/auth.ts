import { toast } from "sonner";
import { publicPost } from "@/lib/public-fetch";
import { mutationOptions } from "@tanstack/react-query";

import type { NavigateFunction } from "react-router";

export const signInMutationOptions = <I, O extends TOutputSignIn>(navigate: NavigateFunction) => {
    return mutationOptions({
        mutationFn: (data: I) => publicPost<I, O>("/auth/sign-in", data),
        onSuccess: (result) => {
            if (result.success) {
                const accessToken = result.data?.accessToken;
                const refreshToken = result.data?.refreshToken;

                if (!accessToken || !refreshToken) return;
                else {
                    localStorage.setItem("access-token", accessToken);
                    localStorage.setItem("refresh-token", refreshToken);
                }

                toast.success(result.message);
                navigate("/");
            }
        },
        onError: (error) => { toast.error(error.message); }
    });
}

export const signUpMutationOptions = <I, O extends TOutputFetchResponse>(navigate: NavigateFunction) => {
    return mutationOptions({
        mutationFn: (data: I) => publicPost<I, O>("/auth/sign-up", data),
        onSuccess: (result) => {
            if (result.success) {
                toast.success(result.message);
                navigate("/sign-in");
            }
        },
        onError: (error) => { toast.error(error.message); }
    });
}

export const signOutService = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    window.location.href = '/sign-in';
}