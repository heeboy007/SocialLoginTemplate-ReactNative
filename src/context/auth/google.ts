import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { SignInError, SignInState } from './signInResult';

// Somewhere in your code
function googleSignIn(): Promise<SignInState> {
    return new Promise<SignInState>(async (resolve, reject) => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
                console.log(JSON.stringify(response.data));
                resolve({ message: "로그인 성공", login_method: "google", id_token: response.data.idToken, access_token: response.data.serverAuthCode });
            } else {
                const singInError: SignInError = { message: "로그인 취소", login_method: "google" };
                reject(singInError);
            }
        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                case statusCodes.IN_PROGRESS:
                    const singInErrorPo: SignInError = { message: "로그인 중입니다. 조금 기다려 주세요.", login_method: "google", error: error };
                    reject(singInErrorPo);
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    const singInErrorPl: SignInError = { message: "Play 서비스를 불러올 수 없습니다. 안드로이드의 경우, Google Play및 관련 앱들을 업데이트 해주세요.", 
                        login_method: "google", error: error };
                    reject(singInErrorPl);
                    break;
                default:
                    const singInErrorUn: SignInError = { message: "로그인 도중, 알 수 없는 에러가 발생 했습니다.", 
                        login_method: "google", error: error };
                    reject(singInErrorUn);
                    break;
                }
            } else {
                const singInError: SignInError = { message: "로그인 도중, 알 수 없는 에러가 발생 했습니다.", 
                    login_method: "google", error: error };
                reject(singInError);
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