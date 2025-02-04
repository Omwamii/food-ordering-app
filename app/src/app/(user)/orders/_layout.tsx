import { Stack, Link } from "expo-router"
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";


export default function MenuStack() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Orders'}}/>
        </Stack>
    )
}