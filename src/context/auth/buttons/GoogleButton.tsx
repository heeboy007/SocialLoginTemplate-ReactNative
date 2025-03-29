import { Pressable, Text, View } from "react-native"
import { useAuthContext } from "../../AuthContext"

import Google from '../../../asset/svg/google.svg';

const GoogleButton = () => {
    const { login } = useAuthContext();

    return <Pressable 
        className="bg-white mx-auto w-[80vw] rounded-3xl flex flex-row justify-center items-center border border-black p-3" 
        onPress={() => { login("google") }}>
        <View className="flex-1 flex justify-center items-end mr-4">
            <Google width={20} height={20}/>
        </View>

        <Text className="flex-1 text-2xl font-base text-black text-start ml-4">로그인</Text>
    </Pressable>
}

export default GoogleButton;