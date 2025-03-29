import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { SignInResult } from './signInResult';
import { web_client_oauth } from '../../asset/const';

GoogleSignin.configure({
    webClientId: web_client_oauth
});

// Somewhere in your code
function googleSignIn(): Promise<SignInResult> {
    console.log("googleSignin");
    return new Promise<SignInResult>(async (resolve, reject) => {
        try {
            console.log("con 1");
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
                console.log("success " + JSON.stringify(response.data));
                resolve({ cancel: false, message: JSON.stringify(response.data), login_method: "google" });
            } else {
                console.log("maybe not success");
                reject({ cancel: true, message: "로그인 취소", login_method: "google" });
            }
        } catch (error) {
            console.log("err");
            console.log(error);
            console.log(JSON.stringify(error));
            if (isErrorWithCode(error)) {
                switch (error.code) {
                case statusCodes.IN_PROGRESS:
                    console.log("err1");
                    reject({ cancel: true, message: "로그인 중입니다. 조금 기다려 주세요.", login_method: "google" });
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    console.log("err2");
                    reject({ cancel: true, message: "Play 서비스를 불러올 수 없습니다. 안드로이드의 경우, Google Play및 관련 앱들을 업데이트 해주세요.", login_method: "google" });
                    break;
                default:
                    console.log("err3");
                    reject({ cancel: true, message: "로그인 도중, 알 수 없는 에러가 발생 했습니다.", login_method: "google" });
                    break;
                }
            } else {
                reject({ cancel: true, message: "알 수 없는 에러가 발생 했습니다.", login_method: "google" });
            }
        }
    })
};

export {
    googleSignIn
}