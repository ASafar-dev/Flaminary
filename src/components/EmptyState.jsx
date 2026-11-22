import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";
import { colors, radii, typography } from "../constants/theme";
import AppButton from "./AppButton";

export default function EmptyState({
    title,
    message,
    actionText,
    onAction,
    icon = "musical-notes-outline",
    style,
}) {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.icon}>
                <Ionicons name={icon} size={27} color={colors.lime} />
            </View>
            <Text style={styles.title}>{title}</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}
            {actionText && onAction ? (
                <AppButton
                    text={actionText}
                    onPress={onAction}
                    variant="secondary"
                    style={styles.action}
                />
            ) : null}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 28,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        marginVertical: 8,
    },
    icon: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: colors.surfaceRaised,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,
    },
    title: { ...typography.heading, color: colors.text, textAlign: "center", fontSize: 22 },
    message: {
        ...typography.body,
        color: colors.muted,
        textAlign: "center",
        marginTop: 8,
        maxWidth: 330,
    },
    action: { marginTop: 20, minWidth: 160 },
});
