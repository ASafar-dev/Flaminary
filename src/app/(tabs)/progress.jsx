import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import Brand from "../../components/Brand";
import ChallengeCard from "../../components/ChallengeCard";
import EmptyState from "../../components/EmptyState";
import FeedbackBanner from "../../components/FeedbackBanner";
import { useApp } from "../../context/AppContext.jsx";

export default function ProgressScreen() {
    const { challenges, signOut, operationError, clearOperationError } = useApp();
    const completedChallenges = challenges.filter((challenge) => challenge.completedAt).sort((first, second) => new Date(second.completedAt) - new Date(first.completedAt));
    const practiceMinutes = completedChallenges.reduce((total, challenge) => total + challenge.minutes, 0);
    const customCount = challenges.filter((challenge) => challenge.isCustom).length;
    const progressPercent = challenges.length > 0 ? Math.round(completedChallenges.length / challenges.length * 100) : 0;

    function openChallenge(challenge) {
        router.push({ pathname: "/challenge/[id]", params: { id: challenge.id } });
    }

    return (
        <AppScreen>
            <View style={styles.topRow}>
                <Brand compact />
                <Pressable accessibilityRole="button" accessibilityLabel="Log out" onPress={signOut} style={({ pressed }) => [styles.logout, pressed && styles.pressed]}>
                    <Text style={styles.logoutText}>Log out</Text>
                    <Ionicons name="log-out-outline" size={17} color="#A3AD9C" />
                </Pressable>
            </View>

            <View style={styles.introduction}>
                <Text style={styles.eyebrow}>EVERY SESSION ADDS SOMETHING</Text>
                <Text style={styles.heading}>Your practice,{"\n"}<Text style={styles.headingAccent}>in motion.</Text></Text>
                <Text style={styles.subtitle}>A collection of the ideas you’ve made your own.</Text>
            </View>

            {operationError ? <FeedbackBanner message={operationError} type="error" onDismiss={clearOperationError} /> : null}

            <View style={styles.summaryCard}>
                <View style={styles.summaryTop}>
                    <View><Text style={styles.summaryEyebrow}>CHALLENGES COMPLETED</Text><Text style={styles.bigNumber}>{completedChallenges.length}<Text style={styles.totalNumber}> / {challenges.length}</Text></Text></View>
                    <View style={styles.summaryIcon}><Ionicons name="checkmark-done" size={28} color="#D9FC80" /></View>
                </View>
                <View accessibilityRole="progressbar" accessibilityLabel="Challenge completion" accessibilityValue={{ min: 0, max: challenges.length || 1, now: completedChallenges.length }} aria-valuemin={0} aria-valuemax={challenges.length || 1} aria-valuenow={completedChallenges.length} style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progressPercent}%` }]} /></View>
                <Text style={styles.progressCaption}>{completedChallenges.length > 0 ? "Every completed idea gives your playing somewhere new to go." : "Your first new idea is a great place to begin."}</Text>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statCard}><Ionicons name="time-outline" size={20} color="#A3AD9C" /><Text style={styles.statValue}>{practiceMinutes}<Text style={styles.statUnit}> min</Text></Text><Text style={styles.statLabel}>Suggested practice time*</Text></View>
                <View style={styles.statCard}><Ionicons name="bulb-outline" size={20} color="#A3AD9C" /><Text style={styles.statValue}>{customCount}</Text><Text style={styles.statLabel}>Your own {customCount === 1 ? "challenge" : "challenges"}</Text></View>
            </View>
            <Text style={styles.timeNote}>*Total suggested duration of completed challenges.</Text>

            <View style={styles.sectionRow}><Text style={styles.sectionTitle}>Ideas you’ve explored</Text><Text style={styles.count}>{completedChallenges.length.toString().padStart(2, "0")}</Text></View>

            {completedChallenges.length > 0 ? (
                <View style={styles.list}>{completedChallenges.map((challenge) => (
                    <View key={challenge.id}>
                        <Text style={styles.completedDate}>COMPLETED {new Date(challenge.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}</Text>
                        <ChallengeCard challenge={challenge} onPress={() => openChallenge(challenge)} />
                    </View>
                ))}</View>
            ) : (
                <EmptyState icon="checkmark-done-outline" title="One challenge at a time." message="Finish a challenge and mark it complete. It’ll join your collection of explored ideas here." actionText={challenges.length > 0 ? "Find a challenge" : "Create a challenge"} onAction={() => router.navigate(challenges.length > 0 ? "/explore" : "/editor")} />
            )}

            <View style={styles.footerCard}>
                <View style={styles.footerHeading}><Ionicons name="musical-notes-outline" size={18} color="#D9FC80" /><Text style={styles.footerTitle}>Creativity isn’t a finish line.</Text></View>
                <Text style={styles.footerCopy}>Revisit an old restriction, try a different tempo, or write a challenge of your own.</Text>
                <AppButton text="Create your next idea" variant="ghost" icon="arrow-forward" onPress={() => router.push("/editor")} />
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
    logout: { flexDirection: "row", gap: 7, alignItems: "center", minHeight: 40, paddingLeft: 12 },
    logoutText: { color: "#A3AD9C", fontSize: 12, fontWeight: "600" },
    introduction: { marginTop: 34, marginBottom: 26 },
    eyebrow: { color: "#A3AD9C", fontSize: 10, letterSpacing: 1.5, fontWeight: "700", marginBottom: 15 },
    heading: { color: "#F4F3E9", fontSize: 40, lineHeight: 45, letterSpacing: -1.4, fontWeight: "700" },
    headingAccent: { color: "#D9FC80" },
    subtitle: { color: "#A3AD9C", fontSize: 15, lineHeight: 23, marginTop: 13 },
    summaryCard: { backgroundColor: "#1C231A", borderRadius: 22, borderWidth: 1, borderColor: "#303C2B", padding: 24 },
    summaryTop: { flexDirection: "row", justifyContent: "space-between", gap: 15, alignItems: "center" },
    summaryEyebrow: { color: "#A3AD9C", fontSize: 9, fontWeight: "700", letterSpacing: 1.4 },
    bigNumber: { color: "#D9FC80", fontSize: 59, lineHeight: 70, fontWeight: "700", letterSpacing: -2, marginTop: 7 },
    totalNumber: { color: "#637358", fontSize: 25, letterSpacing: -0.5 },
    summaryIcon: { width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: "#3B4B30", alignItems: "center", justifyContent: "center", backgroundColor: "#25311E" },
    progressTrack: { height: 6, borderRadius: 3, backgroundColor: "#35412C", overflow: "hidden", marginTop: 20 },
    progressFill: { height: "100%", backgroundColor: "#D9FC80", borderRadius: 3 },
    progressCaption: { color: "#A3AD9C", fontSize: 12, lineHeight: 19, marginTop: 16 },
    statsRow: { flexDirection: "row", gap: 12, marginTop: 12 },
    statCard: { flex: 1, padding: 18, backgroundColor: "#181F16", borderWidth: 1, borderColor: "#303C2B", borderRadius: 18 },
    statValue: { color: "#F4F3E9", fontSize: 30, fontWeight: "700", letterSpacing: -0.8, marginTop: 18 },
    statUnit: { color: "#A3AD9C", fontSize: 12, fontWeight: "500", letterSpacing: 0 },
    statLabel: { color: "#A3AD9C", fontSize: 11, lineHeight: 16, marginTop: 5 },
    timeNote: { color: "#7F8D77", fontSize: 10, lineHeight: 15, marginTop: 10 },
    sectionRow: { flexDirection: "row", justifyContent: "space-between", gap: 12, alignItems: "center", marginTop: 32, marginBottom: 18 },
    sectionTitle: { color: "#F4F3E9", fontSize: 19, fontWeight: "600", letterSpacing: -0.4 },
    count: { color: "#8E9B87", fontSize: 12 },
    list: { gap: 22 },
    completedDate: { color: "#8E9B87", fontSize: 9, letterSpacing: 1.2, fontWeight: "600", marginBottom: 9, marginLeft: 2 },
    footerCard: { borderTopWidth: 1, borderTopColor: "#303C2B", marginTop: 30, paddingTop: 24 },
    footerHeading: { flexDirection: "row", gap: 10, alignItems: "center", marginBottom: 10 },
    footerTitle: { color: "#F4F3E9", fontSize: 14, fontWeight: "600" },
    footerCopy: { color: "#A3AD9C", fontSize: 13, lineHeight: 21, marginBottom: 13 },
    pressed: { opacity: 0.75 },
});
