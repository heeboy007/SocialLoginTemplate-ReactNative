
import { GOOGLE_WEB_OAUTH, GOOGLE_IOS_OAUTH } from '@env'

const default_server_url = "http://10.0.2.2:8080";

//you would usually like to hide this information.
const google_web_oauth = GOOGLE_WEB_OAUTH;
const google_ios_oauth = GOOGLE_IOS_OAUTH;

export {
    default_server_url,
    google_web_oauth,
    google_ios_oauth
}