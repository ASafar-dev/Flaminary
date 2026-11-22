import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, typography } from "../constants/theme";

export default function ChallengeCard({ challenge, onPress, style }) {
    const completed = Boolean(challenge.completedAt);
    const restrictions = Array.isArray(challenge.restrictions)
        ? challenge.restrictions.join(" · ")
        : challenge.restrictions;
    const bpm = challenge.bpm || challenge.tempo;
    const minutes = challenge.minutes || challenge.practiceMinutes;
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${challenge.title}, ${challenge.category}, ${challenge.difficulty}${completed ? ", completed" : ""}`}
            onPress={() => onPress(challenge)}
            style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
        >
            <View style={styles.topRow}>
                <View style={styles.tags}>
                    <Text style={styles.category}>{challenge.category}</Text>
                    <Text style={styles.difficulty}>{challenge.difficulty}</Text>
                </View>
                {completed ? (
                    <Ionicons name="checkmark-circle" size={21} color={colors.primary} />
                ) : (
                    <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                )}
            </View>
            <Text style={styles.title}>{challenge.title}</Text>
            {restrictions || challenge.description ? (
                <Text numberOfLines={2} style={styles.description}>
                    {restrictions || challenge.description}
                </Text>
            ) : null}
            <View style={styles.bottomRow}>
                <View style={styles.metadata}>
                    {bpm ? <Text style={styles.metaText}>{bpm} BPM</Text> : null}
                    {minutes ? <Text style={styles.metaText}>{minutes} min</Text> : null}
                </View>
                {completed ? (
                    <Text style={styles.completed}>Completed</Text>
                ) : challenge.isCustom ? (
                    <Text style={styles.custom}>My challenge</Text>
                ) : null}
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        padding: 16,
        marginBottom: 12,
    },
    pressed: { backgroundColor: colors.surfaceRaised },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        gap: 10,
    },
    tags: { flexDirection: "row", alignItems: "center", gap: 8, flexShrink: 1, flexWrap: "wrap" },
    category: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.primary,
        backgroundColor: colors.surfaceRaised,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    difficulty: { fontSize: 14, color: colors.muted },
    title: { ...typography.heading, fontSize: 22, lineHeight: 28, color: colors.text },
    description: { ...typography.body, color: colors.muted, marginTop: 8 },
    bottomRow: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        marginTop: 14,
        paddingTop: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        flexWrap: "wrap",
    },
    metadata: { flexDirection: "row", gap: 16, flexWrap: "wrap" },
    metaText: { fontSize: 14, lineHeight: 21, color: colors.muted },
    completed: { fontSize: 14, fontWeight: "500", color: colors.primary },
    custom: { fontSize: 14, color: colors.muted },
});
