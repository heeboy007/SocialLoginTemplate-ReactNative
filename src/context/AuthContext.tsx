
import { createContext, useContext, useEffect, useState } from "react"
import { LoginMethod, setToLogoutState, SignInError, SignInState } from "./auth/signInResult";
import { googleSignIn, googleSignOut } from "./auth/google";
import { kakaoSignIn, kakaoSignOut } from "./auth/kakao";
import { naverSignIn, naverSignOut } from "./auth/naver";

interface AuthContext {
    socialSignIn: SignInState;
    // backend_result: SignInResult;

    isLogin: boolean;
    message: string;

    login: (method: LoginMethod) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

function AuthContextProvider({ children } : { children: React.JSX.Element }) : React.JSX.Element {
    const [ method, setMethod ] = useState<LoginMethod | null>();
    const [ token, setToken ] = useState<string | null>(null);

    const [ message, setMessage ] = useState<string>("");

    const [ socialIsError, setSocialIsError ] = useState<boolean>(false);
    const [ socialIsPending, setSocialIsPending ] = useState<boolean>(false);
    const [ socialError, setSocialError ] = useState<SignInError | null>(null);
    const [ socialSignIn, setSocialSignIn ] = useState<SignInState | null>(null);
    
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
                setSocialSignIn(null);
    
                setSocialIsPending(false);
            }).catch((error) => {
                setSocialIsError(true);
                setSocialError(error);
    
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
    }, [socialError, socialIsError, socialIsPending, socialSignIn])

    return <AuthContext.Provider value={{
        socialSignIn: socialSignIn,
        // backend_result: backend_result,

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