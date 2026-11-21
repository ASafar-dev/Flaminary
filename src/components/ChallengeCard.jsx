import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, typography } from "../constants/theme";

export default function ChallengeCard({ challenge, onPress, style }) {
  const completed = Boolean(challenge.completedAt);
  const restrictions = Array.isArray(challenge.restrictions) ? challenge.restrictions.join(" · ") : challenge.restrictions;
  const bpm = challenge.bpm || challenge.tempo;
  const minutes = challenge.minutes || challenge.practiceMinutes;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${challenge.title}, ${challenge.category}, ${challenge.difficulty}${completed ? ", completed" : ""}`} onPress={() => onPress(challenge)} style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}>
      <View style={styles.topRow}><View style={styles.tags}><Text style={styles.category}>{String(challenge.category).toUpperCase()}</Text><Text style={styles.divider}>/</Text><Text style={styles.difficulty}>{challenge.difficulty}</Text></View>{completed ? <Ionicons name="checkmark-circle" size={21} color={colors.lime} /> : <Ionicons name="arrow-forward" size={20} color={colors.muted} />}</View>
      <Text style={styles.title}>{challenge.title}</Text>
      {restrictions || challenge.description ? <Text numberOfLines={2} style={styles.description}>{restrictions || challenge.description}</Text> : null}
      <View style={styles.bottomRow}><View style={styles.metadata}>{bpm ? <View style={styles.meta}><Ionicons name="pulse-outline" size={14} color={colors.muted} /><Text style={styles.metaText}>{bpm} BPM</Text></View> : null}{minutes ? <View style={styles.meta}><Ionicons name="time-outline" size={14} color={colors.muted} /><Text style={styles.metaText}>{minutes} MIN</Text></View> : null}</View>{completed ? <Text style={styles.completed}>COMPLETED</Text> : challenge.isCustom ? <Text style={styles.custom}>YOUR CHALLENGE</Text> : null}</View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radii.lg, padding: 21, marginBottom: 13 }, pressed: { backgroundColor: colors.surfaceRaised, borderColor: "#536240" },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 17, gap: 12 }, tags: { flexDirection: "row", alignItems: "center", gap: 9, flexShrink: 1, flexWrap: "wrap" }, category: { fontSize: 10, fontWeight: "800", letterSpacing: 1.6, color: colors.lime }, divider: { color: colors.subtle, fontSize: 12 }, difficulty: { fontSize: 11, color: colors.muted },
  title: { ...typography.heading, fontSize: 23, lineHeight: 29, color: colors.text }, description: { ...typography.body, fontSize: 13, lineHeight: 21, color: colors.muted, marginTop: 8 },
  bottomRow: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 18, paddingTop: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }, metadata: { flexDirection: "row", gap: 17, flexWrap: "wrap" }, meta: { flexDirection: "row", gap: 5, alignItems: "center" }, metaText: { fontSize: 10, color: colors.muted, fontWeight: "600", letterSpacing: 0.5 }, completed: { fontSize: 9, fontWeight: "700", letterSpacing: 1, color: colors.lime }, custom: { fontSize: 9, fontWeight: "600", letterSpacing: 1, color: colors.subtle },
});
