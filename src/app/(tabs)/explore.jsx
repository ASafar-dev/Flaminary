import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import AppTextInput from "../../components/AppTextInput";
import Brand from "../../components/Brand";
import ChallengeCard from "../../components/ChallengeCard";
import EmptyState from "../../components/EmptyState";
import FeedbackBanner from "../../components/FeedbackBanner";
import FilterChips from "../../components/FilterChips";
import { useApp } from "../../context/AppContext.jsx";

export default function ExploreScreen() {
    const { challenges, operationError, clearOperationError } = useApp();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All practice");

    const visibleChallenges = useMemo(() => {
        const query = search.trim().toLowerCase();
        return challenges.filter((challenge) => {
            const searchableText = [challenge.title, challenge.description, challenge.restrictions, challenge.difficulty, ...challenge.kitPieces.map((piece) => piece.replaceAll("-", " "))].join(" ").toLowerCase();
            const matchesSearch = !query || searchableText.includes(query);
            const matchesCategory = category === "All" || challenge.category === category;
            const matchesStatus = status === "All practice" || (status === "To try" && !challenge.completedAt) || (status === "Completed" && !!challenge.completedAt) || (status === "My ideas" && challenge.isCustom);
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [challenges, search, category, status]);

    function clearFilters() {
        setSearch("");
        setCategory("All");
        setStatus("All practice");
    }

    function openChallenge(challenge) {
        router.push({ pathname: "/challenge/[id]", params: { id: challenge.id } });
    }

    const hasFilters = search.trim().length > 0 || category !== "All" || status !== "All practice";

    return (
        <AppScreen>
            <View style={styles.topRow}>
                <Brand compact />
                <Pressable accessibilityRole="button" accessibilityLabel="Create a challenge" onPress={() => router.push("/editor")} style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
                    <Ionicons name="add" size={21} color="#17200F" />
                    <Text style={styles.addText}>Create</Text>
                </Pressable>
            </View>

            <View style={styles.introduction}>
                <Text style={styles.eyebrow}>BREAK OUT OF YOUR USUAL PATTERNS</Text>
                <Text style={styles.heading}>The challenge{"\n"}archive.</Text>
                <Text style={styles.subtitle}>A fresh perspective is always a few hits away.</Text>
            </View>

            {operationError ? <FeedbackBanner message={operationError} type="error" onDismiss={clearOperationError} /> : null}

            {challenges.length > 0 ? (
                <>
                    <View style={styles.searchRow}>
                        <Ionicons name="search-outline" size={19} color="#A3AD9C" style={styles.searchIcon} />
                        <AppTextInput accessibilityLabel="Search challenges" placeholder="Search ideas, kit pieces, restrictions…" value={search} onChangeText={setSearch} autoCapitalize="none" autoCorrect={false} containerStyle={styles.searchField} style={styles.searchInput} />
                        {search.length > 0 ? <Pressable accessibilityRole="button" accessibilityLabel="Clear search" onPress={() => setSearch("")} style={styles.clearSearch}><Ionicons name="close-circle" size={19} color="#A3AD9C" /></Pressable> : null}
                    </View>

                    <View style={styles.categoryFilters}><FilterChips options={[{ label: "All challenges", value: "All" }, { label: "Grooves", value: "Groove" }, { label: "Fills", value: "Fill" }]} selected={category} onChange={setCategory} /></View>
                    <View style={styles.statusFilters}><FilterChips options={["All practice", "To try", "Completed", "My ideas"]} selected={status} onChange={setStatus} /></View>

                    <View style={styles.resultsRow}>
                        <Text style={styles.resultCount}>{visibleChallenges.length} {visibleChallenges.length === 1 ? "CHALLENGE" : "CHALLENGES"}</Text>
                        {hasFilters ? <Pressable accessibilityRole="button" onPress={clearFilters} hitSlop={8}><Text style={styles.clearFilters}>Reset filters</Text></Pressable> : <Text style={styles.collectionNote}>Find your next idea</Text>}
                    </View>

                    {visibleChallenges.length > 0 ? (
                        <View style={styles.list}>{visibleChallenges.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} onPress={() => openChallenge(challenge)} />)}</View>
                    ) : (
                        <EmptyState icon="search-outline" title="No ideas found. Yet." message="Try another search or clear the filters to see every challenge." actionText="Clear search & filters" onAction={clearFilters} />
                    )}
                </>
            ) : (
                <EmptyState icon="albums-outline" title="A blank page. A fresh beat." message="Your collection is empty. Give yourself a creative restriction and make the first challenge your own." actionText="Create your first challenge" onAction={() => router.push("/editor")} />
            )}

            <View style={styles.createPanel}>
                <Text style={styles.createEyebrow}>GOT A GOOD RESTRICTION?</Text>
                <Text style={styles.createHeading}>Turn it into a challenge.</Text>
                <Text style={styles.createCopy}>Your own ideas belong in the mix, too.</Text>
                <AppButton text="Create a challenge" variant="secondary" icon="add" onPress={() => router.push("/editor")} />
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
    addButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, minHeight: 40, backgroundColor: "#D9FC80", paddingHorizontal: 14, borderRadius: 20 },
    addText: { color: "#17200F", fontSize: 12, fontWeight: "700" },
    introduction: { marginTop: 34, marginBottom: 25 },
    eyebrow: { color: "#A3AD9C", fontSize: 10, letterSpacing: 1.5, fontWeight: "700", marginBottom: 15 },
    heading: { color: "#F4F3E9", fontSize: 42, lineHeight: 46, letterSpacing: -1.5, fontWeight: "700" },
    subtitle: { color: "#A3AD9C", fontSize: 15, lineHeight: 23, marginTop: 13 },
    searchRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#1C231A", borderWidth: 1, borderColor: "#303C2B", borderRadius: 14, paddingLeft: 16 },
    searchIcon: { marginRight: 8 },
    searchField: { flex: 1, minWidth: 0, marginBottom: 0 },
    searchInput: { borderWidth: 0, marginBottom: 0, marginVertical: 0, backgroundColor: "transparent", minWidth: 0, fontSize: 13, paddingHorizontal: 4 },
    clearSearch: { padding: 13 },
    categoryFilters: { marginTop: 22 },
    statusFilters: { marginTop: 10 },
    resultsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 27, marginBottom: 15, gap: 12 },
    resultCount: { color: "#A3AD9C", fontSize: 10, fontWeight: "700", letterSpacing: 1.5 },
    clearFilters: { color: "#D9FC80", fontSize: 12, fontWeight: "600" },
    collectionNote: { color: "#7F8D77", fontSize: 11 },
    list: { gap: 12 },
    createPanel: { marginTop: 30, borderRadius: 20, borderWidth: 1, borderColor: "#39462F", padding: 23, backgroundColor: "#192016" },
    createEyebrow: { color: "#A6BA93", fontSize: 9, letterSpacing: 1.5, fontWeight: "700", marginBottom: 12 },
    createHeading: { color: "#F4F3E9", fontSize: 22, fontWeight: "600", letterSpacing: -0.5 },
    createCopy: { color: "#A3AD9C", fontSize: 13, lineHeight: 20, marginTop: 8, marginBottom: 20 },
    pressed: { opacity: 0.75 },
});
