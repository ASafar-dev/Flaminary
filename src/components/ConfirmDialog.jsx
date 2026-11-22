import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, typography } from "../constants/theme";
import AppButton from "./AppButton";
import FeedbackBanner from "./FeedbackBanner";

export default function ConfirmDialog({
    visible,
    title,
    message,
    confirmText = "Delete challenge",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    loading = false,
    error,
}) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => {
                if (!loading) onCancel();
            }}
        >
            <View style={styles.overlay}>
                <Pressable
                    style={StyleSheet.absoluteFillObject}
                    onPress={loading ? undefined : onCancel}
                    accessibilityRole="button"
                    accessibilityLabel="Cancel deletion"
                />
                <View accessibilityViewIsModal style={styles.dialog}>
                    <View style={styles.icon}>
                        <Ionicons
                            name="trash-outline"
                            size={25}
                            color={colors.error}
                            accessible={false}
                            importantForAccessibility="no"
                        />
                    </View>
                    <Text accessibilityRole="header" style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.message}>{message}</Text>
                    <FeedbackBanner message={error} type="error" />
                    <AppButton
                        text={confirmText}
                        variant="danger"
                        onPress={onConfirm}
                        loading={loading}
                    />
                    <AppButton
                        text={cancelText}
                        variant="secondary"
                        onPress={onCancel}
                        disabled={loading}
                        style={styles.cancel}
                    />
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    dialog: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: colors.surface,
        borderRadius: radii.lg,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border,
    },
    icon: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: colors.errorSurface,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    title: { ...typography.heading, color: colors.text },
    message: { ...typography.body, color: colors.muted, marginTop: 8, marginBottom: 20 },
    cancel: { marginTop: 10 },
});
