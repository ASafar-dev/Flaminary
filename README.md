# Flaminary

Flaminary is a proposed daily creativity challenge app for drummers. The name combines a **flam**, a drum rudiment, with **imaginary**: small restrictions that inspire new grooves and fills.

**Current status: unchanged course-source baseline, not a completed drummer app or final submission.** The runnable application still displays MyTasks. Its source, assets, package configuration, and lockfile were copied unchanged from the course ZIP supplied by the student. Custom application logic is reserved for the student to write.

## Setup

Install Node.js LTS and npm. Open this folder in a terminal, run `npm ci`, then run `npx expo start`. The supplied project uses Expo SDK 57 and Expo Router. Use an Expo Go release compatible with that SDK, or a compatible development build.

The original setup instructions are preserved in [the course README](docs/COURSE_README.md). Do not run the reset-project script if you want to retain the course screens.

## Mock login

- Email: `student@example.com`
- Password: `password2026`

These are public demo credentials, not a real account. The unchanged welcome screen automatically opens tasks; the login screen exists at `/login`, but a complete authentication flow is still required.

## Existing course features

The baseline contains welcome, login, tasks, details, about, and HTTP demonstration screens; reusable components outside the route directory; Zod login validation and credential comparison; task creation and deletion; status filters and counts; AsyncStorage task loading and saving; and image-picker examples.

## Work remaining

The drummer challenge content, daily selection, shared challenge state, editing, completion controls, logout, delete confirmation, challenge-form Zod validation, collection empty/no-results states, storage failure feedback, and hydration loading feedback are not implemented. Existing storage effects can save initial data before stored data finishes loading. Details receive copied fields in route parameters and can become stale. The HTTP demo is a course example and is not the planned app's backend.

Start with the [proposal](docs/PROPOSAL.md), [screen flow](docs/SCREEN_FLOW.txt), and [human implementation guide](docs/IMPLEMENTATION_GUIDE.md). Obtain the required instructor proposal approval before implementing the drummer app; no approval is recorded here.

## Verification and platform

Dependency installation and command-line checks were performed on Windows. Expo Go, Android, iOS, and a native development build have **not** been tested. See [verification results](docs/VERIFICATION.md) for exact checks and limitations. Source checksums are recorded in [the provenance manifest](provenance/course-source-manifest.json).

## Sources and AI use

Source: the student-supplied **My Tasks - Local Storage - GET and POST - Image Picker.zip**, internal folder `MyTasks/`. Its MIT notice is preserved in [LICENSE](LICENSE). [Source credits](docs/SOURCE_CREDITS.md) distinguish the supplied course code from documentation and other references.

AI assistance was used to inspect supplied archives, select and copy unchanged course files, draft the proposal and documentation, run setup and verification commands, and prepare repository and archive materials. No application source code was authored or edited by AI during this preparation. This statement does not establish how the supplied course code was originally authored. The student must update this statement to reflect their subsequent work and course policy.

## Version and submission

This preparation snapshot is identified by the Git tag **source-baseline-v1**. The accompanying source ZIP is exported from that tagged commit and excludes node_modules, .expo, build output, and .git. The adjacent release record contains its full commit SHA and ZIP checksum.

This tag identifies a source baseline, not the final assignment version. After completing and testing the app, record the actual final submission commit and create a matching ZIP. Follow the [submission checklist](docs/SUBMISSION_CHECKLIST.md). The repository is private; the instructor needs access before submission.

The new commits record the actual source import and documentation work. They do not represent earlier feature development or prove source authorship. A GitHub Verified badge verifies a commit signature.
