import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppScreen from "../components/AppScreen";
import Brand from "../components/Brand";
import EmptyState from "../components/EmptyState";
import { AppProvider, useApp } from "../context/AppContext";

function Navigation() {
    const { signedIn, isLoading, loadError, retryLoad } = useApp();

    if (isLoading) {
        return (
            <AppScreen centered>
                <Brand />
                <ActivityIndicator color="#D9FC80" size="large" style={styles.loader} />
                <Text style={styles.loadingText}>Opening your practice library…</Text>
            </AppScreen>
        );
    }

    if (loadError) {
        return (
            <AppScreen centered>
                <Brand />
                <EmptyState icon="cloud-offline-outline" title="Your library needs a moment."
                    message={loadError} actionText="Try loading again" onAction={retryLoad} />
            </AppScreen>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false, contentStyle: styles.background }}>
            <Stack.Protected guard={!signedIn}>
                <Stack.Screen name="index" />
                <Stack.Screen name="login" />
            </Stack.Protected>
            <Stack.Protected guard={signedIn}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="challenge/[id]" />
                <Stack.Screen name="editor" />
            </Stack.Protected>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AppProvider>
                <StatusBar style="light" />
                <Navigation />
            </AppProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    background: { backgroundColor: "#111610" },
    loader: { marginTop: 40, marginBottom: 20 },
    loadingText: { color: "#A3AD9C", textAlign: "center", fontSize: 15 }
});
