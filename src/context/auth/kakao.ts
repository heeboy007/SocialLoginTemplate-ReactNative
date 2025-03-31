import { KakaoOAuthToken, login, logout, unlink } from "@react-native-seoul/kakao-login";
import { SignInState } from "./signInResult";

const kakaoSignIn = async (): Promise<SignInState> => {
    return new Promise<SignInState>(async (resolve, reject) => {
        try {
            const token: KakaoOAuthToken = await login();

            resolve({ message: "로그인 성공", login_method: "kakao", id_token: token.idToken, access_token: token.accessToken });
        } catch(error) {
            reject({ message: "알 수 없는 에러가 발생 했습니다.", login_method: "kakao", error });
        }
    });
};

const kakaoSignOut = async () => {
    const unlink_message = await unlink();
    console.log(JSON.stringify({
        unlink_message
    }));
}

export {
    kakaoSignIn,
    kakaoSignOut
}