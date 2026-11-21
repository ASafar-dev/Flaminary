import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import BackBar from "../../components/BackBar";
import ConfirmDialog from "../../components/ConfirmDialog";
import DrumKitIllustration from "../../components/DrumKitIllustration";
import EmptyState from "../../components/EmptyState";
import FeedbackBanner from "../../components/FeedbackBanner";
import { useApp } from "../../context/AppContext";
import { KIT_PIECES } from "../../data/constants";

export default function ChallengeDetailsScreen() {
    const { id, saved } = useLocalSearchParams();
    const { challenges, toggleCompletion, deleteChallenge, isSaving, operationError, clearOperationError } = useApp();
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
        if (result.success) setMessage(wasCompleted ? "Marked as unfinished. Make it yours again." : "Nice work. This challenge is now in your progress.");
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
                <EmptyState icon="albums-outline" title="This idea has moved on."
                    message="This challenge may have been deleted. There are more ideas waiting in your library."
                    actionText="Explore challenges" onAction={() => router.replace("/explore")} />
            </AppScreen>
        );
    }

    const kitNames = KIT_PIECES.filter((piece) => challenge.kitPieces.includes(piece.id));

    return (
        <AppScreen>
            <BackBar onBack={goBack} title="THE PRACTICE ROOM" />
            <View style={styles.tags}>
                <Text style={styles.category}>{challenge.category.toUpperCase()}</Text>
                <Text style={styles.level}>{challenge.difficulty}</Text>
                {challenge.isCustom && <Text style={styles.level}>Your idea</Text>}
            </View>
            <Text accessibilityRole="header" style={styles.heading}>{challenge.title}</Text>
            <Text style={styles.description}>{challenge.description}</Text>
            {(saved === "created" || saved === "updated") && <FeedbackBanner type="success" message={saved === "created" ? "Your new challenge is saved. Time to try it." : "Your changes are saved everywhere in your library."} onDismiss={() => router.setParams({ saved: "" })} />}

            <View style={styles.metrics}>
                <Metric value={challenge.bpm} label="BPM" icon="pulse-outline" />
                <Metric value={challenge.timeSignature} label="TIME" icon="musical-notes-outline" />
                <Metric value={challenge.minutes} label="MINUTES" icon="time-outline" />
            </View>

            <View style={styles.constraint}>
                <View style={styles.sectionHeading}><Ionicons name="flash-outline" size={19} color="#D9FC80" /><Text style={styles.eyebrow}>THE CREATIVE CONSTRAINT</Text></View>
                <Text style={styles.constraintText}>{challenge.restrictions}</Text>
            </View>
            <View style={styles.kitCard}>
                <Text style={styles.eyebrow}>YOUR PALETTE</Text>
                <DrumKitIllustration kitPieces={challenge.kitPieces} />
                <View style={styles.kitLabels}>{kitNames.map((piece) => <Text key={piece.id} style={styles.kitLabel}>{piece.label}</Text>)}</View>
            </View>

            <Text style={styles.sectionTitle}>Make it your own.</Text>
            <PracticeStep number="01" title="Start with space." text={`Set a comfortable pulse near ${challenge.bpm} BPM. Read the restriction and leave room to listen.`} />
            <PracticeStep number="02" title="Explore, then repeat." text={`Try a few ideas using the highlighted kit pieces. Give yourself ${challenge.minutes} minutes to find a phrase you like.`} />
            <PracticeStep number="03" title="Keep the good part." text="Repeat your favourite idea until it feels natural. Mark it complete when you're happy with your practice." />

            {!!challenge.completedAt && <View style={styles.completed}><Ionicons name="checkmark-circle" size={19} color="#D9FC80" /><Text style={styles.completedText}>Completed {new Date(challenge.completedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</Text></View>}
            {!!message && <FeedbackBanner message={message} type="success" onDismiss={() => setMessage("")} />}
            {!!operationError && <FeedbackBanner message={operationError} type="error" onDismiss={clearOperationError} />}
            <View style={styles.actions}>
                <AppButton text={challenge.completedAt ? "Mark as unfinished" : "Mark complete"}
                    icon={challenge.completedAt ? "refresh-outline" : "checkmark-outline"} onPress={handleCompletion} loading={isSaving} />
                <AppButton text="Edit challenge" variant="secondary" icon="create-outline"
                    disabled={isSaving} onPress={() => router.push({ pathname: "/editor", params: { id: challenge.id } })} />
                <AppButton text="Delete challenge" variant="ghost" icon="trash-outline" disabled={isSaving} onPress={() => { clearOperationError(); setConfirmDelete(true); }} />
            </View>
            <ConfirmDialog visible={confirmDelete} title="Let this challenge go?"
                message={`“${challenge.title}” and its completion record will be removed from this device. This cannot be undone.`}
                confirmText="Delete challenge" onConfirm={handleDelete} onCancel={() => setConfirmDelete(false)} loading={isSaving} error={operationError} />
        </AppScreen>
    );
}

function Metric({ value, label, icon }) {
    return <View style={styles.metric}><Ionicons name={icon} size={17} color="#A3AD9C" /><Text style={styles.metricValue}>{value}</Text><Text style={styles.metricLabel}>{label}</Text></View>;
}

function PracticeStep({ number, title, text }) {
    return <View style={styles.step}><Text style={styles.stepNumber}>{number}</Text><View style={styles.stepBody}><Text style={styles.stepTitle}>{title}</Text><Text style={styles.stepText}>{text}</Text></View></View>;
}

const styles = StyleSheet.create({
    tags: { flexDirection: "row", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 30, marginBottom: 18 },
    category: { color: "#D9FC80", fontSize: 10, fontWeight: "700", letterSpacing: 1.5, backgroundColor: "#26351D", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 7 },
    level: { color: "#A3AD9C", fontSize: 12 },
    heading: { color: "#F4F3E9", fontSize: 36, fontWeight: "800", letterSpacing: -1.3, lineHeight: 42 },
    description: { color: "#A3AD9C", fontSize: 16, lineHeight: 25, marginTop: 16 },
    metrics: { flexDirection: "row", marginVertical: 28, paddingVertical: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#303C2B" },
    metric: { flex: 1, alignItems: "center", gap: 8 },
    metricValue: { color: "#F4F3E9", fontSize: 23, fontWeight: "700" },
    metricLabel: { color: "#A3AD9C", fontSize: 9, letterSpacing: 1.7 },
    constraint: { backgroundColor: "#22301B", borderRadius: 18, padding: 22, borderWidth: 1, borderColor: "#40562D", marginBottom: 18 },
    sectionHeading: { flexDirection: "row", gap: 9, alignItems: "center", marginBottom: 14 },
    eyebrow: { color: "#D9FC80", fontSize: 10, fontWeight: "700", letterSpacing: 1.3 },
    constraintText: { color: "#F4F3E9", fontSize: 18, lineHeight: 28, fontWeight: "500" },
    kitCard: { backgroundColor: "#1C231A", borderRadius: 20, borderWidth: 1, borderColor: "#303C2B", padding: 20, marginBottom: 30 },
    kitLabels: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 },
    kitLabel: { color: "#D9FC80", fontSize: 12, backgroundColor: "#293821", paddingHorizontal: 11, paddingVertical: 7, borderRadius: 8 },
    sectionTitle: { color: "#F4F3E9", fontSize: 23, fontWeight: "700", letterSpacing: -0.5, marginBottom: 22 },
    step: { flexDirection: "row", gap: 15, marginBottom: 22 },
    stepNumber: { color: "#D9FC80", fontSize: 12, fontWeight: "700", marginTop: 3 },
    stepBody: { flex: 1, gap: 7 },
    stepTitle: { color: "#F4F3E9", fontSize: 15, fontWeight: "600" },
    stepText: { color: "#A3AD9C", fontSize: 14, lineHeight: 23 },
    completed: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 16 },
    completedText: { color: "#D9FC80", fontSize: 13 },
    actions: { gap: 12, marginTop: 15 }
});
