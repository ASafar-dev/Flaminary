# Flaminary

Flaminary is a daily creativity challenge app for drummers. Its name combines **flam**, a drum rudiment, with **imaginary**: a small restriction can lead to a new groove or fill.

Built with React Native, Expo SDK 57, Expo Router, Zod, and AsyncStorage, following the JavaScript and component patterns in the supplied MyTasks course projects. [How the code follows the course](docs/CODE_GUIDE.md).

## Run the app

Install Node.js 24 LTS and npm. From this project folder:

```sh
npm ci
npx expo start
```

Open the project with an Expo Go release compatible with SDK 57, or a compatible development build. Press `w` to open the web version. The web build also runs with `npx expo start --web`.

## Mock login

- Email: `student@example.com`
- Password: `password2026`

These public credentials are checked after Zod validation. Login is a local mock session, not a real account. Logout returns to the entry flow and protects signed-in screens. A cold restart or browser reload requires login again; practice data remains on the device.

## Features

- Seven screens: Welcome, Login, Today, Explore, Progress, Challenge Details, and Challenge Editor.
- A daily challenge with a stable assignment for the device's local calendar date.
- Twelve realistic drum challenges covering fills, grooves, creative restrictions, kit pieces, difficulty, tempo, time signature, and practice duration.
- Combined archive search and category/status filters, with separate empty and no-results states.
- Create, edit, and delete any challenge. Deletion requires confirmation.
- Mark challenges complete or unfinished, view completed ideas, and see derived totals.
- Zod validation with field errors for login and challenge entry.
- AsyncStorage persistence of the collection, completion dates, and daily assignments, including a deliberately empty collection.
- Visible loading, load-retry, and save-failure feedback. Saved data is validated before use, and writes run in order.
- Reusable native components, dark styling, original geometric branding, and a kit illustration highlighting the allowed pieces.

The [screen-flow diagram](docs/SCREEN_FLOW.txt) describes the navigation. The [proposal](docs/PROPOSAL.md) records the app's purpose and scope; instructor approval is not recorded by this repository.

## Verification

Run the project checks:

```sh
node --test tests/data-store.test.js
npx expo lint
npx tsc --noEmit
npx expo export --platform web
```

See [verification results](docs/VERIFICATION.md) for completed checks, runtime coverage, screenshots, and media references. Development and command-line checks use Windows. Native Expo Go, Android/iOS, and development-build testing must be reported separately; a web build does not establish native runtime coverage.

Lint, the JSX check, 11 data/storage tests, 10 browser workflows, and web and Android production bundles passed. [Main-screen screenshots](docs/VERIFICATION.md#screenshots-and-narrated-recording) and a narrated MP4 accompany the release. The MP4 uses Windows Hazel synthetic narration and shows real browser interactions.

The JavaScript project uses TypeScript's `allowJs` configuration for parsing/module checks; `checkJs` is disabled, so the command is not a claim of full static type safety.

## Limitations

The app uses mock login and local storage only. There is no backend, account sync, recording, audio analysis, metronome, or automatic performance grading. Completion is self-reported. Suggested practice minutes are planned durations of completed challenges, not measured time. Deleting a challenge also removes its completion record. With only one challenge available, a new day may repeat it.

Practice data belongs to the current app installation/browser. Clearing its storage or uninstalling removes that data. Instructor access to the private GitHub repository must be granted before submission.

## Sources and AI-use statement

The student supplied four MyTasks course archives. Flaminary adapts their hook, component, callback, Router, Zod, and AsyncStorage patterns. The original course project's MIT notice is retained in [LICENSE](LICENSE), and the [source credits](docs/SOURCE_CREDITS.md) identify the supplied material and adaptations.

**AI-use statement:** At the student's request, an AI coding assistant inspected the course examples, adapted and authored application code in a similar JavaScript/JSX style, created UI and geometric artwork, drafted documentation, ran verification commands, and prepared Git and release materials. The completed code is AI-assisted, not an unchanged human-authored course submission. The student should review, understand, test, and disclose this assistance according to the instructor's policy. No instructor approval or exemption from that policy is implied.

## Submission version

The final release is identified by Git tag **v1.0.0**. The source ZIP must be exported from that tag, excluding node_modules, .expo, build output, and .git. The adjacent release record identifies the tag's full commit SHA and the ZIP checksum. This avoids embedding a commit's own hash inside the content it identifies.

[GitHub repository](https://github.com/ASafar-dev/Flaminary) · [Submission checklist](docs/SUBMISSION_CHECKLIST.md)

The earlier `source-baseline-v1` tag preserves the original import. Its checksum manifest describes that historical baseline; adapted files in the completed app are expected to differ. Commit history records the actual work dates and does not imply earlier student development. A Verified badge verifies a signature, not independent authorship.
