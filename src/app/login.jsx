import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import BackBar from "../components/BackBar";
import FeedbackBanner from "../components/FeedbackBanner";
import { colors } from "../constants/theme";
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
        setError(result.success ? "" : result.error || "Check your email and password.");
        if (result.success) router.replace("/today");
    }
    function fillDemo() {
        setEmail("student@example.com");
        setPassword("password2026");
        setErrors({});
        setError("");
    }
    return (
        <AppScreen>
            <BackBar onBack={() => (router.canGoBack() ? router.back() : router.replace("/"))} />
            <Text accessibilityRole="header" style={styles.heading}>
                Sign in
            </Text>
            <Text style={styles.description}>
                Use the demo account to open your saved challenges.
            </Text>
            <View style={styles.form}>
                <Text style={styles.label}>Email address</Text>
                <AppTextInput
                    accessibilityLabel="Email address"
                    value={email}
                    onChangeText={setEmail}
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholder="student@example.com"
                    error={errors.email}
                />
                <Text style={styles.label}>Password</Text>
                <AppTextInput
                    accessibilityLabel="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoComplete="current-password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    placeholder="Enter your password"
                    error={errors.password}
                    onSubmitEditing={handleLogin}
                />
                {!!error && (
                    <FeedbackBanner type="error" message={error} onDismiss={() => setError("")} />
                )}
                <AppButton text="Sign in" onPress={handleLogin} />
            </View>
            <View style={styles.demo}>
                <Text style={styles.demoTitle}>Demo account</Text>
                <Text selectable style={styles.demoText}>
                    student@example.com{"\n"}password2026
                </Text>
                <AppButton text="Use demo account" variant="secondary" onPress={fillDemo} />
            </View>
        </AppScreen>
    );
}
const styles = StyleSheet.create({
    heading: { fontSize: 28, fontWeight: "600", color: colors.text, marginBottom: 12 },
    description: { fontSize: 16, lineHeight: 24, color: colors.muted, marginBottom: 24 },
    form: { gap: 8 },
    label: { fontSize: 15, fontWeight: "600", color: colors.text },
    demo: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        padding: 18,
        marginTop: 28,
        gap: 12,
    },
    demoTitle: { fontSize: 16, fontWeight: "600", color: colors.text },
    demoText: { fontSize: 15, lineHeight: 23, color: colors.muted },
});
