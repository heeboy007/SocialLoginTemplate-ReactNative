import { Pressable, Text, View } from "react-native"
import { useAuthContext } from "../../AuthContext"

import Naver from '../../../asset/svg/naver.svg';

const NaverButton = () => {
    const { login } = useAuthContext();

    return <Pressable 
        className="bg-[#2DB400] mx-auto w-[80vw] rounded-3xl flex flex-row justify-center items-center p-3 m-1" 
        onPress={() => { login("naver") }}>
        <View className="flex-1 flex justify-center items-end mr-4 pr-4">
            <Naver width={20} height={20}/>
        </View>

        <Text className="flex-1 text-2xl font-base text-white text-start ml-2">로그인</Text>
    </Pressable>
}

export default NaverButton;