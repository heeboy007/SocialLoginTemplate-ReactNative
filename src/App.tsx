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
import { google_ios_oauth, google_web_oauth } from "./asset/const";

const queryClient = new QueryClient();

GoogleSignin.configure({
  webClientId: google_web_oauth,
  iosClientId: google_ios_oauth
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