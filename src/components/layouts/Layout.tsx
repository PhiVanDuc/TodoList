import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";

import { Outlet } from "react-router";
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 2 * 60 * 1000,
            gcTime: 5 * 60 * 1000
        }
    }
});

export default function Layout() {
    return (
        <main className="h-dvh flex flex-col items-center justify-center bg-slate-100">
            <QueryClientProvider client={queryClient}>
                <Toaster />
                <Outlet />
            </QueryClientProvider>
        </main>
    )
}
