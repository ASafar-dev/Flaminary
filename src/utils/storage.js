import { INITIAL_CHALLENGES } from "../data/challenges.js";
import { storeSchema } from "./validation.js";

export const STORAGE_KEY = "FLAMINARY_STORE_V1";

export function getDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function createInitialStore() {
  return {
    version: 1,
    challenges: INITIAL_CHALLENGES.map((challenge) => ({ ...challenge, kitPieces: [...challenge.kitPieces] })),
    dailyAssignments: {},
  };
}

// Keep an existing assignment stable when other challenges are added or edited.
export function ensureDailyAssignment(store, dateKey = getDateKey()) {
  const assignedId = store.dailyAssignments[dateKey];
  if (store.challenges.some((challenge) => challenge.id === assignedId)) return store;
  if (store.challenges.length === 0) return store;

  const previousDates = Object.keys(store.dailyAssignments).filter((date) => date < dateKey).sort();
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
  // An intentionally saved empty library is different from no saved data.
  if (raw === null) {
    return { store: ensureDailyAssignment(createInitialStore(), dateKey), needsSave: true };
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Your saved library could not be read. Retry loading; your saved data has not been replaced.");
  }
  const result = storeSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error("Your saved library has an unsupported or damaged format. Retry loading; your saved data has not been replaced.");
  }
  const store = ensureDailyAssignment(result.data, dateKey);
  return { store, needsSave: store !== result.data };
}

export function encodeStore(store) {
  return JSON.stringify(storeSchema.parse(store));
}

// Serialize reads and writes. Every mutation starts from the last saved state.
export function createPersistentStore(storage, onChange = () => {}) {
  let current = null;
  let loaded = false;
  let queue = Promise.resolve();

  function enqueue(operation) {
    const result = queue.then(operation, operation);
    queue = result.catch(() => {});
    return result;
  }

  function load(dateKey = getDateKey()) {
    return enqueue(async () => {
      loaded = false;
      const raw = await storage.getItem(STORAGE_KEY);
      const decoded = decodeStore(raw, dateKey);
      if (decoded.needsSave) await storage.setItem(STORAGE_KEY, encodeStore(decoded.store));
      current = decoded.store;
      loaded = true;
      onChange(current);
      return current;
    });
  }

  function update(change, dateKey = getDateKey()) {
    return enqueue(async () => {
      if (!loaded) throw new Error("Load your library before making changes.");
      const next = ensureDailyAssignment(change(current), dateKey);
      if (next === current) return current;
      await storage.setItem(STORAGE_KEY, encodeStore(next));
      current = next;
      onChange(current);
      return current;
    });
  }

  return { load, update, getCurrent: () => current, isLoaded: () => loaded };
}
