import { KakaoOAuthToken, login, logout, unlink } from "@react-native-seoul/kakao-login";
import { SignInState } from "./signInResult";

const kakaoSignIn = async (): Promise<SignInState> => {
    return new Promise<SignInState>(async (resolve, reject) => {
        try {
            const token: KakaoOAuthToken = await login();

            console.log(JSON.stringify(token));
            resolve({ cancel: false, message: JSON.stringify(token), login_method: "kakao" });
        } catch(error) {
            console.log(JSON.stringify(error));
            reject({ cancel: true, message: "알 수 없는 에러가 발생 했습니다.", login_method: "kakao" });
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