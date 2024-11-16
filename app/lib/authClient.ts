import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
    baseURL: "http://localhost:5173/api/auth",
});

export const { signIn, signUp, useSession } = createAuthClient()