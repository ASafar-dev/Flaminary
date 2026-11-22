# Submission checklist

## App review

- Sign in with valid mock credentials and check errors for invalid input.
- Check logout, direct protected URLs, and Back navigation.
- Open the daily challenge and search/filter Challenges.
- Add and edit an exercise; check field errors and Cancel.
- Test delete cancellation and confirmed deletion.
- Mark complete/unfinished and check My progress counts.
- Restart and confirm saved data remains.
- Delete every exercise, restart, and confirm the list stays empty.
- Check loading, retry, save failure, no matches, and missing item feedback.
- Review scrolling, text, keyboard behaviour, and controls on the submission device.

## iPhone setup and testing

- Update Expo Go from the App Store for SDK 58.
- Use the same Wi-Fi for the computer and iPhone.
- Sign in to Expo CLI and Expo Go with the same Expo account.
- Run `npm ci` and `npx expo start --clear --go`.
- Scan the current terminal QR code with iPhone Camera. Remove an old Recent project entry if it opens the previous version.
- Record physical device test results separately from web tests and JavaScript exports.

## Submission files

- Obtain proposal approval and confirm the instructor's AI-use policy. Approval is not recorded here.
- Keep licenses, credits, and the honest AI-use statement.
- Grant the instructor access to the private repository.
- Verify signatures on new commits.
- Export the source ZIP from tag v1.1.0 and record the full SHA and checksum in the adjacent release record.
- Include code, required assets, Expo configuration, package.json, and package-lock.json.
- Exclude node_modules, .expo, generated builds, .git, and local machine files.
- Compare the ZIP with the committed tree and test a fresh extraction.
- Include the screen flow and screenshots of the updated app.
- Record an approximately five-minute narrated MP4 from the final version. Identify synthetic narration and the tested platform.

## Recording outline

Welcome and purpose; invalid/valid Sign in; Today and details; Challenges search/filters; Add form validation; Edit, completion, and My progress; reload and delete confirmation; logout, source references, AI disclosure, and testing limits.
