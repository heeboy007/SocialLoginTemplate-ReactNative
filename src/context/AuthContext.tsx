
import { createContext, useContext, useEffect, useState } from "react"
import { LoginMethod, SignInError, SignInState } from "./auth/signInResult";
import { googleSignIn, googleSignOut } from "./auth/google";
import { kakaoSignIn, kakaoSignOut } from "./auth/kakao";
import { naverSignIn, naverSignOut } from "./auth/naver";
import { backendLogin } from "./auth/backend";

interface AuthContext {
    socialSignIn: SignInState;
    token: string | null;
    // backend_result: SignInResult;

    isLogin: boolean;
    message: string;

    login: (method: LoginMethod) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

function AuthContextProvider({ children } : { children: React.JSX.Element }) : React.JSX.Element {
    const [ method, setMethod ] = useState<LoginMethod | null>();
    const [ message, setMessage ] = useState<string>("");

    const [ socialIsError, setSocialIsError ] = useState<boolean>(false);
    const [ socialIsPending, setSocialIsPending ] = useState<boolean>(false);
    const [ socialError, setSocialError ] = useState<SignInError | null>(null);
    const [ socialSignIn, setSocialSignIn ] = useState<SignInState | null>(null);
    
    const [ backendIsError, setBackendIsError ] = useState<boolean>(false);
    const [ backendIsPending, setBackendIsPending ] = useState<boolean>(false);
    const [ backendError, setBackendError ] = useState<SignInError | null>(null);
    const [ token, setToken ] = useState<string | null>(null);

    const signInMethod = async (method: LoginMethod) => {
        switch(method) {
            case "google":
                return googleSignIn();
            case "kakao":
                return kakaoSignIn();
            case "naver":
                return naverSignIn();
        }
    }

    const login = (login_with: LoginMethod) => {
        if(!method && !socialIsPending) {
            setMethod(login_with);
            setSocialIsPending(true);
            signInMethod(login_with).then((singin) => {
                setSocialIsError(false);
                setSocialSignIn(singin);
    
                setSocialIsPending(false);
            }).catch((error) => {
                setSocialIsError(true);
                setSocialError(error);
    
                setSocialIsPending(false);
            })
        }
    };

    const signOutMethod = async () => {
        switch(method) {
            case "google":
                return googleSignOut();
            case "kakao":
                return kakaoSignOut();
            case "naver":
                return naverSignOut();
        }
    }

    const logout = () => {
        if(method && socialSignIn && !socialIsPending ) {
            setSocialIsPending(true);
            signOutMethod().then(() => {
                setSocialIsError(false);
                setMethod(null);
                setToken(null);
                setSocialSignIn(null);
    
                setSocialIsPending(false);
            }).catch((error) => {
                setSocialIsError(true);
                setSocialError(error);
                setToken(null);
    
                setSocialIsPending(false);
            })
        }
    };

    useEffect(() => {
        if(socialIsPending) {
            setMessage("서버에 요청 중...");
        } else {
            if(socialIsError && socialError) {
                setMessage(socialError?.message || "알 수 없는 에러");
            } else if(!!socialSignIn) {
                setMessage(method + "으로 로그인 성공");
            } else {
                setMessage("로그아웃");
            }
        }
    }, [socialError, socialIsError, socialIsPending, socialSignIn]);

    useEffect(() => {
        if(!(socialIsError || socialIsPending) && !!socialSignIn) {
            console.log("Detected social login.");
            if(!backendIsPending && !token && !!method) {
                console.log("Trying backend login.")
                setBackendIsPending(true);
                backendLogin(socialSignIn, method).then((data) => {
                    console.log("Return success");
                    setToken(data.access_token);
                    setBackendIsError(false);

                    setBackendIsPending(false);
                }).catch((e) => {
                    console.log("Return error", e);
                    setBackendIsError(true);
                    setBackendError(e);

                    setBackendIsPending(false);
                });
            }
        }
    }, [socialIsError, socialIsPending, socialSignIn]);

    return <AuthContext.Provider value={{
        socialSignIn: socialSignIn,
        token: token,

        isLogin: !socialIsError && !socialIsPending && !!socialSignIn,
        message: message,

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