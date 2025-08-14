import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import getSession from "@/utils/get-session";

export default function AuthMiddleware({ children } : { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const session = getSession();
        if (session.authed) navigate("/");

        setChecking(false);
    }, [navigate]);

    if (checking) return null;
    return children
}
