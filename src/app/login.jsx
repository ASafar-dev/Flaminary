import { useState } from "react";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import BackBar from "../components/BackBar";
import Brand from "../components/Brand";
import FeedbackBanner from "../components/FeedbackBanner";
import { useApp } from "../context/AppContext";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const { signIn } = useApp();

    function handleLogin() {
        const result = signIn(email, password);
        setErrors(result.errors || {});
        setError(result.success ? "" : result.error || "Check your details and try again.");
    }

    function fillDemo() {
        setEmail("student@example.com");
        setPassword("password2026");
        setErrors({});
        setError("");
    }

    return (
        <AppScreen>
            <BackBar onBack={() => router.canGoBack() ? router.back() : router.replace("/")} />
            <View style={styles.brand}><Brand /></View>
            <Text style={styles.eyebrow}>YOUR PRACTICE STARTS HERE</Text>
            <Text accessibilityRole="header" style={styles.heading}>Back to the{"\n"}<Text style={styles.accent}>good noise.</Text></Text>
            <Text style={styles.description}>Sign in to your local practice space. Your next idea is waiting.</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Email address</Text>
                <AppTextInput accessibilityLabel="Email address" value={email} onChangeText={setEmail}
                    autoComplete="email" autoCapitalize="none" autoCorrect={false} keyboardType="email-address"
                    placeholder="you@example.com" error={errors.email} />
                <Text style={styles.label}>Password</Text>
                <AppTextInput accessibilityLabel="Password" value={password} onChangeText={setPassword}
                    autoComplete="current-password" autoCapitalize="none" autoCorrect={false} secureTextEntry
                    placeholder="Enter your password" error={errors.password} onSubmitEditing={handleLogin} />
                {!!error && <FeedbackBanner type="error" message={error} onDismiss={() => setError("")} />}
                <AppButton text="Step into the practice room" icon="arrow-forward" onPress={handleLogin} />
            </View>
            <View style={styles.demo}>
                <Text style={styles.demoTitle}>TRY THE DEMO</Text>
                <Text selectable style={styles.demoText}>student@example.com{"\n"}password2026</Text>
                <AppButton text="Fill demo credentials" variant="secondary" onPress={fillDemo} />
            </View>
            <Text style={styles.note}>A mock account for this project. Your challenge library stays on this device. No account is created.</Text>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    brand: { marginTop: 28, marginBottom: 40 },
    eyebrow: { color: "#D9FC80", fontSize: 10, fontWeight: "700", letterSpacing: 1.5, marginBottom: 15 },
    heading: { fontSize: 42, lineHeight: 48, letterSpacing: -1.5, color: "#F4F3E9", fontWeight: "800" },
    accent: { color: "#D9FC80" },
    description: { color: "#A3AD9C", fontSize: 16, lineHeight: 24, marginTop: 15, marginBottom: 26 },
    form: { gap: 10 },
    label: { color: "#F4F3E9", fontSize: 13, fontWeight: "600", marginTop: 8 },
    demo: { borderColor: "#303C2B", borderWidth: 1, backgroundColor: "#1C231A", borderRadius: 18, padding: 20, marginTop: 28, gap: 12 },
    demoTitle: { color: "#D9FC80", fontSize: 10, fontWeight: "700", letterSpacing: 1.8 },
    demoText: { color: "#A3AD9C", fontSize: 14, lineHeight: 23 },
    note: { color: "#A3AD9C", fontSize: 12, lineHeight: 19, marginTop: 20, textAlign: "center" }
});
