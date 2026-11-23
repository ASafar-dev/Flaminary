import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import EmptyState from "../../components/EmptyState";
import FeedbackBanner from "../../components/FeedbackBanner";
import { colors } from "../../constants/theme";
import { useApp } from "../../context/AppContext.jsx";
import { KIT_PIECES } from "../../data/constants.js";

export default function TodayScreen() {
    const { todayChallenge, todayKey, challenges, operationError, clearOperationError, retryLoad } =
        useApp();
    const date = todayKey ? new Date(`${todayKey}T12:00:00`) : new Date();
    const dateLabel = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
    const kitNames = todayChallenge
        ? KIT_PIECES.filter((piece) => todayChallenge.kitPieces.includes(piece.id)).map(
              (piece) => piece.label,
          )
        : [];

    function openChallenge() {
        if (!todayChallenge) return;
        router.push({ pathname: "/challenge/[id]", params: { id: todayChallenge.id } });
    }

    return (
        <AppScreen>
            <Text style={styles.date}>{dateLabel}</Text>
            <Text accessibilityRole="header" style={styles.heading}>
                Today’s challenge
            </Text>
            <Text style={styles.subtitle}>A different drum challenge each day.</Text>

            {!!operationError && (
                <FeedbackBanner
                    message={operationError}
                    type="error"
                    onDismiss={clearOperationError}
                />
            )}

            {todayChallenge ? (
                <>
                    <View style={styles.card}>
                        <Text style={styles.category}>
                            {todayChallenge.category} · {todayChallenge.difficulty}
                        </Text>
                        <Text style={styles.title}>{todayChallenge.title}</Text>
                        <Text style={styles.label}>Restrictions</Text>
                        <Text style={styles.body}>{todayChallenge.restrictions}</Text>
                        <Text style={styles.label}>Allowed kit pieces</Text>
                        <Text style={styles.body}>{kitNames.join(", ")}</Text>
                        <View style={styles.details}>
                            <Text style={styles.body}>Tempo: {todayChallenge.bpm} BPM</Text>
                            <Text style={styles.body}>
                                Time signature: {todayChallenge.timeSignature}
                            </Text>
                            <Text style={styles.body}>
                                Suggested time: {todayChallenge.minutes} minutes
                            </Text>
                        </View>
                        {!!todayChallenge.completedAt && (
                            <Text style={styles.completed}>Completed</Text>
                        )}
                    </View>
                    <AppButton text="Open challenge" onPress={openChallenge} />
                </>
            ) : challenges.length > 0 ? (
                <EmptyState
                    title="Today’s challenge did not load"
                    message="Retry loading the challenge list."
                    actionText="Retry"
                    onAction={retryLoad}
                />
            ) : (
                <EmptyState
                    title="No challenges yet"
                    message="Add a challenge to get started."
                    actionText="Add a challenge"
                    onAction={() => router.push("/editor")}
                />
            )}
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    date: { color: colors.muted, fontSize: 16, marginBottom: 8 },
    heading: { color: colors.text, fontSize: 26, fontWeight: "700", marginBottom: 8 },
    subtitle: { color: colors.muted, fontSize: 16, lineHeight: 24, marginBottom: 24 },
    card: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        padding: 20,
        marginBottom: 16,
    },
    category: { color: colors.muted, fontSize: 14, marginBottom: 10 },
    title: { color: colors.text, fontSize: 22, lineHeight: 29, fontWeight: "600", marginBottom: 18 },
    label: { color: colors.text, fontSize: 16, fontWeight: "600", marginBottom: 6 },
    body: { color: colors.text, fontSize: 16, lineHeight: 25, marginBottom: 14 },
    details: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 16, marginTop: 2 },
    completed: { color: colors.success, fontSize: 16, fontWeight: "600" },
});
