# Flaminary verification results

Final-build verification record, prepared November 21, 2026. Checks ran on Windows with Node.js 24.20.0 and npm 11.19.0. Browser checks used Chromium 159.0.8154.6 at a 390 × 844 mobile viewport.

## Final build checks

| Check | Status | Scope |
| --- | --- | --- |
| Data and storage regression tests | Passed: 11 tests | `npm test` |
| Expo lint | Passed | `npm run lint` |
| JavaScript parsing/module check | Passed | `npm run typecheck`; allowJs enabled, checkJs disabled |
| Web production export | Passed | `npx expo export --platform web --max-workers 2` |
| Android production bundle | Passed | Hermes bundle generated; this is not native device execution |
| Locked dependency consistency | Passed | `npm ci --dry-run --ignore-scripts --no-audit --no-fund --offline` |
| Browser interaction checks | Passed: 10 workflows, no page errors | Actual UI actions and storage fault injection; [machine-readable results](ui-results.json) |
| Source ZIP/repository comparison | Recorded with the release | Archive exported from v1.0.0; full SHA, checksum, and comparison in the accompanying release record |
| GitHub commit signatures | Checked through GitHub's verification field | Release history on main is signed and verified; exact SHA/status list accompanies the release |

## Runtime coverage

The browser workflows covered invalid login, incorrect credentials, successful login, combined filters/search, no results, invalid forms, failed creation, successful creation, editing and Back, completion and undo, progress totals, cold reload, unsaved cancellation, deletion cancellation, failed deletion, confirmed deletion, logout, direct protected URLs, browser Back, deleting all items, empty persistence, damaged storage, and retry recovery. The test script used real rendered controls. Deliberate storage failures were injected only into the isolated test browser.

Native Expo Go, Android/iOS devices or emulators, and development builds were not run. A successful bundle does not establish native runtime coverage. The JSX check is not full JavaScript type checking.

## Screenshots and narrated recording

The screenshots show the actual browser app at mobile width. Sample custom challenges were created through the editor during verification.

| Screen | Image |
| --- | --- |
| Welcome | [Welcome](screenshots/01-welcome.png) |
| Login | [Login](screenshots/02-login.png) |
| Today | [Daily challenge](screenshots/03-today.png) |
| Explore | [Archive](screenshots/04-explore.png) |
| Challenge details | [Details](screenshots/05-details.png) |
| Challenge editor | [Editor](screenshots/06-editor.png) |
| Progress | [Progress](screenshots/07-progress.png) |
| No search results | [No results](screenshots/08-no-results.png) |
| Confirm deletion | [Confirmation](screenshots/09-delete-confirmation.png) |
| Empty library | [Empty state](screenshots/10-empty-library.png) |

The accompanying `Flaminary-demo.mp4` is an approximately five-minute recording of real browser interactions, with Windows Hazel synthetic narration. Its [narration script](DEMO_SCRIPT.txt) is included. The recording demonstrates the web app and identifies AI assistance and native testing limits. It is delivered separately from the source ZIP and is available with the [v1.0.0 release](https://github.com/ASafar-dev/Flaminary/releases/tag/v1.0.0).

## Important behaviours to verify

- Welcome leads to Login. Invalid fields and incorrect credentials show errors; correct credentials open the app.
- Direct navigation and Back do not reopen protected screens after logout.
- Creating and editing change the shared collection and current details consistently.
- Delete cancellation preserves the item; confirmed deletion removes it.
- Completion/undo update details, Progress, and totals.
- Search/category/status filters combine correctly and have clear no-results feedback.
- The collection remains populated after restart; a deliberately emptied collection remains empty.
- Failed/corrupt storage reads do not overwrite saved data. Failed writes leave the visible collection unchanged and show an error.
- Daily selection stays stable during the day and handles deletion, an empty collection, and the next local date.
- Mobile-width layout has readable fields, usable touch targets, working scrolling, and no clipped content.

The data tests exercise schema validation, missing versus empty stores, daily selection, corrupted input, ordered writes, and failed operations. UI behaviour needs runtime checks in addition to those tests.
