
type LoginMethod = "google" | "naver" | "kakao";

interface SignInResult {
    message: string;
    login_method: LoginMethod; // has to be either kakao, google, naver

    cancel: boolean; //by something expected
    error?: string; //by something unexpectd


    id?: string;
    access_token?: string;
    profile_picture?: string;
}

export type {
    SignInResult,
    LoginMethod
}