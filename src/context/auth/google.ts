import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { SignInState } from './signInResult';

// Somewhere in your code
function googleSignIn(): Promise<SignInState> {
    return new Promise<SignInState>(async (resolve, reject) => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
                resolve({ cancel: false, message: JSON.stringify(response.data), login_method: "google" });
            } else {
                reject({ cancel: true, message: "로그인 취소", login_method: "google" });
            }
        } catch (error) {
            console.log(error);
            console.log(JSON.stringify(error));
            if (isErrorWithCode(error)) {
                switch (error.code) {
                case statusCodes.IN_PROGRESS:
                    reject({ cancel: true, message: "로그인 중입니다. 조금 기다려 주세요.", login_method: "google" });
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    reject({ cancel: true, message: "Play 서비스를 불러올 수 없습니다. 안드로이드의 경우, Google Play및 관련 앱들을 업데이트 해주세요.", login_method: "google" });
                    break;
                default:
                    reject({ cancel: true, message: "로그인 도중, 알 수 없는 에러가 발생 했습니다.", login_method: "google" });
                    break;
                }
            } else {
                reject({ cancel: true, message: "알 수 없는 에러가 발생 했습니다.", login_method: "google" });
            }
        }
    })
};

const googleSignOut = async () => {
    await GoogleSignin.signOut();
};

export {
    googleSignIn,
    googleSignOut
}