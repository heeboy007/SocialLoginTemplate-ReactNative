import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import Login from "../app/login/page";

export type RootStackParamList = {
    Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    return <NavigationContainer>
    <Stack.Navigator 
        detachInactiveScreens={true}
        initialRouteName='Login' 
        screenOptions={{ ...TransitionPresets.SlideFromRightIOS, headerShown: false }}>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
}

export {
    RootNavigator
}
