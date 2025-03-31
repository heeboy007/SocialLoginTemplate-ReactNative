
type LoginMethod = "google" | "naver" | "kakao";

interface SignIn {
    message: string;
    login_method: LoginMethod | null; // has to be either kakao, google, naver, or "null"
}

interface SignInState extends SignIn {
    id_token?: string | null;
    access_token?: string | null;
}

interface SignInError extends SignIn {
    error?: Error | unknown;
}

const setToLogoutState = (): SignInState => {
    return {
        login_method: null,
        message: "logout"
    }
}

export type {
    SignIn,
    SignInState,
    SignInError,
    LoginMethod
}

export {
    setToLogoutState
}