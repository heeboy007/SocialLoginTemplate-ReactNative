import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react"
import { LoginMethod, SignInResult } from "./auth/signInResult";
import { googleSignIn } from "./auth/google";

interface AuthContext {
    social_result: SignInResult;
    backend_result: SignInResult;

    is_login: boolean;

    login: (method: LoginMethod) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

function AuthContextProvider({ children } : { children: React.JSX.Element }) : React.JSX.Element {
    const [ method, setMethod ] = useState<LoginMethod | null>(null);
    const [ token, setToken ] = useState<string | null>(null);

    const { 
        isPending: social_pending, 
        isError: social_is_error, 
        error: social_error,
        data: social_result, 
        refetch: social_login 
    } = useQuery({
        queryKey: ['social_login_query', method],
        queryFn: async () => {
            switch(method) {
                case "google":
                    return googleSignIn();
                default:
                    throw Error("올바르지 않은 소셜 로그인 방법");
            }
        },
        refetchInterval: 1000 * 60 * 60,
        enabled: false
    });

    const { isPending: backend_pending, isError: backend_is_error, error: backend_error, data: backend_result, refetch: backend_login } = useQuery({
        queryKey: ['backend_login_query', social_result],
        queryFn: async () => {
            return {}
        }, //TOOD: implement to give information to backend.
        refetchInterval: 1000 * 60 * 60,
        enabled: true
    });
    
    const login = (method: LoginMethod) => {
        setMethod(method);
        social_login();
    }

    const logout = () => {

    }

    return <AuthContext.Provider value={{
        social_result: social_result,
        backend_result: backend_result,

        is_login: (!backend_pending && !backend_error && backend_result),

        login: login,
        logout: logout
    } as AuthContext}>
        {children}
    </AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext);

export type {
    AuthContext
}

export {
    AuthContextProvider,
    useAuthContext
}