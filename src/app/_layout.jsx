import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: "#203B35",
            },
            headerTintColor: "#fff"
        }}>
            <Stack.Screen name="index" options={{
                title: "Welcome",
                //headerShown: false
            }} />
            <Stack.Screen name="login" options={{
                title: "Login"
            }} />
            <Stack.Screen name="tasks" options={{
                title: "My Tasks"
            }} />
            <Stack.Screen name="about" options={{
                title: "About this app",
            }} />
            <Stack.Screen name="details" options={{
                title: "Task details"
            }} />
            <Stack.Screen name="httprequest" options={{
                title: "HTTP Request"
            }} />
        </Stack>
    )
}
