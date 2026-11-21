import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import Brand from "../components/Brand";
import DrumKitIllustration from "../components/DrumKitIllustration";

export default function WelcomeScreen() {
    return (
        <AppScreen contentStyle={styles.content}>
            <View style={styles.top}>
                <Brand />
                <Text style={styles.edition}>THE DAILY RHYTHM LAB</Text>
            </View>
            <View style={styles.hero}>
                <View style={styles.pill}><View style={styles.dot} /><Text style={styles.pillText}>A FRESH WAY TO PRACTISE</Text></View>
                <Text accessibilityRole="header" style={styles.heading}>Less routine.{"\n"}<Text style={styles.accent}>More rhythm.</Text></Text>
                <Text style={styles.description}>One creative constraint. A different idea every day. Find out what happens when you play outside your usual patterns.</Text>
            </View>
            <View style={styles.art}>
                <View style={styles.artHeading}><Text style={styles.artLabel}>YOUR KIT. NEW POSSIBILITIES.</Text><Ionicons name="sparkles-outline" size={19} color="#D9FC80" /></View>
                <DrumKitIllustration kitPieces={["kick", "rack-tom", "floor-tom"]} />
                <View style={styles.artFooter}><Text style={styles.number}>01 / ∞</Text><Text style={styles.caption}>Small rules. Big discoveries.</Text></View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.benefits}>
                    <Text style={styles.benefit}>DAILY PROMPTS</Text><Text style={styles.separator}>/</Text>
                    <Text style={styles.benefit}>YOUR OWN IDEAS</Text><Text style={styles.separator}>/</Text>
                    <Text style={styles.benefit}>REAL PROGRESS</Text>
                </View>
                <AppButton text="Find your next groove" icon="arrow-forward" onPress={() => router.push("/login")} />
                <Text style={styles.footnote}>For the drummer who’s still curious.</Text>
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    content: { paddingTop: 28, paddingBottom: 28 },
    top: { gap: 15 },
    edition: { fontSize: 10, letterSpacing: 2.4, color: "#A3AD9C" },
    hero: { marginTop: 40, marginBottom: 26 },
    pill: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#D9FC80" },
    pillText: { color: "#D9FC80", fontSize: 10, fontWeight: "700", letterSpacing: 1.4 },
    heading: { color: "#F4F3E9", fontSize: 45, lineHeight: 50, letterSpacing: -1.9, fontWeight: "800" },
    accent: { color: "#D9FC80" },
    description: { color: "#A3AD9C", fontSize: 16, lineHeight: 25, marginTop: 20, maxWidth: 500 },
    art: { borderRadius: 24, backgroundColor: "#1C231A", borderWidth: 1, borderColor: "#303C2B", padding: 20 },
    artHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
    artLabel: { color: "#A3AD9C", fontSize: 10, letterSpacing: 1.5 },
    artFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6, gap: 8 },
    number: { color: "#D9FC80", fontSize: 12, fontWeight: "700", letterSpacing: 1 },
    caption: { color: "#A3AD9C", fontSize: 12 },
    bottom: { marginTop: 28, gap: 14 },
    benefits: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 4 },
    benefit: { color: "#A3AD9C", fontSize: 9, fontWeight: "600", letterSpacing: 0.5 },
    separator: { color: "#53624A", fontSize: 10 },
    footnote: { color: "#A3AD9C", fontSize: 12, textAlign: "center" }
});
