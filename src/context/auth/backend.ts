import axios from "axios";
import { backend_url } from "../../asset/const";
import { LoginMethod, SignInState } from "./signInResult";

const backendAuthSuffix = (method: LoginMethod) => {
    switch(method) {
        case "google":
            return "/auth/google";
        case "kakao":
            return "/auth/kakao";
        case "naver":
            return "/auth/naver";
    }
}

const backendLogin = async (state: SignInState, method: LoginMethod) => {
    try {
        const suffix = backendAuthSuffix(method);
        
        console.log("sending to : " + backend_url + suffix);
        const response = await axios.post(backend_url + suffix, {
            id_token: state.id_token,
            access_token: state.access_token
        }, { timeout: 5000 });
    
        if(response.status == 200) {
            return response.data;
        } else {
            throw Error(response.data.message);
        }
    } catch(e) {
        console.log(e);
        throw e;
    }
}

export {
    backendLogin
}