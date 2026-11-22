import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import AppTextInput from "../../components/AppTextInput";
import ChallengeCard from "../../components/ChallengeCard";
import EmptyState from "../../components/EmptyState";
import FeedbackBanner from "../../components/FeedbackBanner";
import FilterChips from "../../components/FilterChips";
import { useApp } from "../../context/AppContext.jsx";

export default function ExploreScreen() {
    const { challenges, operationError, clearOperationError } = useApp();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");
    const query = search.trim().toLowerCase();

    const visibleChallenges = challenges.filter((challenge) => {
        const searchableText = [
            challenge.title,
            challenge.description,
            challenge.restrictions,
            challenge.difficulty,
            ...challenge.kitPieces.map((piece) => piece.replaceAll("-", " ")),
        ]
            .join(" ")
            .toLowerCase();
        const matchesSearch = !query || searchableText.includes(query);
        const matchesCategory = category === "All" || challenge.category === category;
        const matchesStatus =
            status === "All" ||
            (status === "To try" && !challenge.completedAt) ||
            (status === "Completed" && !!challenge.completedAt) ||
            (status === "My challenges" && challenge.isCustom);
        return matchesSearch && matchesCategory && matchesStatus;
    });

    function clearFilters() {
        setSearch("");
        setCategory("All");
        setStatus("All");
    }

    function openChallenge(challenge) {
        router.push({ pathname: "/challenge/[id]", params: { id: challenge.id } });
    }

    const hasFilters = query.length > 0 || category !== "All" || status !== "All";

    return (
        <AppScreen>
            <View style={styles.headingRow}>
                <Text accessibilityRole="header" style={styles.heading}>
                    Challenges
                </Text>
                <View style={styles.addAction}>
                    <AppButton text="Add" onPress={() => router.push("/editor")} />
                </View>
            </View>
            {!!operationError && (
                <FeedbackBanner
                    message={operationError}
                    type="error"
                    onDismiss={clearOperationError}
                />
            )}

            {challenges.length > 0 ? (
                <>
                    <AppTextInput
                        label="Search challenges"
                        placeholder="Search by title, kit piece, or restriction"
                        value={search}
                        onChangeText={setSearch}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <View style={styles.filterGroup}>
                        <Text style={styles.label}>Type</Text>
                        <FilterChips
                            options={[
                                { label: "All", value: "All" },
                                { label: "Grooves", value: "Groove" },
                                { label: "Fills", value: "Fill" },
                            ]}
                            selected={category}
                            onChange={setCategory}
                        />
                    </View>
                    <View style={styles.filterGroup}>
                        <Text style={styles.label}>Status</Text>
                        <FilterChips
                            options={[
                                { label: "All", value: "All" },
                                "To try",
                                "Completed",
                                "My challenges",
                            ]}
                            selected={status}
                            onChange={setStatus}
                        />
                    </View>
                    <View style={styles.resultsRow}>
                        <Text style={styles.resultCount}>
                            {visibleChallenges.length} of {challenges.length} challenges
                        </Text>
                        {hasFilters && (
                            <Pressable
                                accessibilityRole="button"
                                onPress={clearFilters}
                                style={styles.clearAction}
                            >
                                <Text style={styles.clearText}>Clear filters</Text>
                            </Pressable>
                        )}
                    </View>
                    {visibleChallenges.length > 0 ? (
                        visibleChallenges.map((challenge) => (
                            <ChallengeCard
                                key={challenge.id}
                                challenge={challenge}
                                onPress={() => openChallenge(challenge)}
                            />
                        ))
                    ) : (
                        <EmptyState
                            title="No matching challenges"
                            message="Change the search or filters."
                            actionText="Clear search and filters"
                            onAction={clearFilters}
                        />
                    )}
                </>
            ) : (
                <EmptyState
                    title="No challenges yet"
                    message="Add a challenge to start a list."
                    actionText="Add a challenge"
                    onAction={() => router.push("/editor")}
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
    heading: { flex: 1, color: "#203B35", fontSize: 26, fontWeight: "700" },
    addAction: { width: 88 },
    filterGroup: { marginTop: 8, marginBottom: 12 },
    label: { color: "#203B35", fontSize: 16, fontWeight: "600", marginBottom: 8 },
    resultsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        marginTop: 8,
        marginBottom: 16,
    },
    resultCount: { color: "#61736B", fontSize: 14, flex: 1 },
    clearAction: { minHeight: 44, justifyContent: "center", paddingLeft: 8 },
    clearText: { color: "#285548", fontSize: 14, fontWeight: "600" },
});
