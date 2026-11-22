import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AppScreen from "../../components/AppScreen";
import ChallengeCard from "../../components/ChallengeCard";
import EmptyState from "../../components/EmptyState";
import FeedbackBanner from "../../components/FeedbackBanner";
import { useApp } from "../../context/AppContext.jsx";

export default function ProgressScreen() {
    const { challenges, signOut, operationError, clearOperationError } = useApp();
    const completedChallenges = challenges
        .filter((challenge) => challenge.completedAt)
        .sort((first, second) => new Date(second.completedAt) - new Date(first.completedAt));
    const practiceMinutes = completedChallenges.reduce(
        (total, challenge) => total + challenge.minutes,
        0,
    );
    const customCount = challenges.filter((challenge) => challenge.isCustom).length;

    function openChallenge(challenge) {
        router.push({ pathname: "/challenge/[id]", params: { id: challenge.id } });
    }

    return (
        <AppScreen>
            <View style={styles.headingRow}>
                <Text accessibilityRole="header" style={styles.heading}>
                    My progress
                </Text>
                <Pressable accessibilityRole="button" onPress={signOut} style={styles.logoutAction}>
                    <Text style={styles.logoutText}>Log out</Text>
                </Pressable>
            </View>
            {!!operationError && (
                <FeedbackBanner
                    message={operationError}
                    type="error"
                    onDismiss={clearOperationError}
                />
            )}

            <View style={styles.summary}>
                <Text style={styles.count}>
                    Completed: {completedChallenges.length} of {challenges.length}
                </Text>
                <Text style={styles.count}>Suggested practice time: {practiceMinutes} minutes</Text>
                <Text style={styles.count}>My challenges: {customCount}</Text>
                <Text style={styles.note}>
                    Practice time is the total suggested duration of my completed challenges.
                </Text>
            </View>

            <Text accessibilityRole="header" style={styles.sectionHeading}>
                My completed challenges
            </Text>
            {completedChallenges.length > 0 ? (
                completedChallenges.map((challenge) => (
                    <View key={challenge.id} style={styles.completedItem}>
                        <Text style={styles.date}>
                            Completed{" "}
                            {new Date(challenge.completedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </Text>
                        <ChallengeCard
                            challenge={challenge}
                            onPress={() => openChallenge(challenge)}
                        />
                    </View>
                ))
            ) : (
                <EmptyState
                    title="I haven’t completed any challenges."
                    message="Open a challenge and mark it complete after practice."
                    actionText={challenges.length > 0 ? "View challenges" : "Add a challenge"}
                    onAction={() => router.navigate(challenges.length > 0 ? "/explore" : "/editor")}
                />
            )}
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    headingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 24,
    },
    heading: { color: "#203B35", fontSize: 26, fontWeight: "700", flex: 1 },
    logoutAction: { minHeight: 44, justifyContent: "center", paddingLeft: 10 },
    logoutText: { color: "#285548", fontSize: 16, fontWeight: "600" },
    summary: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D8DED7",
        borderRadius: 10,
        padding: 20,
        marginBottom: 26,
    },
    count: { color: "#203B35", fontSize: 16, lineHeight: 25, marginBottom: 10 },
    note: { color: "#61736B", fontSize: 14, lineHeight: 22, marginTop: 4 },
    sectionHeading: { color: "#203B35", fontSize: 20, fontWeight: "600", marginBottom: 16 },
    completedItem: { marginBottom: 8 },
    date: { color: "#61736B", fontSize: 14, marginBottom: 8 },
});
