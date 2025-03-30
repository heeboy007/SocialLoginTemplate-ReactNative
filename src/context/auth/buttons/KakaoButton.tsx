import { Pressable, Text, View } from "react-native"
import { useAuthContext } from "../../AuthContext"

import Kakao from '../../../asset/svg/kakao.svg';

const KakaoButton = () => {
    const { login } = useAuthContext();

    return <Pressable 
        className="bg-[#FEE500] mx-auto w-[80vw] rounded-3xl flex flex-row justify-center items-center p-3 m-1" 
        onPress={() => { login("kakao") }}>
        <View className="flex-1 flex justify-center items-end mr-4 pr-4">
            <Kakao width={20} height={20}/>
        </View>

        <Text className="flex-1 text-2xl font-base text-black text-start ml-2">로그인</Text>
    </Pressable>
}

export default KakaoButton;