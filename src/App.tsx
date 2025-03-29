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

const queryClient = new QueryClient();

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