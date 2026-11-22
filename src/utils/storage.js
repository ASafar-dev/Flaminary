import { INITIAL_CHALLENGES } from "../data/challenges.js";
import { LEGACY_CHALLENGE_COPY } from "../data/legacyChallengeCopy.js";
import { storeSchema } from "./validation.js";

export const STORAGE_KEY = "FLAMINARY_STORE_V1";
export const SAVE_BUSY_MESSAGE = "I’m saving another change. Try again in a moment.";

export function getDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function createInitialStore() {
    return {
        version: 1,
        challenges: INITIAL_CHALLENGES.map((challenge) => ({
            ...challenge,
            kitPieces: [...challenge.kitPieces],
        })),
        dailyAssignments: {},
    };
}

// Keep an existing assignment stable when other challenges are added or edited.
export function ensureDailyAssignment(store, dateKey = getDateKey()) {
    const assignedId = store.dailyAssignments[dateKey];
    if (store.challenges.some((challenge) => challenge.id === assignedId)) return store;
    if (store.challenges.length === 0) return store;

    const previousDates = Object.keys(store.dailyAssignments)
        .filter((date) => date < dateKey)
        .sort();
    const previousId = store.dailyAssignments[previousDates[previousDates.length - 1]];
    let choices = [...store.challenges].sort((first, second) => first.id.localeCompare(second.id));
    if (choices.length > 1) choices = choices.filter((challenge) => challenge.id !== previousId);

    const [year, month, day] = dateKey.split("-").map(Number);
    const dayNumber = Math.floor(Date.UTC(year, month - 1, day) / 86400000);
    const selected = choices[Math.abs(dayNumber) % choices.length];
    return {
        ...store,
        dailyAssignments: { ...store.dailyAssignments, [dateKey]: selected.id },
    };
}

export function decodeStore(raw, dateKey = getDateKey()) {
    // An intentionally saved empty list is different from no saved data.
    if (raw === null) {
        return { store: ensureDailyAssignment(createInitialStore(), dateKey), needsSave: true };
    }

    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch {
        throw new Error(
            "Your saved challenges are unreadable. Try loading again. Your saved data has not been replaced.",
        );
    }

    let difficultyChanged = false;
    if (parsed?.version === 1 && Array.isArray(parsed.challenges)) {
        parsed.challenges = parsed.challenges.map((challenge) => {
            let difficulty = challenge?.difficulty;
            if (difficulty === "Starter") difficulty = "Beginner";
            else if (difficulty === "Developing") difficulty = "Intermediate";
            else if (difficulty === "Stretch") difficulty = "Advanced";
            if (difficulty === challenge?.difficulty) return challenge;
            difficultyChanged = true;
            return { ...challenge, difficulty };
        });
    }

    const result = storeSchema.safeParse(parsed);
    if (!result.success) {
        throw new Error(
            "Your saved challenges use an unsupported or damaged format. Try loading again. Your saved data has not been replaced.",
        );
    }
    const store = ensureDailyAssignment(refreshBuiltInCopy(result.data), dateKey);
    return { store, needsSave: difficultyChanged || store !== result.data };
}

// Change only default text. Keep saved edits and completion records.
export function refreshBuiltInCopy(store) {
    let changed = false;
    const challenges = store.challenges.map((challenge) => {
        if (challenge.isCustom) return challenge;
        const oldCopy = LEGACY_CHALLENGE_COPY.find((item) => item.id === challenge.id);
        const newCopy = INITIAL_CHALLENGES.find((item) => item.id === challenge.id);
        if (!oldCopy || !newCopy) return challenge;
        const updated = { ...challenge };
        for (const field of ["title", "description", "restrictions"]) {
            if (challenge[field] === oldCopy[field] && challenge[field] !== newCopy[field]) {
                updated[field] = newCopy[field];
                changed = true;
            }
        }
        return updated;
    });
    return changed ? { ...store, challenges } : store;
}

export function encodeStore(store) {
    return JSON.stringify(storeSchema.parse(store));
}

// Save one change at a time. A failed write leaves the saved state intact.
export async function saveLibrary(storage, savedStore, busy, change, dateKey = getDateKey()) {
    if (savedStore.current === null)
        throw new Error("Load your saved challenges before making changes.");
    if (busy.current) throw new Error(SAVE_BUSY_MESSAGE);
    busy.current = true;
    try {
        const next = ensureDailyAssignment(change(savedStore.current), dateKey);
        await storage.setItem(STORAGE_KEY, encodeStore(next));
        savedStore.current = next;
        return next;
    } finally {
        busy.current = false;
    }
}
