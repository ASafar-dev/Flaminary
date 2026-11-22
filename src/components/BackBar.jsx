import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";

export default function BackBar({ onBack, title, right, style }) {
    return (
        <View style={[styles.row, style]}>
            <Pressable
                onPress={onBack}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                hitSlop={6}
                style={({ pressed }) => [styles.back, pressed && styles.pressed]}
            >
                <Ionicons name="arrow-back" size={20} color={colors.text} />
                <Text style={styles.label}>Back</Text>
            </Pressable>
            {title ? (
                <Text numberOfLines={1} style={styles.title}>
                    {title}
                </Text>
            ) : (
                <View style={styles.spacer} />
            )}
            {right || null}
        </View>
    );
}
const styles = StyleSheet.create({
    row: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
    back: { flexDirection: "row", alignItems: "center", gap: 7, minHeight: 44, paddingRight: 10 },
    label: { color: colors.text, fontSize: 16, fontWeight: "500" },
    title: { flex: 1, color: colors.muted, fontSize: 14, textAlign: "right" },
    spacer: { flex: 1 },
    pressed: { opacity: 0.6 },
});
