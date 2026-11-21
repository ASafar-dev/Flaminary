import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";

export default function Brand({ compact = false, style }) {
  return (
    <View accessibilityLabel="Flaminary" style={[styles.brand, style]}>
      <View style={[styles.mark, compact && styles.compactMark]}><View style={styles.stickOne} /><View style={styles.stickTwo} /><View style={styles.hit} /></View>
      <View><Text style={[styles.name, compact && styles.compactName]}>flaminary<Text style={styles.dot}>.</Text></Text>{!compact && <Text style={styles.tagline}>A LITTLE LIMIT. A NEW RHYTHM.</Text>}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  brand: { flexDirection: "row", alignItems: "center", gap: 11 }, mark: { width: 43, height: 43, borderRadius: 13, backgroundColor: colors.lime, overflow: "hidden" }, compactMark: { width: 35, height: 35, borderRadius: 11 },
  stickOne: { position: "absolute", width: 4, height: 28, backgroundColor: colors.onLime, left: "38%", top: "16%", borderRadius: 4, transform: [{ rotate: "-28deg" }] },
  stickTwo: { position: "absolute", width: 4, height: 22, backgroundColor: colors.onLime, left: "60%", top: "22%", borderRadius: 4, transform: [{ rotate: "29deg" }] }, hit: { position: "absolute", width: 4, height: 4, backgroundColor: colors.onLime, borderRadius: 3, left: "20%", top: "22%" },
  name: { fontSize: 28, fontWeight: "800", color: colors.text, letterSpacing: -1.3, lineHeight: 32 }, compactName: { fontSize: 23, lineHeight: 28 }, dot: { color: colors.lime }, tagline: { fontSize: 8, letterSpacing: 1.4, color: colors.muted, fontWeight: "700", marginTop: 4 },
});
