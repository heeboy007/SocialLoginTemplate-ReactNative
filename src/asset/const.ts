
import { GOOGLE_WEB_OAUTH, GOOGLE_IOS_OAUTH, NAVER_CONSUMER_KEY, NAVER_CONSUMER_SECRET, NAVER_IOS_URL_SCHEME } from '@env'

const default_server_url = "http://10.0.2.2:8080";

//you would usually like to hide this information.
const google_web_oauth = GOOGLE_WEB_OAUTH;
const google_ios_oauth = GOOGLE_IOS_OAUTH;

const naver_consumer_key = NAVER_CONSUMER_KEY;
const naver_consumer_secret = NAVER_CONSUMER_SECRET;
const naver_ios_url_scheme =  NAVER_IOS_URL_SCHEME;

export {
    default_server_url,
    google_web_oauth,
    google_ios_oauth,

    naver_consumer_key,
    naver_consumer_secret,
    naver_ios_url_scheme
}