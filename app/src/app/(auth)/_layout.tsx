import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
    const { session } = useAuth();

    if (session) {
        // The user had signed in, should'nt be able to access the auth screens
        return <Redirect href={'/'} />;
    }
    
    return <Stack />;
}