import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import Brand from "../../components/Brand";
import DrumKitIllustration from "../../components/DrumKitIllustration";
import EmptyState from "../../components/EmptyState";
import FeedbackBanner from "../../components/FeedbackBanner";
import { useApp } from "../../context/AppContext.jsx";

export default function TodayScreen() {
    const { todayChallenge, todayKey, challenges, operationError, clearOperationError, retryLoad } = useApp();
    const completedCount = challenges.filter((challenge) => challenge.completedAt).length;
    const date = todayKey ? new Date(`${todayKey}T12:00:00`) : new Date();
    const dateLabel = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

    function openChallenge() {
        if (!todayChallenge) return;
        router.push({ pathname: "/challenge/[id]", params: { id: todayChallenge.id } });
    }

    return (
        <AppScreen>
            <View style={styles.topRow}>
                <Brand compact />
                <Text style={styles.date}>{dateLabel.toUpperCase()}</Text>
            </View>

            <View style={styles.introduction}>
                <Text style={styles.eyebrow}>YOUR DAILY CREATIVE PRACTICE</Text>
                <Text style={styles.heading}>A little constraint.{"\n"}<Text style={styles.headingAccent}>A lot of possibility.</Text></Text>
                <Text style={styles.subtitle}>Step outside your usual patterns. One idea, one kit, one day at a time.</Text>
            </View>

            {operationError ? <FeedbackBanner message={operationError} type="error" onDismiss={clearOperationError} /> : null}

            {todayChallenge ? (
                <>
                    <Pressable accessibilityRole="button" accessibilityLabel={`Open today's challenge: ${todayChallenge.title}`} onPress={openChallenge} style={({ pressed }) => [styles.dailyCard, pressed && styles.pressed]}>
                        <View style={styles.dailyTopRow}>
                            <View style={styles.liveLabel}><View style={styles.dot} /><Text style={styles.dailyEyebrow}>TODAY’S CHALLENGE</Text></View>
                            <Ionicons name="arrow-forward" size={22} color="#17200F" style={styles.diagonalArrow} />
                        </View>
                        <View style={styles.pills}>
                            <Text style={styles.pill}>{todayChallenge.category}</Text>
                            <Text style={styles.pill}>{todayChallenge.difficulty}</Text>
                        </View>
                        <Text style={styles.challengeTitle}>{todayChallenge.title}</Text>
                        <Text style={styles.restrictions}>{todayChallenge.restrictions}</Text>
                        <View style={styles.metrics}>
                            <View style={styles.metric}><Text style={styles.metricValue}>{todayChallenge.bpm}</Text><Text style={styles.metricLabel}>BPM</Text></View>
                            <View style={styles.metricDivider} />
                            <View style={styles.metric}><Text style={styles.metricValue}>{todayChallenge.timeSignature}</Text><Text style={styles.metricLabel}>TIME</Text></View>
                            <View style={styles.metricDivider} />
                            <View style={styles.metric}><Text style={styles.metricValue}>{todayChallenge.minutes}</Text><Text style={styles.metricLabel}>MINUTES</Text></View>
                        </View>
                        {todayChallenge.completedAt ? <View style={styles.completedLabel}><Ionicons name="checkmark-circle" size={18} color="#24431C" /><Text style={styles.completedText}>You’ve completed this challenge</Text></View> : null}
                    </Pressable>

                    <View style={styles.kitPanel}>
                        <View style={styles.kitHeading}><Text style={styles.sectionEyebrow}>YOUR PALETTE</Text><Text style={styles.kitCount}>{todayChallenge.kitPieces.length} kit pieces</Text></View>
                        <DrumKitIllustration kitPieces={todayChallenge.kitPieces} />
                        <Text style={styles.kitCaption}>Fewer options. More imagination.</Text>
                    </View>

                    <AppButton text={todayChallenge.completedAt ? "Revisit today’s challenge" : "Take today’s challenge"} onPress={openChallenge} icon="arrow-forward" />
                    <Text style={styles.rotationNote}>A new creative prompt each day. Go at your own pace.</Text>
                </>
            ) : challenges.length > 0 ? (
                <EmptyState icon="refresh-outline" title="Today’s prompt couldn’t load." message="Your challenges are still here. Try loading your library again to choose today’s idea." actionText="Try loading again" onAction={retryLoad} />
            ) : (
                <EmptyState icon="musical-notes-outline" title="Make room for a new idea." message="Your collection is empty. Create a challenge to give today a starting point." actionText="Create a challenge" onAction={() => router.push("/editor")} />
            )}

            <View style={styles.sectionTopRow}><Text style={styles.sectionTitle}>Keep the ideas moving</Text><Text style={styles.smallArrow}>↗</Text></View>
            <Pressable accessibilityRole="button" onPress={() => router.navigate("/explore")} style={({ pressed }) => [styles.linkCard, pressed && styles.pressed]}>
                <View style={styles.linkIcon}><Ionicons name="albums-outline" size={22} color="#D9FC80" /></View>
                <View style={styles.linkText}><Text style={styles.linkTitle}>Explore the archive</Text><Text style={styles.linkDescription}>{challenges.length} challenges. Plenty of ways to play.</Text></View>
                <Ionicons name="chevron-forward" size={18} color="#A3AD9C" />
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => router.navigate("/progress")} style={({ pressed }) => [styles.linkCard, pressed && styles.pressed]}>
                <View style={styles.linkIcon}><Ionicons name="checkmark-done-outline" size={22} color="#D9FC80" /></View>
                <View style={styles.linkText}><Text style={styles.linkTitle}>Your practice, collected</Text><Text style={styles.linkDescription}>{completedCount} {completedCount === 1 ? "challenge" : "challenges"} completed. Every idea counts.</Text></View>
                <Ionicons name="chevron-forward" size={18} color="#A3AD9C" />
            </Pressable>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
    date: { fontSize: 11, fontWeight: "600", letterSpacing: 1.2, color: "#A3AD9C" },
    introduction: { marginTop: 34, marginBottom: 28 },
    eyebrow: { color: "#A3AD9C", fontSize: 10, letterSpacing: 1.7, fontWeight: "700", marginBottom: 15 },
    heading: { color: "#F4F3E9", fontSize: 34, lineHeight: 40, letterSpacing: -1.2, fontWeight: "700" },
    headingAccent: { color: "#D9FC80" },
    subtitle: { fontSize: 15, lineHeight: 23, color: "#A3AD9C", maxWidth: 390, marginTop: 14 },
    dailyCard: { backgroundColor: "#D9FC80", borderRadius: 24, padding: 24, overflow: "hidden" },
    dailyTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 28 },
    diagonalArrow: { transform: [{ rotate: "-45deg" }] },
    liveLabel: { flexDirection: "row", gap: 7, alignItems: "center" },
    dot: { height: 6, width: 6, borderRadius: 3, backgroundColor: "#17200F" },
    dailyEyebrow: { color: "#17200F", letterSpacing: 1.5, fontSize: 10, fontWeight: "800" },
    pills: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 14 },
    pill: { fontSize: 11, fontWeight: "600", color: "#314922", borderWidth: 1, borderColor: "#9FBE61", borderRadius: 20, paddingHorizontal: 11, paddingVertical: 5 },
    challengeTitle: { color: "#17200F", fontSize: 35, lineHeight: 39, fontWeight: "800", letterSpacing: -1.1 },
    restrictions: { color: "#3F542A", fontSize: 15, lineHeight: 22, marginTop: 14 },
    metrics: { flexDirection: "row", alignItems: "center", marginTop: 26, paddingTop: 20, borderTopWidth: 1, borderTopColor: "#ABC96B" },
    metric: { flex: 1 },
    metricValue: { color: "#17200F", fontSize: 22, fontWeight: "700", letterSpacing: -0.5 },
    metricLabel: { color: "#4C6235", fontSize: 9, fontWeight: "700", letterSpacing: 1.4, marginTop: 4 },
    metricDivider: { width: 1, height: 31, backgroundColor: "#ABC96B", marginRight: 20 },
    completedLabel: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 20 },
    completedText: { color: "#24431C", fontSize: 12, fontWeight: "600" },
    kitPanel: { marginTop: 14, marginBottom: 20, backgroundColor: "#1C231A", borderRadius: 22, padding: 20, borderWidth: 1, borderColor: "#303C2B" },
    kitHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    sectionEyebrow: { color: "#B6C4AB", fontSize: 10, fontWeight: "700", letterSpacing: 1.5 },
    kitCount: { color: "#8E9B87", fontSize: 11 },
    kitCaption: { color: "#8E9B87", fontSize: 12, textAlign: "center", marginTop: 5 },
    rotationNote: { textAlign: "center", color: "#8E9B87", fontSize: 11, lineHeight: 17, marginTop: 11 },
    sectionTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 34, marginBottom: 16 },
    sectionTitle: { color: "#F4F3E9", fontSize: 18, fontWeight: "600", letterSpacing: -0.3 },
    smallArrow: { color: "#A3AD9C", fontSize: 23 },
    linkCard: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 17, borderTopWidth: 1, borderTopColor: "#303C2B" },
    linkIcon: { height: 44, width: 44, backgroundColor: "#222E1D", borderRadius: 14, alignItems: "center", justifyContent: "center" },
    linkText: { flex: 1 },
    linkTitle: { color: "#F4F3E9", fontSize: 14, fontWeight: "600", marginBottom: 4 },
    linkDescription: { color: "#A3AD9C", fontSize: 12, lineHeight: 18 },
    pressed: { opacity: 0.8 },
});
