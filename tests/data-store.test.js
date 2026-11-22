import assert from "node:assert/strict";
import test from "node:test";
import { INITIAL_CHALLENGES } from "../src/data/challenges.js";
import { LEGACY_CHALLENGE_COPY } from "../src/data/legacyChallengeCopy.js";
import {
    challengeSchema,
    getFieldErrors,
    loginSchema,
    storeSchema,
} from "../src/utils/validation.js";
import {
    STORAGE_KEY,
    createInitialStore,
    decodeStore,
    encodeStore,
    ensureDailyAssignment,
    getDateKey,
    saveLibrary,
    SAVE_BUSY_MESSAGE,
} from "../src/utils/storage.js";

const TODAY = "2026-11-21";

function savedLibrary() {
    return ensureDailyAssignment(createInitialStore(), TODAY);
}

function customChallenge(id) {
    return { ...INITIAL_CHALLENGES[0], id, title: `Practice ${id}`, isCustom: true };
}

test("all twelve mock challenges have valid, unique data", () => {
    assert.equal(INITIAL_CHALLENGES.length, 12);
    assert.equal(storeSchema.safeParse(createInitialStore()).success, true);
    assert.equal(new Set(INITIAL_CHALLENGES.map((challenge) => challenge.id)).size, 12);
});

test("forms reject invalid values and convert numeric text into stored numbers", () => {
    const values = { ...INITIAL_CHALLENGES[0], title: "  New fill  ", bpm: "90", minutes: "15" };
    const valid = challengeSchema.parse(values);
    assert.equal(valid.title, "New fill");
    assert.equal(valid.bpm, 90);
    assert.equal(valid.minutes, 15);
    const invalid = challengeSchema.safeParse({
        ...values,
        kitPieces: [],
        bpm: "not a number",
        title: " ",
    });
    assert.equal(invalid.success, false);
    assert.ok(getFieldErrors(invalid.error).title);
    assert.ok(getFieldErrors(invalid.error).kitPieces);
    assert.ok(getFieldErrors(invalid.error).bpm);
    assert.equal(loginSchema.safeParse({ email: "student", password: "123" }).success, false);
    assert.equal(
        loginSchema.parse({ email: " STUDENT@EXAMPLE.COM ", password: "password2026" }).email,
        "student@example.com",
    );
});

test("challenge text limits match the editor hints", () => {
    const values = INITIAL_CHALLENGES[0];
    const minimum = {
        ...values,
        title: "abc",
        description: "d".repeat(20),
        restrictions: "r".repeat(10),
    };
    const maximum = {
        ...values,
        title: "t".repeat(70),
        description: "d".repeat(600),
        restrictions: "r".repeat(300),
    };
    assert.equal(challengeSchema.safeParse(minimum).success, true);
    assert.equal(challengeSchema.safeParse(maximum).success, true);
    assert.equal(
        challengeSchema.safeParse({ ...minimum, description: "d".repeat(19) }).success,
        false,
    );
    assert.equal(
        challengeSchema.safeParse({ ...minimum, restrictions: "r".repeat(9) }).success,
        false,
    );
    assert.equal(challengeSchema.safeParse({ ...maximum, title: "t".repeat(71) }).success, false);
    assert.equal(
        challengeSchema.safeParse({ ...maximum, description: "d".repeat(601) }).success,
        false,
    );
    assert.equal(
        challengeSchema.safeParse({ ...maximum, restrictions: "r".repeat(301) }).success,
        false,
    );
});

test("missing storage seeds once while a saved empty collection remains empty", () => {
    const missing = decodeStore(null, TODAY);
    assert.equal(missing.store.challenges.length, 12);
    assert.equal(missing.needsSave, true);
    assert.ok(missing.store.dailyAssignments[TODAY]);
    const empty = decodeStore(
        JSON.stringify({ version: 1, challenges: [], dailyAssignments: {} }),
        TODAY,
    );
    assert.deepEqual(empty.store.challenges, []);
    assert.deepEqual(empty.store.dailyAssignments, {});
    assert.equal(empty.needsSave, false);
});

test("corrupt, unsupported and duplicate stored records are rejected", () => {
    assert.throws(() => decodeStore("{broken", TODAY), /unreadable/);
    assert.throws(
        () =>
            decodeStore(
                JSON.stringify({ version: 2, challenges: [], dailyAssignments: {} }),
                TODAY,
            ),
        /unsupported or damaged/,
    );
    const duplicate = createInitialStore();
    duplicate.challenges.push(duplicate.challenges[0]);
    assert.throws(() => decodeStore(JSON.stringify(duplicate), TODAY), /unsupported or damaged/);
    const malformed = createInitialStore();
    malformed.challenges[0].bpm = "80";
    assert.throws(() => decodeStore(JSON.stringify(malformed), TODAY), /unsupported or damaged/);
});

test("a daily challenge stays fixed after adding items and changes on the next day", () => {
    const first = savedLibrary();
    const selectedId = first.dailyAssignments[TODAY];
    const withNewItem = {
        ...first,
        challenges: [...first.challenges, customChallenge("custom-test")],
    };
    assert.equal(ensureDailyAssignment(withNewItem, TODAY).dailyAssignments[TODAY], selectedId);
    const tomorrow = ensureDailyAssignment(first, "2026-11-22");
    assert.notEqual(tomorrow.dailyAssignments["2026-11-22"], selectedId);
    assert.equal(tomorrow.dailyAssignments[TODAY], selectedId);
});

test("daily selection works with one challenge and with an empty collection", () => {
    const one = { version: 1, challenges: [customChallenge("only-one")], dailyAssignments: {} };
    const first = ensureDailyAssignment(one, TODAY);
    const second = ensureDailyAssignment(first, "2026-11-22");
    assert.equal(second.dailyAssignments["2026-11-22"], "only-one");
    const empty = { version: 1, challenges: [], dailyAssignments: {} };
    assert.equal(ensureDailyAssignment(empty, TODAY), empty);
    assert.equal(getDateKey(new Date(2026, 10, 21, 23, 59)), TODAY);
});

test("writes are blocked before saved data finishes loading", async () => {
    let writes = 0;
    const saved = { current: null };
    const busy = { current: false };
    const storage = {
        setItem: async () => {
            writes += 1;
        },
    };
    assert.throws(() => decodeStore("{broken", TODAY), /unreadable/);
    await assert.rejects(
        saveLibrary(storage, saved, busy, (current) => current, TODAY),
        /Load your saved challenges/,
    );
    assert.equal(writes, 0);
    assert.equal(saved.current, null);
    assert.equal(busy.current, false);
});

test("a busy save rejects a second change and publishes only after storage succeeds", async () => {
    let raw = encodeStore(savedLibrary());
    const saved = { current: savedLibrary() };
    const busy = { current: false };
    let release;
    let firstWrite = true;
    const storage = {
        setItem: async (key, value) => {
            assert.equal(key, STORAGE_KEY);
            if (firstWrite) {
                firstWrite = false;
                await new Promise((resolve) => {
                    release = resolve;
                });
            }
            raw = value;
        },
    };
    const addFirst = saveLibrary(
        storage,
        saved,
        busy,
        (current) => ({
            ...current,
            challenges: [...current.challenges, customChallenge("first")],
        }),
        TODAY,
    );
    assert.equal(busy.current, true);
    assert.equal(saved.current.challenges.length, 12);
    await assert.rejects(
        saveLibrary(
            storage,
            saved,
            busy,
            (current) => ({
                ...current,
                challenges: [...current.challenges, customChallenge("second")],
            }),
            TODAY,
        ),
        { message: SAVE_BUSY_MESSAGE },
    );
    release();
    await addFirst;
    assert.equal(busy.current, false);
    assert.equal(saved.current.challenges.length, 13);
    assert.equal(raw, encodeStore(saved.current));
    await saveLibrary(
        storage,
        saved,
        busy,
        (current) => ({
            ...current,
            challenges: [...current.challenges, customChallenge("second")],
        }),
        TODAY,
    );
    assert.equal(saved.current.challenges.length, 14);
    assert.equal(decodeStore(raw, TODAY).store.challenges.length, 14);
});

test("a failed write keeps state intact and releases the busy flag for a retry", async () => {
    let raw = encodeStore(savedLibrary());
    const saved = { current: savedLibrary() };
    const busy = { current: false };
    let shouldFail = true;
    const storage = {
        setItem: async (key, value) => {
            if (shouldFail) {
                shouldFail = false;
                throw new Error("Storage full");
            }
            raw = value;
        },
    };
    await assert.rejects(
        saveLibrary(
            storage,
            saved,
            busy,
            (current) => ({
                ...current,
                challenges: [...current.challenges, customChallenge("failed")],
            }),
            TODAY,
        ),
        /Storage full/,
    );
    assert.equal(saved.current.challenges.length, 12);
    assert.equal(busy.current, false);
    await saveLibrary(
        storage,
        saved,
        busy,
        (current) => ({
            ...current,
            challenges: [...current.challenges, customChallenge("successful")],
        }),
        TODAY,
    );
    assert.equal(saved.current.challenges.length, 13);
    assert.equal(
        saved.current.challenges.some((challenge) => challenge.id === "failed"),
        false,
    );
    assert.equal(
        decodeStore(raw, TODAY).store.challenges.some((challenge) => challenge.id === "successful"),
        true,
    );
});

test("deleting every item remains empty after saving and loading again", async () => {
    let raw = encodeStore(savedLibrary());
    const storage = {
        getItem: async () => raw,
        setItem: async (key, value) => {
            raw = value;
        },
    };
    const saved = { current: decodeStore(await storage.getItem(), TODAY).store };
    await saveLibrary(
        storage,
        saved,
        { current: false },
        (current) => ({ ...current, challenges: [], dailyAssignments: {} }),
        TODAY,
    );
    const restarted = decodeStore(await storage.getItem(), TODAY);
    assert.deepEqual(restarted.store.challenges, []);
    assert.equal(restarted.needsSave, false);
});

test("old built-in text refreshes without losing completions or daily assignments", () => {
    const old = savedLibrary();
    old.challenges = old.challenges.map((challenge) => ({
        ...challenge,
        ...LEGACY_CHALLENGE_COPY.find((item) => item.id === challenge.id),
    }));
    old.challenges[0].completedAt = "2026-11-20T10:30:00.000Z";
    const loaded = decodeStore(JSON.stringify(old), TODAY);
    assert.equal(loaded.needsSave, true);
    assert.deepEqual(
        loaded.store.challenges.map((challenge) => challenge.title),
        INITIAL_CHALLENGES.map((challenge) => challenge.title),
    );
    assert.equal(loaded.store.challenges[0].completedAt, old.challenges[0].completedAt);
    assert.deepEqual(loaded.store.dailyAssignments, old.dailyAssignments);
    assert.equal(decodeStore(encodeStore(loaded.store), TODAY).needsSave, false);
});

test("text refresh preserves edited fields, custom items and deleted records", () => {
    const old = savedLibrary();
    old.challenges = old.challenges
        .slice(0, 3)
        .map((challenge) => ({
            ...challenge,
            ...LEGACY_CHALLENGE_COPY.find((item) => item.id === challenge.id),
        }));
    old.dailyAssignments = { [TODAY]: old.challenges[0].id };
    old.challenges[0].title = "My edited title";
    old.challenges[1].description = "My own instructions for this practice challenge.";
    old.challenges[1].restrictions = "My own restriction: kick and snare only.";
    old.challenges[2].isCustom = true;
    const customCopy = { ...old.challenges[2] };
    old.challenges.push(customChallenge("custom-personal"));
    const loaded = decodeStore(JSON.stringify(old), TODAY).store;
    assert.equal(loaded.challenges.length, 4);
    assert.equal(loaded.challenges[0].title, "My edited title");
    assert.equal(loaded.challenges[0].description, INITIAL_CHALLENGES[0].description);
    assert.equal(loaded.challenges[1].description, old.challenges[1].description);
    assert.equal(loaded.challenges[1].restrictions, old.challenges[1].restrictions);
    assert.equal(loaded.challenges[1].title, INITIAL_CHALLENGES[1].title);
    assert.deepEqual(loaded.challenges[2], customCopy);
    assert.deepEqual(loaded.challenges[3], old.challenges[3]);
});

test("V1 difficulty names migrate before validation for built-in and custom challenges", () => {
    const old = savedLibrary();
    old.challenges = old.challenges.slice(0, 3);
    old.dailyAssignments = { [TODAY]: old.challenges[0].id };
    old.challenges[0].difficulty = "Starter";
    old.challenges[0].completedAt = "2026-11-20T10:30:00.000Z";
    old.challenges[1].difficulty = "Developing";
    old.challenges[1].title = "My saved title";
    old.challenges[2] = { ...customChallenge("custom-old-difficulty"), difficulty: "Stretch" };
    const before = JSON.parse(JSON.stringify(old));
    const loaded = decodeStore(JSON.stringify(old), TODAY);
    assert.equal(loaded.needsSave, true);
    assert.deepEqual(
        loaded.store.challenges.map((challenge) => challenge.difficulty),
        ["Beginner", "Intermediate", "Advanced"],
    );
    for (let index = 0; index < before.challenges.length; index += 1) {
        const { difficulty: oldDifficulty, ...oldFields } = before.challenges[index];
        const { difficulty: newDifficulty, ...newFields } = loaded.store.challenges[index];
        assert.notEqual(oldDifficulty, newDifficulty);
        assert.deepEqual(newFields, oldFields);
    }
    assert.deepEqual(loaded.store.dailyAssignments, before.dailyAssignments);
    assert.equal(decodeStore(encodeStore(loaded.store), TODAY).needsSave, false);
    assert.equal(
        challengeSchema.safeParse({ ...INITIAL_CHALLENGES[0], difficulty: "Starter" }).success,
        false,
    );
});

test("default prompts use literal text and the requested titles", () => {
    assert.deepEqual(
        INITIAL_CHALLENGES.map((challenge) => challenge.title),
        [
            "Two-tom fill",
            "Eight-hit groove",
            "Ghost-note groove",
            "Three-note fill",
            "Three-beat groove",
            "Kick and floor-tom fill",
            "6/8 groove",
            "Offbeat hi-hat groove",
            "One-hand fill",
            "7/8 groove",
            "Moving accent fill",
            "Four-bar crash pattern",
        ],
    );
    const excludedWords =
        /\b(can|may|just|that|very|really|literally|actually|certainly|probably|basically|could|maybe|imagine|discover|unlock|boost|however)\b|—/i;
    for (const challenge of INITIAL_CHALLENGES) {
        assert.doesNotMatch(
            [challenge.title, challenge.description, challenge.restrictions].join(" "),
            excludedWords,
        );
    }
});
