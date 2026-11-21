# Submission checklist

Use this checklist for the final individual submission. Implementation, command checks, native testing, screenshots, video, instructor access, and course approval are separate items; do not claim one establishes the others.

## Functional review

- Welcome opens Login; invalid formats and incorrect mock credentials show understandable errors.
- Correct credentials open the main app. Logout removes signed-in access, including direct routes and Back navigation.
- Today shows the assigned challenge. Explore combines text/category/status filters correctly.
- Details resolve a challenge by its current ID and reflect edits/completion consistently.
- New and edited challenges pass Zod validation. Cancel does not save.
- Delete requires confirmation; cancellation preserves the challenge.
- Completion and undo update Progress and the derived counts/minutes.
- Missing/deleted IDs, empty collection, and no search results offer useful recovery actions.
- Added, edited, deleted, and completed data survive restart. Delete every challenge, restart, and confirm the collection stays empty.
- Real loading and unsuccessful storage operations have visible feedback.
- Check all links/buttons, keyboard behaviour, long text, scrolling, and tap targets on the actual submission platform.

## Repository and archive

- Obtain the required proposal approval and confirm the instructor's AI-use policy. Approval is not recorded by this repository.
- Preserve licenses, source credits, and the honest AI-use statement.
- Keep meaningful commits for actual implementation steps and verify their signatures on GitHub.
- Grant the instructor access to the private repository before sharing its link.
- Record the final version as tag v1.0.0 and include the full commit SHA in the adjacent release record.
- Export the ZIP from that exact tagged commit. Include source, required assets, Expo configuration, package.json, and package-lock.json.
- Exclude node_modules, .expo, generated builds, .git, and local machine files.
- Compare ZIP paths/content with the committed tree. Check installation/startup after extracting into a fresh directory.

## README and testing evidence

- Keep `npm ci` and `npx expo start` instructions and the mock login credentials accurate.
- List implemented features and material limitations.
- Identify the real browser/native test platform and whether Expo Go or a development build was used.
- Report web testing separately from Android/iOS testing. Do not claim native testing based only on a web export.
- Include the screen-flow diagram and actual main-screen screenshots.

## Narrated demonstration

Record approximately five minutes of the actual app and export MP4. Use narration that explains what the viewer sees; disclose AI-created narration if used.

| Time | Demonstrate |
| --- | --- |
| 0:00–0:35 | App name, audience, practice problem, and welcome screen |
| 0:35–1:05 | Invalid login feedback, then correct mock login |
| 1:05–1:50 | Daily prompt, archive search/filters, and current details |
| 1:50–3:05 | Invalid editor input, create, edit, delete cancel, and confirmed deletion |
| 3:05–4:10 | Complete/undo, Progress, and persistence after restart |
| 4:10–4:40 | Empty/no-results feedback and logout/protected navigation |
| 4:40–5:00 | Course credits, AI-use statement, actual test platform, and limitations |

Capture Welcome/Login, Today, Explore, Details, Editor, and Progress. Verify the video and screenshots depict the final tagged version rather than the earlier course baseline.
