import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { MOCK_EMAIL, MOCK_PASSWORD } from "../data/constants.js";
import { challengeSchema, getFieldErrors, loginSchema } from "../utils/validation.js";
import {
    STORAGE_KEY,
    SAVE_BUSY_MESSAGE,
    decodeStore,
    encodeStore,
    ensureDailyAssignment,
    getDateKey,
    saveLibrary,
} from "../utils/storage.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [store, setStore] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [operationError, setOperationError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [todayKey, setTodayKey] = useState(getDateKey);
    const savedStore = useRef(null);
    const busy = useRef(false);

    function reportLoadFailure(error) {
        const message = error.message?.startsWith("Your saved challenges")
            ? error.message
            : "Loading your saved challenges failed. Check device storage and try again. Your saved data has not been replaced.";
        setLoadError(message);
        return { success: false, error: message };
    }

    function loadLibrary() {
        if (busy.current) return Promise.resolve({ success: false, error: SAVE_BUSY_MESSAGE });
        busy.current = true;
        savedStore.current = null;
        return AsyncStorage.getItem(STORAGE_KEY)
            .then(async (raw) => {
                const loaded = decodeStore(raw);
                if (loaded.needsSave)
                    await AsyncStorage.setItem(STORAGE_KEY, encodeStore(loaded.store));
                savedStore.current = loaded.store;
                setStore(loaded.store);
                return { success: true };
            })
            .catch(reportLoadFailure)
            .finally(() => {
                busy.current = false;
                setIsLoading(false);
                refreshToday();
            });
    }

    function retryLoad() {
        if (busy.current) return Promise.resolve({ success: false, error: SAVE_BUSY_MESSAGE });
        setIsLoading(true);
        setLoadError("");
        setOperationError("");
        return loadLibrary();
    }

    async function saveChange(change, successId) {
        if (savedStore.current === null || busy.current) {
            const message =
                savedStore.current === null
                    ? "Load your saved challenges before making changes."
                    : SAVE_BUSY_MESSAGE;
            setOperationError(message);
            return { success: false, error: message };
        }
        setOperationError("");
        setIsSaving(true);
        const dateKey = getDateKey();
        try {
            const next = await saveLibrary(AsyncStorage, savedStore, busy, change, dateKey);
            setStore(next);
            return { success: true, ...(successId ? { id: successId } : {}) };
        } catch {
            const message = "Saving failed. Your saved challenges are unchanged. Try again.";
            setOperationError(message);
            return { success: false, error: message };
        } finally {
            setIsSaving(false);
            if (dateKey !== getDateKey()) refreshToday();
        }
    }

    function refreshToday() {
        const dateKey = getDateKey();
        setTodayKey(dateKey);
        const current = savedStore.current;
        if (current && !busy.current && ensureDailyAssignment(current, dateKey) !== current) {
            saveChange((saved) => ensureDailyAssignment(saved, dateKey));
        }
    }

    useEffect(() => {
        loadLibrary();
        // Load once on mount. Later reads use the retry action and the same refs.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let timer;

        function scheduleMidnight() {
            clearTimeout(timer);
            const now = new Date();
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            timer = setTimeout(
                () => {
                    refreshToday();
                    scheduleMidnight();
                },
                midnight.getTime() - now.getTime() + 50,
            );
        }

        scheduleMidnight();
        const listener = AppState.addEventListener("change", (state) => {
            if (state === "active") {
                refreshToday();
                scheduleMidnight();
            }
        });
        return () => {
            clearTimeout(timer);
            listener.remove();
        };
        // These callbacks read the latest saved ref instead of a captured list.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function signIn(email, password) {
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
            return {
                success: false,
                error: result.error.issues[0].message,
                errors: getFieldErrors(result.error),
            };
        }
        if (result.data.email !== MOCK_EMAIL || result.data.password !== MOCK_PASSWORD) {
            return { success: false, error: "Email or password is incorrect.", errors: {} };
        }
        setSignedIn(true);
        return { success: true };
    }

    function signOut() {
        setSignedIn(false);
        setOperationError("");
    }

    function validateChallenge(values) {
        const result = challengeSchema.safeParse(values);
        if (!result.success) {
            return {
                success: false,
                error: result.error.issues[0].message,
                errors: getFieldErrors(result.error),
            };
        }
        return { success: true, values: result.data };
    }

    function createChallenge(values) {
        const result = validateChallenge(values);
        if (!result.success) return Promise.resolve(result);
        const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const challenge = {
            ...result.values,
            id,
            createdAt: new Date().toISOString(),
            completedAt: null,
            isCustom: true,
        };
        return saveChange(
            (current) => ({ ...current, challenges: [challenge, ...current.challenges] }),
            id,
        );
    }

    function updateChallenge(id, values) {
        const result = validateChallenge(values);
        if (!result.success) return Promise.resolve(result);
        return saveChange((current) => {
            if (!current.challenges.some((challenge) => challenge.id === id))
                throw new Error("Challenge no longer exists.");
            return {
                ...current,
                challenges: current.challenges.map((challenge) =>
                    challenge.id === id ? { ...challenge, ...result.values } : challenge,
                ),
            };
        }, id);
    }

    function deleteChallenge(id) {
        return saveChange((current) => {
            if (!current.challenges.some((challenge) => challenge.id === id))
                throw new Error("Challenge no longer exists.");
            const dailyAssignments = {};
            for (const [date, assignedId] of Object.entries(current.dailyAssignments)) {
                if (assignedId !== id) dailyAssignments[date] = assignedId;
            }
            return {
                ...current,
                challenges: current.challenges.filter((challenge) => challenge.id !== id),
                dailyAssignments,
            };
        });
    }

    function toggleCompletion(id) {
        return saveChange((current) => {
            if (!current.challenges.some((challenge) => challenge.id === id))
                throw new Error("Challenge no longer exists.");
            return {
                ...current,
                challenges: current.challenges.map((challenge) =>
                    challenge.id === id
                        ? {
                              ...challenge,
                              completedAt: challenge.completedAt ? null : new Date().toISOString(),
                          }
                        : challenge,
                ),
            };
        }, id);
    }

    const challenges = store?.challenges || [];
    const todayChallenge =
        challenges.find((challenge) => challenge.id === store?.dailyAssignments[todayKey]) || null;

    return (
        <AppContext.Provider
            value={{
                challenges,
                isLoading,
                loadError,
                operationError,
                isSaving,
                signedIn,
                signIn,
                signOut,
                retryLoad,
                clearOperationError: () => setOperationError(""),
                createChallenge,
                updateChallenge,
                deleteChallenge,
                toggleCompletion,
                todayChallenge,
                todayKey,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const app = useContext(AppContext);
    if (!app) throw new Error("useApp must be used inside AppProvider.");
    return app;
}
