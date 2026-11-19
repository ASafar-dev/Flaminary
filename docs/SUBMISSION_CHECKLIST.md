# Final submission checklist

This baseline is not ready for submission. The student must complete the drummer app and replace preparation-only status statements with accurate final information.

## Functional checks on the chosen test platform

- Welcome opens Login; invalid email, invalid password format, and incorrect credentials show understandable errors.
- Valid credentials open the main screens. Logout returns to Login, and Back cannot reopen signed-in content.
- Explore shows realistic drum challenges. A selected challenge opens correct, current details.
- A valid new challenge appears across the app; invalid input cannot be saved.
- Editing updates the same challenge everywhere. Cancel discards unsaved form changes.
- Delete requires confirmation. Cancel preserves the item; confirming removes it consistently.
- Search and filters work together and provide a clear no-results state.
- Marking and unmarking completion updates details, progress, and counts consistently.
- Today's challenge stays stable within a day. Deleted or missing challenges and an empty collection are handled safely.
- Added, edited, deleted, and completed data survive a restart. Delete every challenge, restart, and confirm the collection remains empty.
- Initial loading, invalid stored data, and unsuccessful storage operations produce useful visible feedback.
- All buttons, links, and Back actions work. Check keyboard behaviour, long text, readability, and tap targets on the device.

## Repository and ZIP

- Obtain and retain instructor proposal approval.
- Preserve source credits, licenses, and an accurate AI-use statement.
- Commit each actual feature and fix as it is implemented. Verify the resulting commit signatures on GitHub.
- Grant the instructor access to the private repository, or deliberately choose the required sharing setting.
- Document setup using `npm ci` and `npx expo start`, demo credentials, implemented features, known limitations, and the actual tested platform and Expo Go/development-build version.
- Record the final submission commit in the README using an unambiguous release tag, and include its full SHA in a matching release record.
- Export the project ZIP from that exact commit. Include package.json, the original/current package lock, Expo configuration, assets, and source. Exclude node_modules, .expo, generated builds, and .git.
- Compare the ZIP contents against the committed source and check extraction and startup from a fresh folder.

## Screenshots and narrated MP4

Capture the completed Welcome/Login, Today, Explore, Details, Editor, and Progress screens. Capture useful validation and empty-state examples. Current MyTasks screenshots would show only the baseline and must not be labelled as the completed drummer app.

Suggested five-minute recording:

| Time | Show and explain |
| --- | --- |
| 0:00–0:35 | App name, intended audience, creative-practice problem, and welcome screen |
| 0:35–1:05 | Invalid login feedback, then valid mock login |
| 1:05–1:50 | Daily prompt, collection search/filter, and selected details |
| 1:50–3:05 | Invalid editor input, create, edit, delete cancel, and confirmed deletion |
| 3:05–4:10 | Complete a challenge, show progress, restart, and demonstrate persistence |
| 4:10–4:40 | Empty/no-results behaviour and logout/back navigation |
| 4:40–5:00 | Source credits, AI-use disclosure, test platform, and known limitations |

Record the actual completed app with the student's own narration and export MP4. No demonstration video or final app screenshots were fabricated for this baseline.
