import { Ionicons } from "@react-native-vector-icons/ionicons";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors, radii } from "../constants/theme";

export default function AppButton({ text, onPress, variant = "primary", disabled = false, loading = false, icon, style, textStyle, ...props }) {
  const inactive = disabled || loading;
  const foreground = variant === "primary" ? colors.onLime : variant === "danger" ? colors.error : colors.text;
  return (
    <Pressable onPress={onPress} disabled={inactive} accessibilityRole="button" accessibilityLabel={text} accessibilityState={{ disabled: inactive, busy: loading }} style={({ pressed }) => [styles.button, styles[variant], inactive && styles.disabled, pressed && styles.pressed, style]} {...props}>
      {loading ? <ActivityIndicator size="small" color={foreground} accessible={false} importantForAccessibility="no" /> : typeof icon === "string" ? <Ionicons name={icon} size={19} color={foreground} accessible={false} importantForAccessibility="no" /> : icon}
      {text ? <Text style={[styles.text, { color: foreground }, textStyle]}>{text}</Text> : null}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: { minHeight: 54, paddingHorizontal: 20, paddingVertical: 15, borderRadius: radii.md, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 9, borderWidth: 1 },
  primary: { backgroundColor: colors.lime, borderColor: colors.lime }, secondary: { backgroundColor: colors.surface, borderColor: colors.border },
  ghost: { backgroundColor: "transparent", borderColor: "transparent" }, danger: { backgroundColor: colors.errorSurface, borderColor: "#674338" },
  text: { fontSize: 15, fontWeight: "700", lineHeight: 21 }, disabled: { opacity: 0.45 }, pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
});
