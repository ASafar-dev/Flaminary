import { Ionicons } from "@react-native-vector-icons/ionicons";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors, radii } from "../constants/theme";

export default function AppButton({
    text,
    onPress,
    variant = "primary",
    disabled = false,
    loading = false,
    icon,
    style,
    textStyle,
    ...props
}) {
    const inactive = disabled || loading;
    const foreground =
        variant === "primary"
            ? colors.onPrimary
            : variant === "danger"
              ? colors.error
              : colors.primary;
    return (
        <Pressable
            onPress={onPress}
            disabled={inactive}
            accessibilityRole="button"
            accessibilityLabel={text}
            accessibilityState={{ disabled: inactive, busy: loading }}
            style={({ pressed }) => [
                styles.button,
                styles[variant],
                inactive && styles.disabled,
                pressed && styles.pressed,
                style,
            ]}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={foreground}
                    accessible={false}
                    importantForAccessibility="no"
                />
            ) : typeof icon === "string" ? (
                <Ionicons
                    name={icon}
                    size={19}
                    color={foreground}
                    accessible={false}
                    importantForAccessibility="no"
                />
            ) : (
                icon
            )}
            {text ? (
                <Text style={[styles.text, { color: foreground }, textStyle]}>{text}</Text>
            ) : null}
        </Pressable>
    );
}
const styles = StyleSheet.create({
    button: {
        minHeight: 48,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: radii.md,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        borderWidth: 1,
    },
    primary: { backgroundColor: colors.primary, borderColor: colors.primary },
    secondary: { backgroundColor: colors.surface, borderColor: colors.border },
    ghost: { backgroundColor: "transparent", borderColor: "transparent" },
    danger: { backgroundColor: colors.errorSurface, borderColor: colors.errorBorder },
    text: { fontSize: 16, fontWeight: "600", lineHeight: 23 },
    disabled: { opacity: 0.5 },
    pressed: { opacity: 0.75 },
});
