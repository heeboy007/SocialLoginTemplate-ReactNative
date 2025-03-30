import { Pressable, Text, View } from "react-native"
import { useAuthContext } from "../../AuthContext"

const LogoutButton = () => {
    const { logout } = useAuthContext();

    return <Pressable 
        className="bg-blue-400 mx-auto w-[80vw] rounded-3xl flex flex-row justify-center items-center p-3 m-1" 
        onPress={() => { logout() }}>
        <Text className="flex-1 text-2xl font-base text-white ml-2 text-center">로그아웃</Text>
    </Pressable>
}

export default LogoutButton;