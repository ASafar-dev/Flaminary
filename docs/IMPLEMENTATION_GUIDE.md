# Flaminary human implementation guide

The student must write the custom implementation. This guide contains decisions, source locations, and acceptance checks rather than application code. Keep the current baseline intact until the instructor approves the proposal.

## Course examples to consult

| Source supplied by the student | Useful material | Limitation |
| --- | --- | --- |
| My Tasks - Local Storage - GET and POST - Image Picker.zip | Current baseline: routing, credential comparison, Zod login, local storage, reusable task components, images | No edit, completion control, logout, or confirmed delete; storage race and stale details |
| MyTasks - components - navigation - validation.zip | Simpler routing, reusable components, Zod login, list and details | In-memory state; no persistence |
| MyTasks - Completed.zip | Completion toggle in `src/app/index.jsx`, alongside adding, deleting, and filtering | Single-screen example; no login or local persistence |
| Sessions 1 2 3.zip | Introductory component and form examples | Earlier teaching material with less complete functionality |

All four original archives remain in the student's Downloads folder. The current repository imports only the local-storage project. Copying an unchanged function into a new application still requires the student to write and understand its integration.

## Current source map

| File | What to study |
| --- | --- |
| `src/app/_layout.jsx` | Expo Router stack and screen headers |
| `src/app/index.jsx` | Welcome UI and the automatic redirect that currently bypasses login |
| `src/app/login.jsx` | Zod login schema, readable errors, and predefined credential comparison |
| `src/app/tasks.jsx` | Initial data, list state, adding/deleting/filtering, storage effects, and navigation |
| `src/app/details.jsx` | Route parameters and the current details view |
| `src/components/AppButton.jsx` | Shared button accepting text and callback props |
| `src/components/TaskItem.jsx` | Item display and callbacks; deletion is currently immediate |
| `src/components/TaskFilters.jsx` | Parent-owned selection passed through props |

## Challenge data and shared state

Each challenge needs a stable ID, title, description, groove/fill category, difficulty, allowed kit pieces, restrictions, tempo, creation date, and completion information. Choose consistent names and one representation for tempo and dates. Custom challenges and supplied mock challenges must follow the same structure.

Keep the challenge collection and its update operations in one suitable parent/provider outside the route directory. Screens should read the same collection. Pass an item ID to Details and Editor and look up the current item, so edits and completion changes are reflected everywhere. Handle an ID that no longer exists.

Choose one local-calendar-date convention for the daily prompt. Keep the selected challenge stable throughout that day, and handle deletion or an empty collection. Completion totals and the Progress list should be derived from stored completion data rather than maintained as unrelated counters.

## Forms and navigation

Use Zod for both login and the challenge editor. Validate trimmed title and description, supported category/difficulty choices, at least one allowed kit piece, meaningful restrictions, and a sensible positive tempo range. Choose and document the actual limits. Keep invalid input in the form, show field-level messages, and prevent saving until valid.

The login must check the actual mock email and password after schema validation. Keep a signed-in state and handle direct navigation to protected screens. Logout clears that state and replaces the signed-in navigation history. Do not persist the demo password.

Use one editor screen for create and edit. Save changes under the same ID when editing. Cancel must not save. Delete must show a confirmation; cancel keeps the item. Make every visible action functional and show useful success feedback.

## Storage corrections to write

The current loading effect and saving effect both start when Tasks mounts. Initial data can be written before loading finishes. Gate persistence until hydration has completed, and avoid concurrent writes that can commit stale data.

Distinguish a missing storage entry from a saved empty collection. Seed mock data only for a genuinely new store; a saved empty list must remain empty after restart. Validate parsed storage data before using it. Provide visible load/save failure feedback and a retry path; a failed read must not silently overwrite stored data with seeds. Report successful persistence accurately.

Show a loading indicator during the actual initial read or another waiting operation. Do not add artificial delays. Give separate messages for a genuinely empty collection and a search/filter with no matches.

## Development checkpoints

1. Obtain proposal approval; settle the seven-screen flow and challenge fields.
2. Write the welcome/login/logout flow and shared state; check direct routes and Back.
3. Write collection, details, and create/edit/delete forms with Zod and confirmation.
4. Write safe hydration and persistence; test restart with both populated and empty data.
5. Write daily selection, archive filters/search, and completion progress.
6. Verify loading, invalid forms, missing items, no results, and storage failure feedback on a real test platform.
7. Capture screenshots, narrate the demo, update the README, and package the final commit.

Make meaningful commits when each real feature or fix is finished. Do not backdate commits, relabel course history as personal work, or claim the preparation commits demonstrate earlier development.

## Official references

- [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/)
- [Expo Router file notation](https://docs.expo.dev/router/basics/notation/)
- [Expo Router authentication](https://docs.expo.dev/router/advanced/authentication/) — its example is a pattern, not this assignment's complete credential implementation.
- [Expo AsyncStorage documentation](https://docs.expo.dev/versions/v57.0.0/sdk/async-storage/)
- [AsyncStorage usage](https://react-native-async-storage.github.io/2.0/Usage/)
- [Zod basics](https://zod.dev/basics)
