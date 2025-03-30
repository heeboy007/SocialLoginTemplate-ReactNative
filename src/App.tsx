/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "./global.css";
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { verifyInstallation } from 'nativewind';
import { AuthContextProvider } from "./context/AuthContext";
import { RootNavigator } from "./context/RootNavigator";

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { google_ios_oauth, google_web_oauth, naver_consumer_key, naver_consumer_secret, naver_ios_url_scheme } from "./asset/const";

import NaverLogin from "@react-native-seoul/naver-login";
import {name as appName} from '../app.json';

const queryClient = new QueryClient();

GoogleSignin.configure({
    webClientId: google_web_oauth,
    iosClientId: google_ios_oauth
});

NaverLogin.initialize({
    appName,
    consumerKey: naver_consumer_key,
    consumerSecret: naver_consumer_secret,
    serviceUrlSchemeIOS: naver_ios_url_scheme,
    disableNaverAppAuthIOS: true,
});

function App(): React.JSX.Element {
    //nativewind verify
    verifyInstallation()

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
            <RootNavigator />
            </AuthContextProvider>
        </QueryClientProvider>
    );
}

export default App;