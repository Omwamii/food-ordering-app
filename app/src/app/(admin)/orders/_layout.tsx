import { Stack, Link } from "expo-router"
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";


export default function MenuStack() {
    return (
        <Stack>
            <Stack.Screen name="list" options={{ headerShown: false}}/>
        </Stack>
    )
}