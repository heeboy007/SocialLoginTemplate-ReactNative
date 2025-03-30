
import NaverLogin, { NaverLoginResponse } from "@react-native-seoul/naver-login";
import { SignInState } from "./signInResult";

const naverSignIn = async (): Promise<SignInState> => {
    return new Promise<SignInState>(async (resolve, reject) => {
        try {
            const response: NaverLoginResponse = await NaverLogin.login();

            console.log(JSON.stringify(response));
            resolve({ cancel: false, message: JSON.stringify(response), login_method: "naver" });
        } catch(error) {
            console.log(JSON.stringify(error));
            reject({ cancel: true, message: "알 수 없는 에러가 발생 했습니다.", login_method: "naver" });
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