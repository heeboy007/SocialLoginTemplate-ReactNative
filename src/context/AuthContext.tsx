import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react"
import { LoginMethod, setToLogoutState, SignInState } from "./auth/signInResult";
import { googleSignIn, googleSignOut } from "./auth/google";
import { kakaoSignIn, kakaoSignOut } from "./auth/kakao";

interface AuthContext {
    social_result: SignInState;
    // backend_result: SignInResult;

    is_login: boolean;
    login_message: string;

    login: (method: LoginMethod) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

function AuthContextProvider({ children } : { children: React.JSX.Element }) : React.JSX.Element {
    const [ method, setMethod ] = useState<LoginMethod | null>(null);
    const [ loginMessage, setLoginMessage ] = useState<string>("");
    const [ token, setToken ] = useState<string | null>(null);

    const { 
        isPending: social_pending, 
        isError: social_is_error, 
        error: social_error,
        data: social_result, 
        refetch: social_login 
    } = useQuery<SignInState>({
        queryKey: ['social_login_query', method],
        queryFn: async () => {
            switch(method) {
                case "google":
                    return googleSignIn();
                case "kakao":
                    return kakaoSignIn();
                default:
                    return setToLogoutState();
            }
        },
    });

    // const { isPending: backend_pending, isError: backend_is_error, error: backend_error, data: backend_result, refetch: backend_login } = useQuery({
    //     queryKey: ['backend_login_query', social_result],
    //     queryFn: async () => {
    //         return {}
    //     }, //TOOD: implement to give information to backend.
    //     refetchInterval: 1000 * 60 * 60,
    //     enabled: true
    // });
    
    const login = (method: LoginMethod) => {
        setMethod(method);
        social_login();
    };

    const logout = async () => {
        switch(method) {
            case "google":
                await googleSignOut();
                setMethod(null);
                break;
            case "kakao":
                await kakaoSignOut();
                setMethod(null);
                break;
            case "naver":
                setMethod(null);
                break;
        }
    };

    useEffect(() => {
        if(social_is_error) {
            setLoginMessage(`social_error method ${method}`);
        } else {
            if(social_pending) {
                setLoginMessage(`pending... method ${method}`);
            } else {
                setLoginMessage(`idle method ${method}`);
            }
        }
    }, [social_pending, social_error, method]);

    return <AuthContext.Provider value={{
        social_result: social_result,
        // backend_result: backend_result,

        is_login: !!social_login,
        login_message: loginMessage,

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