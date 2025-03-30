
type LoginMethod = "google" | "naver" | "kakao";

interface SignInState {
    message: string;
    login_method: LoginMethod | null; // has to be either kakao, google, naver, or "null"

    cancel: boolean; //by something expected
    error?: string; //by something unexpectd

    id?: string;
    access_token?: string;
    profile_picture?: string;
}

const setToLogoutState = (): SignInState => {
    return {
        login_method: null,
        cancel: false,
        message: "logout"
    }
}

export type {
    SignInState,
    LoginMethod
}

export {
    setToLogoutState
}