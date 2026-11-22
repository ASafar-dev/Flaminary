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

