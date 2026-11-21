import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PracticeTabs() {
    const insets = useSafeAreaInsets();
    return (
        <Tabs initialRouteName="today" backBehavior="history" screenOptions={{
            headerShown: false,
            sceneStyle: { backgroundColor: "#111610" },
            tabBarActiveTintColor: "#D9FC80",
            tabBarInactiveTintColor: "#8F9B87",
            tabBarStyle: { backgroundColor: "#151C13", borderTopColor: "#303C2B", height: 64 + Math.max(insets.bottom, 10), paddingTop: 10, paddingBottom: Math.max(insets.bottom, 10) },
            tabBarLabelStyle: { fontSize: 10, fontWeight: "600", letterSpacing: 0.3 }
        }}>
            <Tabs.Screen name="today" options={{ title: "Today", tabBarAccessibilityLabel: "Today", tabBarIcon: ({ color, size }) => <Ionicons accessible={false} importantForAccessibility="no" name="sunny-outline" size={size} color={color} /> }} />
            <Tabs.Screen name="explore" options={{ title: "Explore", tabBarAccessibilityLabel: "Explore", tabBarIcon: ({ color, size }) => <Ionicons accessible={false} importantForAccessibility="no" name="albums-outline" size={size} color={color} /> }} />
            <Tabs.Screen name="progress" options={{ title: "Progress", tabBarAccessibilityLabel: "Progress", tabBarIcon: ({ color, size }) => <Ionicons accessible={false} importantForAccessibility="no" name="stats-chart-outline" size={size} color={color} /> }} />
        </Tabs>
    );
}
