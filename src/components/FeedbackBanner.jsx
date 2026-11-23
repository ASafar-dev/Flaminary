import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, typography } from "../constants/theme";

export default function FeedbackBanner({ message, type = "error", onDismiss, style }) {
    if (!message) return null;
    const error = type === "error";
    const color = error ? colors.error : colors.primary;
    return (
        <View
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            style={[styles.banner, error && styles.error, style]}
        >
            <Ionicons
                name={error ? "alert-circle-outline" : "checkmark-circle-outline"}
                size={21}
                color={color}
            />
            <Text style={[styles.message, { color }]}>{message}</Text>
            {onDismiss ? (
                <Pressable
                    onPress={onDismiss}
                    accessibilityRole="button"
                    accessibilityLabel="Dismiss message"
                    hitSlop={10}
                    style={styles.dismiss}
                >
                    <Ionicons name="close" size={18} color={color} />
                </Pressable>
            ) : null}
        </View>
    );
}
const styles = StyleSheet.create({
    banner: {
        backgroundColor: colors.surfaceRaised,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: radii.md,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 16,
    },
    error: { backgroundColor: colors.errorSurface, borderColor: colors.errorBorder },
    message: { ...typography.small, fontSize: 15, lineHeight: 22, flex: 1 },
    dismiss: { minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" },
});
