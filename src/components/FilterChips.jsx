import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, radii } from "../constants/theme";

export default function FilterChips({
    options,
    selected,
    onChange,
    style,
    wrap = false,
    accessibilityLabel,
}) {
    const chips = options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;
        const active = Array.isArray(selected) ? selected.includes(value) : selected === value;
        return (
            <Pressable
                key={value}
                onPress={() => onChange(value)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                style={({ pressed }) => [
                    styles.chip,
                    active && styles.selected,
                    pressed && styles.pressed,
                ]}
            >
                <Text style={[styles.label, active && styles.selectedLabel]}>{label}</Text>
            </Pressable>
        );
    });
    if (wrap)
        return (
            <View accessibilityLabel={accessibilityLabel} style={[styles.row, styles.wrap, style]}>
                {chips}
            </View>
        );
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            accessibilityLabel={accessibilityLabel}
            contentContainerStyle={[styles.row, style]}
            style={styles.scroll}
        >
            {chips}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    scroll: { flexGrow: 0, marginBottom: 16 },
    row: { flexDirection: "row", gap: 8, paddingVertical: 2 },
    wrap: { flexWrap: "wrap", marginBottom: 16 },
    chip: {
        minHeight: 44,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.md,
        backgroundColor: colors.surface,
        justifyContent: "center",
        alignItems: "center",
    },
    selected: { backgroundColor: colors.primary, borderColor: colors.primary },
    label: { fontSize: 15, fontWeight: "500", color: colors.muted },
    selectedLabel: { color: colors.onPrimary },
    pressed: { opacity: 0.75 },
});
