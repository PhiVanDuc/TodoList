import { jwtDecode } from "jwt-decode";

const getSession = (): TGetSession => {
    try {
        const accessToken = JSON.stringify(localStorage.getItem("access-token") || "");
        const decoded = jwtDecode<{id: string; name: string}>(accessToken);

        return {
            authed: true,
            data: decoded
        }
    }
    catch(error) {
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");

        return {
            authed: false,
            data: undefined
        }
    }
}

export default getSession;