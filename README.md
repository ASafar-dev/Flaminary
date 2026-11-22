# Flaminary

Flaminary gives drummers a daily fill or groove exercise. Each challenge lists its restrictions, kit pieces, tempo, time signature, and suggested practice time.

Version 1.1.0 uses Expo SDK 58 and a simpler light interface. The code follows the JavaScript, components, and state patterns in the supplied MyTasks ZIPs. See the [code guide](docs/CODE_GUIDE.md).

## Start the project

Install Node.js 24 LTS and npm. Open a terminal in this folder:

```sh
npm ci
npx expo start --clear --go
```

For an iPhone:

1. Update [Expo Go from the App Store](https://apps.apple.com/app/expo-go/id982107779). The current Expo Go release supports SDK 58; the older SDK 57 project requires its older compatible client.
2. Connect the computer and iPhone to the same Wi-Fi network.
3. Sign in to Expo CLI with `npx expo login`, then sign in to Expo Go with the same Expo account. This is separate from the app's mock login.
4. Start the command above. Scan its new QR code with the iPhone Camera app, then open the Expo Go link.
5. If an old project opens, remove its old Recent entry from Expo Go and scan the new terminal QR code again. Restarting with `--clear` clears the bundler cache.

Press `w` in the terminal for the web version. See [Expo's start instructions](https://docs.expo.dev/get-started/start-developing/) for network and account setup.

## Mock login

- Email: `student@example.com`
- Password: `password2026`

The Sign in screen includes a **Use demo account** button. Zod validates the fields, then the app compares them with the predefined credentials. Session state stays in memory. A restart or browser reload requires signing in again; saved challenges remain.

## Features

- Seven screens: Welcome, Sign in, Today, Challenges, My progress, Challenge details, and Add/Edit challenge.
- Twelve starter exercises and a saved daily assignment based on the device's local date.
- Search by challenge text or kit pieces, combined with type and status filters.
- Add and edit exercises with field validation.
- Delete confirmation with a Cancel action.
- Mark complete or unfinished; view completed exercises and counts.
- AsyncStorage saves challenges, completion dates, and daily assignments. An emptied list stays empty after restart.
- Loading, retry, success, validation, and storage-failure feedback.

The [screen flow](docs/SCREEN_FLOW.txt) lists the routes. The [proposal](docs/PROPOSAL.md) records the purpose and scope. Instructor approval is not recorded here.

## Checks

```sh
npm test
npm run lint
npm run typecheck
npx expo-doctor
npx expo export --platform web
npx expo export --platform ios
npx expo export --platform android
```

Fifteen data/storage tests, lint, the JavaScript check, all 20 Expo doctor checks, and 10 browser workflows passed. Web, iOS, and Android bundles passed too. The Expo Go iOS manifest reports SDK 58.0.0 and app version 1.1.0. See [VERIFICATION.md](docs/VERIFICATION.md). I have not run this version on a physical iPhone.

The project uses `allowJs` with `checkJs` disabled. The TypeScript command checks parsing and module resolution, not full JavaScript type safety.

## Limits

Login is a mock account. Data stays in the current installation or browser; clearing app storage or uninstalling removes it. There is no backend, sync, recording, metronome, or audio grading. Completion is self-reported. Practice minutes are suggested durations, not measured time. Deleting a challenge removes its completion record. A list with one challenge repeats it on later days.

## Sources and AI-use statement

Four course ZIPs supplied by the student were used as references. Their patterns include `useState`, `useEffect`, callback props, array operations, Expo Router, Zod, and AsyncStorage. The original MIT notice remains in [LICENSE](LICENSE). See [source credits](docs/SOURCE_CREDITS.md).

**AI-use statement:** I am the AI assistant used for this project. I reviewed the supplied examples, adapted and wrote application code in a similar JavaScript/JSX style, updated the interface and logo, wrote tests and documentation, ran checks, and prepared release files and synthetic narration. The code is AI-assisted. The student should review and understand it and disclose this assistance under the instructor's policy. I have not tested the app on the student's iPhone.

## Release

[GitHub repository](https://github.com/ASafar-dev/Flaminary). The repository is private; grant the instructor access before submission.

The version 1.1.0 source ZIP is exported from tag **v1.1.0**. Its adjacent release record supplies the full commit SHA, ZIP checksum, and file comparison. Dependencies, .expo, generated builds, and .git are excluded. The v1.0.0 release remains a record of the earlier version. The `source-baseline-v1` tag and its manifest record the original source import, not the current file checksums.

Use the [submission checklist](docs/SUBMISSION_CHECKLIST.md) before delivery. Verified commits establish signature verification, not independent student authorship.
