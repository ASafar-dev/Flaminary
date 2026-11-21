# How the Flaminary code follows the course examples

Flaminary extends the supplied MyTasks projects into a daily creativity challenge app for drummers. It keeps the course's plain JavaScript, JSX, React hooks, reusable components, props, Expo Router, Zod, and AsyncStorage. Application code was adapted and authored with AI assistance at the student's request; it is not an unchanged copy of the course app.

## Familiar patterns

| Course example | Flaminary use |
| --- | --- |
| `useState` for form and task values | Login input, editor fields, search, filters, confirmation dialog, and success feedback |
| `map`, `filter`, and `find` | Render challenge cards, filter the archive, update/delete challenges, and find details by ID |
| Reusable AppButton, AppScreen, and AppTextInput | Consistent buttons, scrollable screens, input styling, and field errors |
| Props and callback functions | Cards open details; filters update parent state; dialog buttons confirm or cancel |
| Expo Router stack and route parameters | Welcome/login flow, three main tabs, details by challenge ID, and one create/edit screen |
| Zod `safeParse` | Validate login and editor forms, keep invalid values visible, and show understandable errors |
| AsyncStorage with JSON data | Preserve challenges, completion dates, and daily assignments between app restarts |

## File map

| Path | Responsibility |
| --- | --- |
| `src/app/_layout.jsx` | Safe area, loading/retry feedback, and protected signed-in routes |
| `src/app/index.jsx` and `login.jsx` | Welcome, mock credentials, validation, and entry to the app |
| `src/app/(tabs)/_layout.jsx` | Today, Explore, and Progress navigation |
| `src/app/(tabs)/today.jsx` | Stable daily prompt, kit illustration, and links to practice |
| `src/app/(tabs)/explore.jsx` | Collection, combined text/category/status filters, and empty/no-results states |
| `src/app/(tabs)/progress.jsx` | Completed collection and derived totals |
| `src/app/challenge/[id].jsx` | Current item details, completion, editing, and confirmed deletion |
| `src/app/editor.jsx` | One form for creating and editing challenges |
| `src/components/` | Reusable UI, drum-kit illustration, cards, chips, dialog, banners, and back navigation |
| `src/context/AppContext.jsx` | Parent-owned shared challenge state, session state, and application actions |
| `src/data/challenges.js` | Twelve realistic local practice challenges |
| `src/data/constants.js` | Mock credentials, allowed kit pieces, categories, difficulties, and time signatures |
| `src/utils/validation.js` | Form schemas and stored-data validation |
| `src/utils/storage.js` | Loading, serialization, daily assignment, and ordered persistence |
| `tests/data-store.test.js` | Data validation, daily assignment, and storage regression tests |

Reusable components and supporting code stay outside the Expo Router route directory.

## Shared state and persistence

The provider is the common parent for all screens. Details and Editor receive an ID and look up the current challenge, so an edit or completion change appears consistently across the app.

AsyncStorage stores a versioned object under `FLAMINARY_STORE_V1`. It contains challenges and date-to-challenge assignments. Mock data is seeded only when the key is missing. A deliberately saved empty collection remains empty after restart. Invalid saved data produces a visible retry screen and is not replaced with mock data.

Storage operations run in order. Each change starts from the most recently saved state, waits for persistence to succeed, and then updates the UI. This extends the course's storage example to avoid writing initial defaults before hydration or losing a change to overlapping writes. Failed saves leave the visible collection unchanged and show a retryable error.

## Daily selection and progress

The app uses the device's local calendar date. A saved daily assignment remains stable when another challenge is added or edited. A new day chooses another available challenge; the immediately previous assignment is excluded when alternatives exist. Deleting the assigned challenge selects a replacement. If no challenges remain, Today offers creation instead of trying to display a missing item.

Completion is self-reported and can be undone. Progress totals are derived from the current collection. Suggested practice time is the sum of completed challenges' planned durations, not a stopwatch measurement. Deleting a challenge also removes its completion record.

## Forms and session

The editor validates title (3–70 characters), description (20–600), restrictions (10–300), at least one allowed kit piece, a whole-number tempo from 40–240 BPM, and a whole-number practice duration from 5–45 minutes. Type, difficulty, and time signature must be supported options.

The demo email/password are checked against predefined credentials after Zod validation. Signed-in state lives only in memory. A cold restart or browser reload requires login again; saved practice data remains. Protected routes prevent Back or direct navigation from reopening the signed-in app after logout. This is a mock login for the assignment, not production authentication.

## Official documentation

- [Expo SDK 57 reference](https://docs.expo.dev/versions/v57.0.0/)
- [Expo Router navigation](https://docs.expo.dev/router/basics/navigation/)
- [Protected routes](https://docs.expo.dev/router/advanced/protected/)
- [AsyncStorage](https://docs.expo.dev/versions/v57.0.0/sdk/async-storage/)
- [AsyncStorage usage](https://react-native-async-storage.github.io/2.0/Usage/)
- [Zod basics](https://zod.dev/basics)

The [source credits](SOURCE_CREDITS.md) distinguish supplied course material, adaptations, and newly authored code.
