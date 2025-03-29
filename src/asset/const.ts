
import { GOOGLE_WEB_OAUTH } from '@env'

const default_server_url = "http://10.0.2.2:8080";

//you would usually like to hide this information.
const web_client_oauth = GOOGLE_WEB_OAUTH;

export {
    default_server_url,
    web_client_oauth
}