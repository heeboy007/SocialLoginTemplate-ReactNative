declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}

declare module '@env' {
    export const GOOGLE_WEB_OAUTH: string;
    export const GOOGLE_IOS_OAUTH: string;
    export const NAVER_CONSUMER_KEY: string;
    export const NAVER_CONSUMER_SECRET: string;
    export const NAVER_IOS_URL_SCHEME: string;
    export const BACKEND_URL: string;
}