import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";

const pieces = [
  { id: "kick", label: "KICK", left: "34%", top: "43%", size: 88 },
  { id: "rack-tom", label: "TOM 01", left: "25%", top: "22%", size: 62 },
  { id: "floor-tom", label: "TOM 02", left: "63%", top: "46%", size: 73 },
  { id: "snare", label: "SNARE", left: "14%", top: "53%", size: 61 },
  { id: "hi-hat", label: "HATS", left: "2%", top: "30%", size: 65, cymbal: true },
  { id: "crash", label: "CRASH", left: "5%", top: "1%", size: 76, cymbal: true },
  { id: "ride", label: "RIDE", left: "63%", top: "5%", size: 86, cymbal: true },
];

export default function DrumKitIllustration({ kitPieces, style, showLabels = true }) {
  return (
    <View accessibilityRole="image" accessibilityLabel={kitPieces ? `Allowed kit pieces: ${kitPieces.join(", ")}` : "Illustration of a drum kit"} style={[styles.container, style]}>
      <View style={styles.kit}>
        <View style={styles.orbit} /><View style={styles.axisVertical} /><View style={styles.axisHorizontal} />
        {pieces.map((piece) => {
          const active = !kitPieces || kitPieces.includes(piece.id);
          const color = active ? colors.lime : "#617151";
          return <View key={piece.id} style={[styles.piece, { left: piece.left, top: piece.top, width: piece.size, height: piece.size, borderColor: color, backgroundColor: active ? "#29361D" : "#192015", opacity: active ? 1 : 0.36 }, piece.cymbal && styles.cymbal]}><View style={[styles.innerRing, { borderColor: color }, piece.cymbal && styles.cymbalRing]} />{piece.cymbal ? <View style={[styles.cymbalCenter, { backgroundColor: color }]} /> : null}{showLabels ? <Text style={[styles.label, { color }, piece.cymbal && styles.cymbalLabel]}>{piece.label}</Text> : null}{!piece.cymbal ? <><View style={[styles.lug, styles.topLug, { backgroundColor: color }]} /><View style={[styles.lug, styles.bottomLug, { backgroundColor: color }]} /></> : null}</View>;
        })}
        <View style={styles.stickOne} /><View style={styles.stickTwo} /><View style={styles.kickPedal} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" }, kit: { width: 280, height: 245, maxWidth: "100%" }, orbit: { position: "absolute", width: 235, height: 235, left: 22, top: 0, borderWidth: 1, borderStyle: "dashed", borderColor: "#303D26", borderRadius: 120 }, axisVertical: { position: "absolute", width: 1, height: 225, backgroundColor: "#283222", left: "50%", top: 0 }, axisHorizontal: { position: "absolute", width: 270, height: 1, backgroundColor: "#283222", left: 5, top: "46%" },
  piece: { position: "absolute", borderRadius: 100, borderWidth: 2, alignItems: "center", justifyContent: "center" }, cymbal: { borderWidth: 1 }, innerRing: { position: "absolute", top: 5, left: 5, bottom: 5, right: 5, borderWidth: 1, borderRadius: 100, opacity: 0.35 }, cymbalRing: { top: 12, left: 12, bottom: 12, right: 12 }, cymbalCenter: { width: 6, height: 6, borderRadius: 4, marginBottom: 10 }, label: { fontSize: 8, fontWeight: "700", letterSpacing: 1.2 }, cymbalLabel: { fontSize: 7 }, lug: { position: "absolute", width: 7, height: 3, borderRadius: 1 }, topLug: { top: -2 }, bottomLug: { bottom: -2 },
  stickOne: { position: "absolute", height: 77, width: 3, backgroundColor: colors.text, borderRadius: 2, left: "43%", top: "68%", transform: [{ rotate: "-38deg" }] }, stickTwo: { position: "absolute", height: 77, width: 3, backgroundColor: colors.text, borderRadius: 2, left: "55%", top: "68%", transform: [{ rotate: "38deg" }] }, kickPedal: { position: "absolute", height: 24, width: 12, borderWidth: 1, borderColor: "#718A51", borderRadius: 4, left: "47%", top: "80%", backgroundColor: colors.surfaceRaised },
});
