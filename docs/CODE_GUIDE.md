# Code guide

Flaminary uses plain JavaScript and JSX with the patterns taught in the supplied MyTasks projects. Version 1.1.0 simplifies the interface and storage code and updates Expo to SDK 58.

## Course patterns

| Pattern | Use in Flaminary |
| --- | --- |
| `useState` | Form values, errors, search, filters, saved list, and mock session |
| `useEffect` | Load saved data once and refresh the daily date |
| `map`, `filter`, `find` | Render cards, filter the list, update/delete items, and look up details by ID |
| Props and callbacks | Button actions, card selection, filter changes, and delete confirmation |
| AppScreen, AppButton, AppTextInput | Reused screen, button, and field layouts |
| Expo Router | Entry screens, three tabs, details, and one add/edit form |
| Zod `safeParse` | Login, challenge forms, and stored-data validation |
| AsyncStorage and JSON | Save challenges, completion dates, and daily assignments |

A small Context provider shares the parent state across Router screens. Details receive an ID and find the current item in this shared list. They do not rely on copied challenge text in URL parameters.

## Files

| Path | Purpose |
| --- | --- |
| `src/app/_layout.jsx` | Provider, loading/retry feedback, protected routes |
| `src/app/index.jsx`, `login.jsx` | Welcome and Sign in |
| `src/app/(tabs)/` | Today, Challenges, and Progress tabs |
| `src/app/challenge/[id].jsx` | Details, completion, edit link, delete confirmation |
| `src/app/editor.jsx` | Add/Edit challenge form |
| `src/components/` | Shared controls and layouts |
| `src/context/AppContext.jsx` | Shared list, mock session, and actions |
| `src/data/challenges.js` | Twelve starter exercises |
| `src/data/constants.js` | Mock credentials and allowed choices |
| `src/data/legacyChallengeCopy.js` | Previous built-in wording for saved-data updates |
| `src/utils/validation.js` | Zod schemas and field errors |
| `src/utils/storage.js` | JSON loading/saving and daily assignment |
| `tests/data-store.test.js` | Storage and validation regression tests |

Components and helpers stay outside the route directory.

## Loading and saving

The storage key is `FLAMINARY_STORE_V1`. Its object contains a version number, challenge list, and daily assignments.

Missing storage gets the starter list. A saved empty list stays empty. Parsed saved data passes a Zod check before use. Failed reads show a retry screen and preserve the stored value.

A busy flag allows one read or save at a time. Save controls are disabled during the operation; a second overlapping action returns a message. There is no generic queued controller. A save writes the next list before replacing the shared state. A failed write leaves the last saved list visible.

Version 1.1.0 updates built-in wording only when its saved text still matches the earlier default. Custom challenges, edited text, and completion records are retained.

## Daily assignment and progress

The date uses the device's local calendar. An assignment remains fixed during its date. The previous assignment is excluded when other challenges exist. Deleting the assigned item chooses a replacement. An empty list shows an Add action.

Completion stores a date and supports undo. Counts and suggested minutes are calculated from current challenges. Removing an item also removes its completion record.

## Forms and session

The challenge form validates title length 3–70, description 20–600, restrictions 10–300, at least one kit piece, whole-number tempo 40–240 BPM, and practice time 5–45 minutes. Type, difficulty, and time signature use fixed options.

Login validates input and checks the predefined email/password. Signed-in state is not persisted. Logout protects the main screens from direct links and Back navigation. This mock login is separate from an Expo account used to open Expo Go.

## References

- [Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/)
- [Expo Router navigation](https://docs.expo.dev/router/basics/navigation/)
- [Protected routes](https://docs.expo.dev/router/advanced/protected/)
- [Expo AsyncStorage reference](https://docs.expo.dev/versions/v58.0.0/sdk/async-storage/)
- [AsyncStorage usage](https://react-native-async-storage.github.io/2.0/Usage/)
- [Zod basics](https://zod.dev/basics)

See [source credits](SOURCE_CREDITS.md) for the course material and AI assistance.
