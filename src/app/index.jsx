import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import Brand from "../components/Brand";
import { colors } from "../constants/theme";

export default function WelcomeScreen() {
    return (
        <AppScreen centered>
            <View style={styles.brand}>
                <Brand />
            </View>
            <Text accessibilityRole="header" style={styles.heading}>
                My drum practice
            </Text>
            <Text style={styles.description}>
                Choose a daily exercise, practise with its restrictions, and record your progress.
            </Text>
            <View style={styles.card}>
                <Text style={styles.title}>Daily challenge</Text>
                <Text style={styles.body}>
                    A fill or groove with a tempo, kit pieces, and a time limit.
                </Text>
                <Text style={[styles.title, styles.secondTitle]}>My challenges</Text>
                <Text style={styles.body}>
                    Save your own exercises. Edit them or return to a completed challenge.
                </Text>
            </View>
            <AppButton text="Start practising" onPress={() => router.push("/login")} />
            <Text style={styles.storage}>Your saved practice stays on this device.</Text>
        </AppScreen>
    );
}
const styles = StyleSheet.create({
    brand: { marginBottom: 32 },
    heading: { fontSize: 28, fontWeight: "600", color: colors.text, marginBottom: 12 },
    description: { fontSize: 16, lineHeight: 24, color: colors.muted, marginBottom: 24 },
    card: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        padding: 18,
        marginBottom: 24,
    },
    title: { fontSize: 17, fontWeight: "600", color: colors.text, marginBottom: 6 },
    secondTitle: { marginTop: 20 },
    body: { fontSize: 15, lineHeight: 23, color: colors.muted },
    storage: {
        fontSize: 13,
        lineHeight: 20,
        color: colors.muted,
        marginTop: 16,
        textAlign: "center",
    },
});
