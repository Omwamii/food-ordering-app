import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Tables } from "@/database.types";

type Profile = Tables<'profiles'>;

type AuthData = {
    session: Session | null;
    profile: Profile | null;
    loading: boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true)
    console.log("In AuthProvider...")

    useEffect(() => {
        console.log('Fetching session')

        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            console.log("Session data fetched from AuthProvier successfully");

            if (session) {
                const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()
                setProfile(data || null)

                console.log("Profile data fetched from AuthProvier successfully");
            } else {
                console.log('no session data fetched')
            }

            setLoading(false)
        }

        fetchSession();
        console.log("Finished fetching Session >>")

        // Listen in on session changes to update UI accordigly
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);