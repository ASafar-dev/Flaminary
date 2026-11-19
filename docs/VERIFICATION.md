# Baseline verification results

Checked on November 19, 2026, on Windows with Node.js 24.20.0 and npm 11.19.0. These results concern the unchanged MyTasks course baseline, not the proposed drummer app.

| Check | Result | Meaning |
| --- | --- | --- |
| Source checksum comparison | Passed: all 49 imported files match the recorded SHA-256 values | No imported application source, assets, configuration, or lockfile was edited |
| `npm ci --ignore-scripts --no-audit --no-fund` | Passed; 626 packages installed | Locked dependencies installed; lifecycle scripts were deliberately not run |
| `npx expo export --platform web` | Passed | Metro compiled the web application and static routes into the ignored dist directory |
| `npx tsc --noEmit` | Failed with TS18003, no inputs | Supplied tsconfig includes TypeScript files, while the course screens are JSX; the generated Expo declaration omitted from the import was the only matching source entry |
| `npx expo lint` | Not completed: ESLint configuration is absent | Declined the tool's offer to install/configure ESLint because that would change the supplied package configuration and lockfile |
| Expo Go / development build / native runtime | Not tested | No Android or iOS runtime validation is claimed |
| Completed drummer workflows | Not implemented | The acceptance checks in the submission checklist remain for the student's implementation |

The web export includes the course's six routes: welcome, login, tasks, about, details, and HTTP demonstration, plus framework routes. A successful export does not prove interactive behaviour, persistence correctness, native image-picker permissions, or grading compliance.

Preserved issues found during source inspection include the welcome redirect bypassing login, concurrent initial load/save storage effects, stale detail parameters, immediate deletion, and missing editing/completion/logout controls. Loading and saving failures are logged rather than displayed to the user. No source changes were made to correct them.

Recheck source preservation and the repository/archive match when packaging. The release record accompanying the ZIP identifies the actual commit and archive checksum. Native testing, final screenshots, and a narrated MP4 remain outstanding.
