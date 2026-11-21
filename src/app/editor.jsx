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
import { useApp } from "../context/AppContext";
import { CHALLENGE_CATEGORIES, DIFFICULTIES, KIT_PIECES, TIME_SIGNATURES } from "../data/constants";
import { challengeSchema, getFieldErrors } from "../utils/validation";

function initialValues(challenge) {
    return {
        title: challenge?.title || "",
        description: challenge?.description || "",
        category: challenge?.category || "Fill",
        difficulty: challenge?.difficulty || "Starter",
        kitPieces: challenge?.kitPieces || ["kick", "snare"],
        restrictions: challenge?.restrictions || "",
        bpm: String(challenge?.bpm || 80),
        timeSignature: challenge?.timeSignature || "4/4",
        minutes: String(challenge?.minutes || 10)
    };
}

export default function ChallengeEditorScreen() {
    const { id } = useLocalSearchParams();
    const { challenges, createChallenge, updateChallenge, isSaving, operationError, clearOperationError } = useApp();
    const existingChallenge = challenges.find((item) => item.id === id);
    const [values, setValues] = useState(() => initialValues(existingChallenge));
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const editing = !!id;

    function setField(field, value) {
        setValues((currentValues) => ({ ...currentValues, [field]: value }));
        setErrors((currentErrors) => ({ ...currentErrors, [field]: "" }));
    }

    function toggleKit(pieceId) {
        const selected = values.kitPieces.includes(pieceId);
        setField("kitPieces", selected ? values.kitPieces.filter((piece) => piece !== pieceId) : [...values.kitPieces, pieceId]);
    }

    function goBack() {
        if (router.canGoBack()) router.back();
        else router.replace("/explore");
    }

    async function handleSave() {
        setSubmitted(true);
        clearOperationError();
        const result = challengeSchema.safeParse({ ...values, bpm: Number(values.bpm), minutes: Number(values.minutes) });
        if (!result.success) {
            setErrors(getFieldErrors(result.error));
            return;
        }
        setErrors({});
        const saved = editing ? await updateChallenge(id, result.data) : await createChallenge(result.data);
        if (saved.success) {
            router.dismissTo({ pathname: "/challenge/[id]", params: { id: saved.id, saved: editing ? "updated" : "created" } });
        } else if (saved.errors) {
            setErrors(saved.errors);
        }
    }

    if (editing && !existingChallenge) {
        return <AppScreen><BackBar onBack={goBack} /><EmptyState title="Challenge not found" message="It may have been deleted. Create a fresh idea from your library." actionText="Go to Explore" onAction={() => router.replace("/explore")} /></AppScreen>;
    }

    return (
        <AppScreen>
            <BackBar onBack={goBack} title={editing ? "EDIT YOUR IDEA" : "MAKE YOUR OWN RULES"} />
            <Text style={styles.eyebrow}>{editing ? "REFINE THE CHALLENGE" : "A NEW POSSIBILITY"}</Text>
            <Text accessibilityRole="header" style={styles.heading}>{editing ? "Give it a new spin." : "What if you tried…"}</Text>
            <Text style={styles.description}>A good challenge starts with a simple restriction. Keep it focused and leave room to explore.</Text>

            {submitted && Object.values(errors).some(Boolean) && <FeedbackBanner message="A few details need your attention. Check the fields below." type="error" />}
            <View style={styles.form}>
                <FieldLabel text="Challenge title" hint="3–70 characters" />
                <AppTextInput accessibilityLabel="Challenge title" value={values.title} onChangeText={(value) => setField("title", value)} placeholder="Two toms. One idea." maxLength={90} error={errors.title} />

                <FieldLabel text="The idea" hint="20–600 characters" />
                <AppTextInput accessibilityLabel="The idea" value={values.description} onChangeText={(value) => setField("description", value)} placeholder="Describe what the drummer will explore…" multiline numberOfLines={4} style={styles.multiline} error={errors.description} />

                <FieldLabel text="Challenge type" />
                <FilterChips options={CHALLENGE_CATEGORIES} selected={values.category} onChange={(value) => setField("category", value)} />
                <FieldError error={errors.category} />

                <FieldLabel text="Difficulty" />
                <FilterChips options={DIFFICULTIES} selected={values.difficulty} onChange={(value) => setField("difficulty", value)} />
                <FieldError error={errors.difficulty} />

                <FieldLabel text="Allowed kit pieces" hint="Choose at least one" />
                <View style={styles.kitOptions}>{KIT_PIECES.map((piece) => {
                    const selected = values.kitPieces.includes(piece.id);
                    return <Pressable key={piece.id} accessibilityRole="checkbox" accessibilityLabel={piece.label} accessibilityState={{ checked: selected }} onPress={() => toggleKit(piece.id)} style={[styles.kitOption, selected && styles.kitSelected]}><Text style={[styles.kitText, selected && styles.kitTextSelected]}>{selected ? "+ " : ""}{piece.label}</Text></Pressable>;
                })}</View>
                <FieldError error={errors.kitPieces} />

                <FieldLabel text="The creative constraint" hint="10–300 characters" />
                <AppTextInput accessibilityLabel="The creative constraint" value={values.restrictions} onChangeText={(value) => setField("restrictions", value)} placeholder="Only use rack tom, floor tom, and kick. No cymbals." multiline numberOfLines={3} style={styles.multiline} error={errors.restrictions} />

                <View style={styles.numbers}>
                    <View style={styles.numberField}><FieldLabel text="Tempo" hint="40–240 BPM" /><AppTextInput accessibilityLabel="Tempo" keyboardType="numeric" value={values.bpm} onChangeText={(value) => setField("bpm", value)} error={errors.bpm} /></View>
                    <View style={styles.numberField}><FieldLabel text="Practice time" hint="5–45 minutes" /><AppTextInput accessibilityLabel="Practice time" keyboardType="numeric" value={values.minutes} onChangeText={(value) => setField("minutes", value)} error={errors.minutes} /></View>
                </View>
                <FieldLabel text="Time signature" />
                <FilterChips options={TIME_SIGNATURES} selected={values.timeSignature} onChange={(value) => setField("timeSignature", value)} />
                <FieldError error={errors.timeSignature} />
                {!!operationError && <FeedbackBanner message={operationError} type="error" onDismiss={clearOperationError} />}
                <View style={styles.actions}>
                    <AppButton text={editing ? "Save changes" : "Create challenge"} icon="checkmark-outline" onPress={handleSave} loading={isSaving} />
                    <AppButton text="Cancel" variant="ghost" onPress={goBack} disabled={isSaving} />
                </View>
            </View>
        </AppScreen>
    );
}

function FieldLabel({ text, hint }) {
    return <View style={styles.labelRow}><Text style={styles.label}>{text}</Text>{!!hint && <Text style={styles.hint}>{hint}</Text>}</View>;
}

function FieldError({ error }) {
    return error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null;
}

const styles = StyleSheet.create({
    eyebrow: { color: "#D9FC80", fontSize: 10, fontWeight: "700", letterSpacing: 1.6, marginTop: 30, marginBottom: 14 },
    heading: { color: "#F4F3E9", fontSize: 34, lineHeight: 41, fontWeight: "800", letterSpacing: -1.2 },
    description: { color: "#A3AD9C", fontSize: 15, lineHeight: 24, marginTop: 15, marginBottom: 24 },
    form: { gap: 12 },
    labelRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, alignItems: "baseline", justifyContent: "space-between", marginTop: 12 },
    label: { color: "#F4F3E9", fontSize: 13, fontWeight: "600" },
    hint: { color: "#A3AD9C", fontSize: 10 },
    multiline: { minHeight: 108, textAlignVertical: "top", lineHeight: 23 },
    kitOptions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    kitOption: { minHeight: 44, paddingHorizontal: 15, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: "#303C2B", backgroundColor: "#1C231A" },
    kitSelected: { backgroundColor: "#293B1E", borderColor: "#76944B" },
    kitText: { color: "#A3AD9C", fontSize: 13 },
    kitTextSelected: { color: "#D9FC80", fontWeight: "600" },
    numbers: { flexDirection: "row", gap: 16 },
    numberField: { flex: 1, gap: 12 },
    error: { color: "#FFAE9D", fontSize: 12, lineHeight: 18 },
    actions: { marginTop: 22, gap: 12 }
});
