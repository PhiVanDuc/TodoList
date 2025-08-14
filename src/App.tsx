import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import Layout from "@/components/layouts/Layout";

const NotFound = lazy(() => import("@/components/NotFound"));
const PrivateMiddleware = lazy(() => import("@/middlewares/PrivateMiddleware"));
const Home = lazy(() => import("@/pages/home/Todo"));

const AuthMiddleware = lazy(() => import("@/middlewares/AuthMiddleware"));
const SignIn = lazy(() => import("@/pages/sign-in/SignIn"));
const SignUp = lazy(() => import("@/pages/sign-up/SignUp"));

export default function App() {
    return (
        <Routes>
            {/* Bắt lỗi 404 */}
            <Route path='*' element={<NotFound />} />
            
            <Route element={<Layout />}>
                <Route
                    index
                    path="/"
                    element={
                        <Suspense fallback="">
                            <PrivateMiddleware>
                                <Home />
                            </PrivateMiddleware>
                        </Suspense>
                    }
                />

                <Route
                    path="/sign-in"
                    element={
                        <Suspense fallback="">
                            <AuthMiddleware>
                                <SignIn />
                            </AuthMiddleware>
                        </Suspense>
                    }
                />

                <Route
                    path="/sign-up"
                    element={
                        <Suspense fallback="">
                            <AuthMiddleware>
                                <SignUp />
                            </AuthMiddleware>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}