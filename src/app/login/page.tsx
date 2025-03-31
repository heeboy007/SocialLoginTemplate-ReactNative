import React, { useEffect, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../context/RootNavigator";
import GoogleButton from "../../context/auth/buttons/GoogleButton";
import KakaoButton from "../../context/auth/buttons/KakaoButton";
import LogoutButton from "../../context/auth/buttons/LogoutButton";
import NaverButton from "../../context/auth/buttons/NaverButton";

function Connection(): React.JSX.Element {
    const { message, socialSignIn } = useAuthContext();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return <SafeAreaView className="bg-gray-100 p-4 min-h-full min-w-full flex flex-col">
        <View className="mx-auto w-full bg-white shadow-lg rounded-lg flex-grow flex justify-center items-center">
            <Text className="mx-auto my-5 font-bold text-center text-2xl">
                Template Login
            </Text>

            <Text className="mx-auto my-5 font-bold text-center text-base color-slate-600 max-w-[50vw]">
                id_token:{socialSignIn?.id_token || "토큰이 없습니다."}
            </Text>

            <Text className="mx-auto my-5 font-bold text-center text-base color-slate-600 max-w-[50vw]">
                access_token:{socialSignIn?.access_token || "토큰이 없습니다."}
            </Text>

            <Text className="mx-auto my-5 font-bold text-center text-base color-slate-600 max-w-[50vw]">
                {message}
            </Text>
            
            <GoogleButton/>
            <KakaoButton/>
            <NaverButton/>
            <LogoutButton/>
        </View>
    </SafeAreaView>
}

export default Connection;