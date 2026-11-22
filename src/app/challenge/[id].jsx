import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import BackBar from "../../components/BackBar";
import ConfirmDialog from "../../components/ConfirmDialog";
import EmptyState from "../../components/EmptyState";
import FeedbackBanner from "../../components/FeedbackBanner";
import { colors } from "../../constants/theme";
import { useApp } from "../../context/AppContext";
import { KIT_PIECES } from "../../data/constants";

export default function ChallengeDetailsScreen() {
    const { id, saved } = useLocalSearchParams();
    const {
        challenges,
        toggleCompletion,
        deleteChallenge,
        isSaving,
        operationError,
        clearOperationError,
    } = useApp();
    const challenge = challenges.find((item) => item.id === id);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [message, setMessage] = useState("");

    function goBack() {
        if (router.canGoBack()) router.back();
        else router.replace("/explore");
    }
    async function handleCompletion() {
        const wasCompleted = !!challenge.completedAt;
        setMessage("");
        const result = await toggleCompletion(challenge.id);
        if (result.success)
            setMessage(
                wasCompleted
                    ? "I marked this challenge as unfinished."
                    : "I recorded this challenge as complete.",
            );
    }
    async function handleDelete() {
        const result = await deleteChallenge(challenge.id);
        if (result.success) {
            setConfirmDelete(false);
            goBack();
        }
    }
    if (!challenge) {
        return (
            <AppScreen>
                <BackBar onBack={goBack} />
                <EmptyState
                    title="Challenge not found"
                    message="This challenge is no longer in your saved list."
                    actionText="Open challenges"
                    onAction={() => router.replace("/explore")}
                />
            </AppScreen>
        );
    }

    const kitNames = KIT_PIECES.filter((piece) => challenge.kitPieces.includes(piece.id));
    return (
        <AppScreen>
            <BackBar onBack={goBack} title="Challenge" />
            <Text accessibilityRole="header" style={styles.heading}>
                {challenge.title}
            </Text>
            <Text style={styles.category}>
                {challenge.category} · {challenge.difficulty}
                {challenge.isCustom ? " · My challenge" : ""}
            </Text>
            <Text style={styles.description}>{challenge.description}</Text>
            {(saved === "created" || saved === "updated") && (
                <FeedbackBanner
                    type="success"
                    message={
                        saved === "created" ? "I saved a new challenge." : "I saved my changes."
                    }
                    onDismiss={() => router.setParams({ saved: "" })}
                />
            )}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Practice</Text>
                <View style={styles.metrics}>
                    <Text style={styles.metric}>{challenge.bpm} BPM</Text>
                    <Text style={styles.metric}>{challenge.timeSignature}</Text>
                    <Text style={styles.metric}>{challenge.minutes} minutes</Text>
                </View>
                <Text style={styles.sectionTitle}>Restrictions</Text>
                <Text style={styles.body}>{challenge.restrictions}</Text>
                <Text style={[styles.sectionTitle, styles.kitHeading]}>Kit pieces</Text>
                <View style={styles.kitLabels}>
                    {kitNames.map((piece) => (
                        <Text key={piece.id} style={styles.kitLabel}>
                            {piece.label}
                        </Text>
                    ))}
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Practice steps</Text>
                <Text style={styles.step}>1. Set a steady pulse at {challenge.bpm} BPM.</Text>
                <Text style={styles.step}>
                    2. Use the listed kit pieces and restrictions for {challenge.minutes} minutes.
                </Text>
                <Text style={styles.step}>3. Record completion after your practice.</Text>
            </View>
            {!!challenge.completedAt && (
                <Text style={styles.completed}>
                    I completed this on{" "}
                    {new Date(challenge.completedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                    .
                </Text>
            )}
            {!!message && (
                <FeedbackBanner message={message} type="success" onDismiss={() => setMessage("")} />
            )}
            {!!operationError && (
                <FeedbackBanner
                    message={operationError}
                    type="error"
                    onDismiss={clearOperationError}
                />
            )}
            <View style={styles.actions}>
                <AppButton
                    text={challenge.completedAt ? "Mark unfinished" : "I finished this"}
                    onPress={handleCompletion}
                    loading={isSaving}
                />
                <AppButton
                    text="Edit challenge"
                    variant="secondary"
                    disabled={isSaving}
                    onPress={() =>
                        router.push({ pathname: "/editor", params: { id: challenge.id } })
                    }
                />
                <AppButton
                    text="Delete challenge"
                    variant="danger"
                    disabled={isSaving}
                    onPress={() => {
                        clearOperationError();
                        setConfirmDelete(true);
                    }}
                />
            </View>
            <ConfirmDialog
                visible={confirmDelete}
                title="Delete challenge"
                message={"“" + challenge.title + "” will be deleted with its completion record."}
                confirmText="Delete challenge"
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(false)}
                loading={isSaving}
                error={operationError}
            />
        </AppScreen>
    );
}
const styles = StyleSheet.create({
    heading: {
        fontSize: 26,
        lineHeight: 33,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 8,
    },
    category: { fontSize: 14, color: colors.muted, marginBottom: 16 },
    description: { fontSize: 16, lineHeight: 24, color: colors.text, marginBottom: 20 },
    card: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        padding: 18,
        marginBottom: 18,
    },
    sectionTitle: { fontSize: 17, fontWeight: "600", color: colors.text, marginBottom: 10 },
    metrics: { flexDirection: "row", flexWrap: "wrap", gap: 20, marginBottom: 24 },
    metric: { fontSize: 16, color: colors.text },
    body: { fontSize: 16, lineHeight: 24, color: colors.text },
    kitHeading: { marginTop: 22 },
    kitLabels: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    kitLabel: {
        fontSize: 14,
        color: colors.text,
        backgroundColor: colors.background,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 6,
    },
    step: { fontSize: 15, lineHeight: 23, color: colors.text, marginBottom: 10 },
    completed: { fontSize: 14, color: colors.primary, marginBottom: 16 },
    actions: { gap: 12, marginTop: 6 },
});
