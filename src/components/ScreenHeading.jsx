import { StyleSheet, Text, View } from "react-native";
import { colors, typography } from "../constants/theme";

export default function ScreenHeading({ eyebrow, title, subtitle, right, style }) {
  return (
    <View style={[styles.heading, style]}>
      <View style={styles.copy}>{eyebrow ? <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text> : null}<Text accessibilityRole="header" style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  heading: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 28 }, copy: { flex: 1 }, eyebrow: { ...typography.eyebrow, color: colors.lime, marginBottom: 8 }, title: { ...typography.title, color: colors.text }, subtitle: { ...typography.body, color: colors.muted, marginTop: 10 }, right: { flexShrink: 0 },
});
