import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import BackBar from "../components/BackBar";
import EmptyState from "../components/EmptyState";
import FeedbackBanner from "../components/FeedbackBanner";
import FilterChips from "../components/FilterChips";
import { colors } from "../constants/theme";
import { useApp } from "../context/AppContext";
import { CHALLENGE_CATEGORIES, DIFFICULTIES, KIT_PIECES, TIME_SIGNATURES } from "../data/constants";
import { challengeSchema, getFieldErrors } from "../utils/validation";

function initialValues(challenge) {
    return {
        title: challenge?.title || "",
        description: challenge?.description || "",
        category: challenge?.category || "Fill",
        difficulty: challenge?.difficulty || "Beginner",
        kitPieces: challenge?.kitPieces || ["kick", "snare"],
        restrictions: challenge?.restrictions || "",
        bpm: String(challenge?.bpm || 80),
        timeSignature: challenge?.timeSignature || "4/4",
        minutes: String(challenge?.minutes || 10),
    };
}
export default function ChallengeEditorScreen() {
    const { id } = useLocalSearchParams();
    const {
        challenges,
        createChallenge,
        updateChallenge,
        isSaving,
        operationError,
        clearOperationError,
    } = useApp();
    const existingChallenge = challenges.find((item) => item.id === id);
    const [values, setValues] = useState(() => initialValues(existingChallenge));
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const editing = !!id;

    function setField(field, value) {
        setValues((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: "" }));
    }
    function toggleKit(pieceId) {
        const selected = values.kitPieces.includes(pieceId);
        setField(
            "kitPieces",
            selected
                ? values.kitPieces.filter((piece) => piece !== pieceId)
                : [...values.kitPieces, pieceId],
        );
    }
    function goBack() {
        if (router.canGoBack()) router.back();
        else router.replace("/explore");
    }
    async function handleSave() {
        setSubmitted(true);
        clearOperationError();
        const result = challengeSchema.safeParse({
            ...values,
            bpm: Number(values.bpm),
            minutes: Number(values.minutes),
        });
        if (!result.success) {
            setErrors(getFieldErrors(result.error));
            return;
        }
        setErrors({});
        const saved = editing
            ? await updateChallenge(id, result.data)
            : await createChallenge(result.data);
        if (saved.success)
            router.dismissTo({
                pathname: "/challenge/[id]",
                params: { id: saved.id, saved: editing ? "updated" : "created" },
            });
        else if (saved.errors) setErrors(saved.errors);
    }
    if (editing && !existingChallenge) {
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
    return (
        <AppScreen>
            <BackBar onBack={goBack} />
            <Text accessibilityRole="header" style={styles.heading}>
                {editing ? "Edit challenge" : "Add challenge"}
            </Text>
            <Text style={styles.description}>Enter the exercise and its restrictions.</Text>
            {submitted && Object.values(errors).some(Boolean) && (
                <FeedbackBanner message="Check the highlighted fields." type="error" />
            )}
            <View style={styles.form}>
                <FieldLabel text="Title" hint="3–70 characters" />
                <AppTextInput
                    accessibilityLabel="Title"
                    value={values.title}
                    onChangeText={(value) => setField("title", value)}
                    placeholder="Two-tom fill"
                    maxLength={90}
                    error={errors.title}
                />
                <FieldLabel text="Description" hint="20–600 characters" />
                <AppTextInput
                    accessibilityLabel="Description"
                    value={values.description}
                    onChangeText={(value) => setField("description", value)}
                    placeholder="Describe the exercise."
                    multiline
                    numberOfLines={4}
                    style={styles.multiline}
                    error={errors.description}
                />
                <FieldLabel text="Type" />
                <FilterChips
                    options={CHALLENGE_CATEGORIES}
                    selected={values.category}
                    onChange={(value) => setField("category", value)}
                />
                <FieldError error={errors.category} />
                <FieldLabel text="Difficulty" />
                <FilterChips
                    options={DIFFICULTIES}
                    selected={values.difficulty}
                    onChange={(value) => setField("difficulty", value)}
                />
                <FieldError error={errors.difficulty} />
                <FieldLabel text="Kit pieces" hint="Choose at least one" />
                <View style={styles.kitOptions}>
                    {KIT_PIECES.map((piece) => {
                        const selected = values.kitPieces.includes(piece.id);
                        return (
                            <Pressable
                                key={piece.id}
                                accessibilityRole="checkbox"
                                accessibilityLabel={piece.label}
                                accessibilityState={{ checked: selected }}
                                onPress={() => toggleKit(piece.id)}
                                style={[styles.kitOption, selected && styles.kitSelected]}
                            >
                                <Text style={[styles.kitText, selected && styles.kitTextSelected]}>
                                    {selected ? "✓ " : ""}
                                    {piece.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
                <FieldError error={errors.kitPieces} />
                <FieldLabel text="Restrictions" hint="10–300 characters" />
                <AppTextInput
                    accessibilityLabel="Restrictions"
                    value={values.restrictions}
                    onChangeText={(value) => setField("restrictions", value)}
                    placeholder="Use only rack tom, floor tom, and kick."
                    multiline
                    numberOfLines={3}
                    style={styles.multiline}
                    error={errors.restrictions}
                />
                <View style={styles.numbers}>
                    <View style={styles.numberField}>
                        <FieldLabel text="Tempo" hint="40–240 BPM" />
                        <AppTextInput
                            accessibilityLabel="Tempo"
                            keyboardType="numeric"
                            value={values.bpm}
                            onChangeText={(value) => setField("bpm", value)}
                            error={errors.bpm}
                        />
                    </View>
                    <View style={styles.numberField}>
                        <FieldLabel text="Practice time" hint="5–45 minutes" />
                        <AppTextInput
                            accessibilityLabel="Practice time"
                            keyboardType="numeric"
                            value={values.minutes}
                            onChangeText={(value) => setField("minutes", value)}
                            error={errors.minutes}
                        />
                    </View>
                </View>
                <FieldLabel text="Time signature" />
                <FilterChips
                    options={TIME_SIGNATURES}
                    selected={values.timeSignature}
                    onChange={(value) => setField("timeSignature", value)}
                />
                <FieldError error={errors.timeSignature} />
                {!!operationError && (
                    <FeedbackBanner
                        message={operationError}
                        type="error"
                        onDismiss={clearOperationError}
                    />
                )}
                <View style={styles.actions}>
                    <AppButton
                        text={editing ? "Save changes" : "Save challenge"}
                        onPress={handleSave}
                        loading={isSaving}
                    />
                    <AppButton text="Cancel" variant="ghost" onPress={goBack} disabled={isSaving} />
                </View>
            </View>
        </AppScreen>
    );
}
function FieldLabel({ text, hint }) {
    return (
        <View style={styles.labelRow}>
            <Text style={styles.label}>{text}</Text>
            {!!hint && <Text style={styles.hint}>{hint}</Text>}
        </View>
    );
}
function FieldError({ error }) {
    return error ? (
        <Text accessibilityRole="alert" style={styles.error}>
            {error}
        </Text>
    ) : null;
}
const styles = StyleSheet.create({
    heading: {
        fontSize: 26,
        lineHeight: 33,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 10,
    },
    description: { fontSize: 16, lineHeight: 24, color: colors.muted, marginBottom: 20 },
    form: { gap: 8 },
    labelRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        alignItems: "baseline",
        justifyContent: "space-between",
        marginTop: 10,
    },
    label: { fontSize: 15, fontWeight: "600", color: colors.text },
    hint: { fontSize: 12, color: colors.muted },
    multiline: { minHeight: 100, textAlignVertical: "top", lineHeight: 23 },
    kitOptions: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 10 },
    kitOption: {
        minHeight: 44,
        paddingHorizontal: 13,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
    kitSelected: { backgroundColor: colors.surfaceRaised, borderColor: colors.primary },
    kitText: { fontSize: 14, color: colors.text },
    kitTextSelected: { color: colors.primary, fontWeight: "600" },
    numbers: { flexDirection: "row", gap: 16 },
    numberField: { flex: 1, gap: 8 },
    error: { fontSize: 13, lineHeight: 19, color: colors.error },
    actions: { marginTop: 20, gap: 10 },
});
