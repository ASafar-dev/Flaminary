# Version 1.1.0 verification

Prepared November 22, 2026. Development and command checks use Windows. The previous v1.0.0 report and release remain in Git history.

## Checks for this update

| Check | Status | Scope |
| --- | --- | --- |
| Data/storage tests | Passed: 15 tests | `npm test` |
| Lint | Passed | `npm run lint` |
| JavaScript parsing/modules | Passed | `npm run typecheck`; allowJs true, checkJs false |
| Expo doctor | Passed: 20 of 20 | Dependency/configuration checks |
| Expo dependency alignment | Passed | `npx expo install --check` |
| Web production export | Passed | Web JavaScript bundle |
| iOS production export | Passed | Native JavaScript bundle, not device execution |
| Android production export | Passed | Native JavaScript bundle, not device execution |
| Expo Go iOS manifest | Passed | SDK 58.0.0, runtime exposdk:58.0.0, app 1.1.0 |
| Browser workflows | Passed: 10 workflows, zero page errors | [Results](ui-results.json), Chromium 159.0.8154.6 at 390 by 844 |
| Archive/commit comparison | Recorded with the release | Tag v1.1.0, exact SHA and checksums in the adjacent release record |
| GitHub signatures | Recorded with the release | Verification fields for the release history |

The tests cover form/stored-data validation, missing versus empty storage, daily assignment, failed saves, overlapping saves, and preservation of saved edits during built-in text updates. The busy flag allows one save at a time; there is no queued controller.

## Device coverage

The project targets SDK 58 for the current Expo Go release. This update has not been verified on the student's physical iPhone. Expo doctor and iOS/Android JavaScript exports do not establish device runtime coverage. Record the device, operating system, Expo Go version, and tested actions after a physical test.

The JavaScript parsing check is not full static type checking.

## Screenshots and recording

I captured the light interface during the browser checks. The main screens are [Welcome](screenshots/01-welcome.png), [Sign in](screenshots/02-login.png), [Today](screenshots/03-today.png), [Challenges](screenshots/04-explore.png), [Details](screenshots/05-details.png), [Editor](screenshots/06-editor.png), and [Progress](screenshots/07-progress.png). I also captured [no results](screenshots/08-no-results.png), [deletion confirmation](screenshots/09-delete-confirmation.png), and [an empty list](screenshots/10-empty-library.png).

The separate file `Flaminary-v1.1.0-demo.mp4` records the updated interface for about five minutes. Its [script](DEMO_SCRIPT.txt) follows the recorded actions.

The narration uses Windows Hazel synthetic speech and identifies the web platform and AI assistance. The source ZIP and MP4 are separate release files. The final release is [v1.1.0](https://github.com/ASafar-dev/Flaminary/releases/tag/v1.1.0).
