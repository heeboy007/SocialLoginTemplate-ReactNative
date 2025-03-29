import React, { useEffect, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../context/RootNavigator";

function Connection(): React.JSX.Element {
    const [ dest, setDest ] = useState("192.168.152.38:8080");
    const { login, is_login, social_result } = useAuthContext();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        if(is_login){
            //TO onboard or whatever...
        }
    }, [is_login])

    return <SafeAreaView className="bg-gray-100 p-4 min-h-full min-w-full flex flex-col">
        <View className="mx-auto w-full bg-white shadow-lg rounded-lg flex-grow flex justify-center items-center">
            <Text className="mx-auto my-5 font-bold text-center text-2xl">
                Template Login
            </Text>

            <Text className="mx-auto my-5 font-bold text-center text-base color-slate-600 max-w-[50vw]">
                {JSON.stringify(social_result)}
            </Text>

            
            <Pressable 
                className="bg-[#1E90FF] mx-auto w-[80vw] h-[7vw] rounded-3xl flex justify-center items-center" 
                onPress={() => {
                    login("google")
                }}>
                <Text className="text-2xl font-base text-white">Google</Text>
            </Pressable>
        </View>
    </SafeAreaView>
}

export default Connection;