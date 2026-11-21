import assert from "node:assert/strict";
import test from "node:test";
import { INITIAL_CHALLENGES } from "../src/data/challenges.js";
import { challengeSchema, getFieldErrors, loginSchema, storeSchema } from "../src/utils/validation.js";
import {
  STORAGE_KEY,
  createInitialStore,
  createPersistentStore,
  decodeStore,
  encodeStore,
  ensureDailyAssignment,
  getDateKey,
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
  const invalid = challengeSchema.safeParse({ ...values, kitPieces: [], bpm: "not a number", title: " " });
  assert.equal(invalid.success, false);
  assert.ok(getFieldErrors(invalid.error).title);
  assert.ok(getFieldErrors(invalid.error).kitPieces);
  assert.ok(getFieldErrors(invalid.error).bpm);
  assert.equal(loginSchema.safeParse({ email: "student", password: "123" }).success, false);
  assert.equal(loginSchema.parse({ email: " STUDENT@EXAMPLE.COM ", password: "password2026" }).email, "student@example.com");
});

test("challenge text limits match the editor hints", () => {
  const values = INITIAL_CHALLENGES[0];
  const minimum = { ...values, title: "abc", description: "d".repeat(20), restrictions: "r".repeat(10) };
  const maximum = { ...values, title: "t".repeat(70), description: "d".repeat(600), restrictions: "r".repeat(300) };
  assert.equal(challengeSchema.safeParse(minimum).success, true);
  assert.equal(challengeSchema.safeParse(maximum).success, true);
  assert.equal(challengeSchema.safeParse({ ...minimum, description: "d".repeat(19) }).success, false);
  assert.equal(challengeSchema.safeParse({ ...minimum, restrictions: "r".repeat(9) }).success, false);
  assert.equal(challengeSchema.safeParse({ ...maximum, title: "t".repeat(71) }).success, false);
  assert.equal(challengeSchema.safeParse({ ...maximum, description: "d".repeat(601) }).success, false);
  assert.equal(challengeSchema.safeParse({ ...maximum, restrictions: "r".repeat(301) }).success, false);
});

test("missing storage seeds once while a saved empty collection remains empty", () => {
  const missing = decodeStore(null, TODAY);
  assert.equal(missing.store.challenges.length, 12);
  assert.equal(missing.needsSave, true);
  assert.ok(missing.store.dailyAssignments[TODAY]);
  const empty = decodeStore(JSON.stringify({ version: 1, challenges: [], dailyAssignments: {} }), TODAY);
  assert.deepEqual(empty.store.challenges, []);
  assert.deepEqual(empty.store.dailyAssignments, {});
  assert.equal(empty.needsSave, false);
});

test("corrupt, unsupported and duplicate stored records are rejected", () => {
  assert.throws(() => decodeStore("{broken", TODAY), /could not be read/);
  assert.throws(() => decodeStore(JSON.stringify({ version: 2, challenges: [], dailyAssignments: {} }), TODAY), /unsupported or damaged/);
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
  const withNewItem = { ...first, challenges: [...first.challenges, customChallenge("custom-test")] };
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

test("a damaged read never writes seeds or permits later updates", async () => {
  let writes = 0;
  let notifications = 0;
  const controller = createPersistentStore({
    getItem: async () => "{broken",
    setItem: async () => { writes += 1; },
  }, () => { notifications += 1; });
  await assert.rejects(controller.load(TODAY), /could not be read/);
  await assert.rejects(controller.update((current) => current, TODAY), /Load your library/);
  assert.equal(writes, 0);
  assert.equal(notifications, 0);
  assert.equal(controller.isLoaded(), false);
});

test("queued changes preserve both edits and publish only after durable writes", async () => {
  let raw = encodeStore(savedLibrary());
  let inFlight = 0;
  let maximumInFlight = 0;
  const notified = [];
  const controller = createPersistentStore({
    getItem: async (key) => { assert.equal(key, STORAGE_KEY); return raw; },
    setItem: async (key, value) => {
      assert.equal(key, STORAGE_KEY);
      inFlight += 1;
      maximumInFlight = Math.max(maximumInFlight, inFlight);
      await new Promise((resolve) => setImmediate(resolve));
      raw = value;
      inFlight -= 1;
    },
  }, (store) => {
    assert.equal(raw, encodeStore(store));
    notified.push(store.challenges.length);
  });
  await controller.load(TODAY);
  const addFirst = controller.update((current) => ({ ...current, challenges: [...current.challenges, customChallenge("first")] }), TODAY);
  const addSecond = controller.update((current) => ({ ...current, challenges: [...current.challenges, customChallenge("second")] }), TODAY);
  await Promise.all([addFirst, addSecond]);
  assert.equal(maximumInFlight, 1);
  assert.equal(controller.getCurrent().challenges.length, 14);
  assert.deepEqual(notified, [12, 13, 14]);
  assert.equal(decodeStore(raw, TODAY).store.challenges.length, 14);
});

test("a failed write leaves state intact and does not poison the next queued operation", async () => {
  let raw = encodeStore(savedLibrary());
  let shouldFail = true;
  const controller = createPersistentStore({
    getItem: async () => raw,
    setItem: async (key, value) => {
      if (shouldFail) { shouldFail = false; throw new Error("Storage full"); }
      raw = value;
    },
  });
  await controller.load(TODAY);
  await assert.rejects(controller.update((current) => ({ ...current, challenges: [...current.challenges, customChallenge("failed")] }), TODAY), /Storage full/);
  assert.equal(controller.getCurrent().challenges.length, 12);
  await controller.update((current) => ({ ...current, challenges: [...current.challenges, customChallenge("successful")] }), TODAY);
  assert.equal(controller.getCurrent().challenges.length, 13);
  assert.equal(controller.getCurrent().challenges.some((challenge) => challenge.id === "failed"), false);
  assert.equal(decodeStore(raw, TODAY).store.challenges.some((challenge) => challenge.id === "successful"), true);
});

test("deleting every item remains empty after saving and loading again", async () => {
  let raw = encodeStore(savedLibrary());
  const storage = {
    getItem: async () => raw,
    setItem: async (key, value) => { raw = value; },
  };
  const controller = createPersistentStore(storage);
  await controller.load(TODAY);
  await controller.update((current) => ({ ...current, challenges: [], dailyAssignments: {} }), TODAY);
  const restarted = createPersistentStore(storage);
  await restarted.load(TODAY);
  assert.deepEqual(restarted.getCurrent().challenges, []);
});
