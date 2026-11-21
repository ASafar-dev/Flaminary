import { Ionicons } from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";
import { colors, radii, typography } from "../constants/theme";
import AppButton from "./AppButton";

export default function EmptyState({ title, message, actionText, onAction, icon = "musical-notes-outline", style }) {
  return <View style={[styles.container, style]}><View style={styles.icon}><Ionicons name={icon} size={27} color={colors.lime} /></View><Text style={styles.title}>{title}</Text>{message ? <Text style={styles.message}>{message}</Text> : null}{actionText && onAction ? <AppButton text={actionText} onPress={onAction} variant="secondary" style={styles.action} /> : null}</View>;
}
const styles = StyleSheet.create({
  container: { alignItems: "center", paddingHorizontal: 25, paddingVertical: 40, borderWidth: 1, borderStyle: "dashed", borderColor: colors.border, borderRadius: radii.lg, marginVertical: 8 }, icon: { width: 62, height: 62, borderRadius: 22, backgroundColor: colors.surfaceRaised, justifyContent: "center", alignItems: "center", marginBottom: 20 }, title: { ...typography.heading, color: colors.text, textAlign: "center", fontSize: 22 }, message: { ...typography.body, color: colors.muted, textAlign: "center", marginTop: 9, maxWidth: 330 }, action: { marginTop: 24, minWidth: 170 },
});
