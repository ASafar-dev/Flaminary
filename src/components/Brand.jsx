import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";

export default function Brand({ compact = false, style }) {
    return (
        <View
            accessibilityLabel="Flaminary"
            style={[styles.brand, compact && styles.compact, style]}
        >
            <View
                accessible={false}
                importantForAccessibility="no-hide-descendants"
                style={styles.mark}
            >
                <View style={styles.drumBody} />
                <View style={styles.drumHead} />
                <View style={[styles.lug, styles.leftLug]} />
                <View style={[styles.lug, styles.rightLug]} />
                <View style={styles.stickOne} />
                <View style={styles.stickTwo} />
            </View>
            <Text style={styles.name}>Flaminary</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    brand: { flexDirection: "row", alignItems: "center", gap: 10 },
    compact: { gap: 8 },
    mark: { width: 40, height: 40 },
    drumBody: {
        position: "absolute",
        left: 6,
        top: 20,
        width: 28,
        height: 13,
        borderRadius: 3,
        backgroundColor: colors.primary,
    },
    drumHead: {
        position: "absolute",
        left: 6,
        top: 16,
        width: 28,
        height: 9,
        borderRadius: 14,
        backgroundColor: colors.surface,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    lug: { position: "absolute", top: 25, width: 2, height: 6, backgroundColor: colors.surface },
    leftLug: { left: 12 },
    rightLug: { left: 26 },
    stickOne: {
        position: "absolute",
        left: 6,
        top: 10,
        width: 18,
        height: 2,
        borderRadius: 2,
        backgroundColor: colors.primary,
        transform: [{ rotate: "25deg" }],
    },
    stickTwo: {
        position: "absolute",
        left: 17,
        top: 7,
        width: 18,
        height: 2,
        borderRadius: 2,
        backgroundColor: colors.primary,
        transform: [{ rotate: "25deg" }],
    },
    name: { fontSize: 22, fontWeight: "600", color: colors.text, lineHeight: 29 },
});
