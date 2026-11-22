import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PracticeTabs() {
    const insets = useSafeAreaInsets();
    return (
        <Tabs
            initialRouteName="today"
            backBehavior="history"
            screenOptions={{
                headerShown: false,
                sceneStyle: { backgroundColor: "#F5F3EE" },
                tabBarActiveTintColor: "#285548",
                tabBarInactiveTintColor: "#61736B",
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopColor: "#D8DED7",
                    height: 60 + Math.max(insets.bottom, 10),
                    paddingTop: 8,
                    paddingBottom: Math.max(insets.bottom, 10),
                },
                tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
            }}
        >
            <Tabs.Screen
                name="today"
                options={{
                    title: "Today",
                    tabBarAccessibilityLabel: "Today",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            accessible={false}
                            importantForAccessibility="no"
                            name="sunny-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Challenges",
                    tabBarAccessibilityLabel: "Challenges",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            accessible={false}
                            importantForAccessibility="no"
                            name="albums-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="progress"
                options={{
                    title: "Progress",
                    tabBarAccessibilityLabel: "Progress",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            accessible={false}
                            importantForAccessibility="no"
                            name="stats-chart-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
