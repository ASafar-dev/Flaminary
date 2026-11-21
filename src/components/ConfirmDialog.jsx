import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, typography } from "../constants/theme";
import AppButton from "./AppButton";
import FeedbackBanner from "./FeedbackBanner";

export default function ConfirmDialog({ visible, title, message, confirmText = "Delete challenge", onConfirm, onCancel, loading = false, error }) {
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={() => { if (!loading) onCancel(); }}><View style={styles.overlay}><Pressable style={StyleSheet.absoluteFillObject} onPress={loading ? undefined : onCancel} accessibilityRole="button" accessibilityLabel="Cancel deletion" /><View accessibilityViewIsModal style={styles.dialog}><View style={styles.icon}><Ionicons name="trash-outline" size={25} color={colors.error} accessible={false} importantForAccessibility="no" /></View><Text accessibilityRole="header" style={styles.title}>{title}</Text><Text style={styles.message}>{message}</Text><FeedbackBanner message={error} type="error" /><AppButton text={confirmText} variant="danger" onPress={onConfirm} loading={loading} /><AppButton text="Keep practising" variant="ghost" onPress={onCancel} disabled={loading} style={styles.cancel} /></View></View></Modal>;
}
const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.78)", justifyContent: "center", alignItems: "center", padding: 24 }, dialog: { width: "100%", maxWidth: 400, backgroundColor: colors.surface, borderRadius: radii.lg, padding: 26, borderWidth: 1, borderColor: colors.border }, icon: { width: 52, height: 52, borderRadius: 17, backgroundColor: colors.errorSurface, justifyContent: "center", alignItems: "center", marginBottom: 22 }, title: { ...typography.heading, color: colors.text }, message: { ...typography.body, color: colors.muted, marginTop: 10, marginBottom: 26 }, cancel: { marginTop: 7 },
});
