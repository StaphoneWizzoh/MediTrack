import { jwtDecode } from "jwt-decode";

export const decoder = (raw: string) => {
    return jwtDecode(raw);
};
