
import NaverLogin, { NaverLoginResponse } from "@react-native-seoul/naver-login";
import { SignInState } from "./signInResult";

const naverSignIn = async (): Promise<SignInState> => {
    return new Promise<SignInState>(async (resolve, reject) => {
        try {
            const response: NaverLoginResponse = await NaverLogin.login();

            if(response.isSuccess){
                //note that naver only gives access token
                resolve({ message: "로그인 성공", login_method: "naver", access_token: response.successResponse?.accessToken });
            } else {
                reject({ message: response.failureResponse?.message, login_method: "naver" });
            }
        } catch(error) {
            reject({ message: "알 수 없는 에러가 발생 했습니다.", login_method: "naver", error });
        }
    });
};

const naverSignOut = async () => {
    await NaverLogin.deleteToken();
    console.log("Naver logout triggered without errors.");
}

export {
    naverSignIn,
    naverSignOut
}