# Source credits

Updated November 23, 2026, for version 1.1.1.

## Supplied course ZIPs

| Archive | Reference material |
| --- | --- |
| My Tasks - Local Storage - GET and POST - Image Picker.zip | Original import, reusable controls, Router, mock login, Zod, JSON storage, list operations |
| MyTasks - components - navigation - validation.zip | Components, props, navigation, and validation |
| MyTasks - Completed.zip | Adding, filtering, deleting, and completion using React state |
| Sessions 1 2 3.zip | Introductory JSX, components, and forms |

The original local-storage archive came from its `MyTasks/` folder. Its SHA-256 is `cf82cf8c27bed22d7da403954bceba1262f38ab2310db482fffd31ada3cece46`.

The [source manifest](../provenance/course-source-manifest.json) and historical `source-baseline-v1` tag record the imported files. Current adapted files are expected to differ. [COURSE_README.md](COURSE_README.md) preserves the original generic README as a source record.

The original MIT notice naming 650 Industries/Expo remains in [LICENSE](../LICENSE). Classroom additions are credited to the supplied course archives. Their original authorship and AI-use history were not independently established. Course Git history is not presented as the student's own development history.

## Adaptations

The app retains the course's JavaScript/JSX, state hooks, callback props, array operations, reusable components, Expo Router, Zod, and AsyncStorage patterns. A small shared Context supplies state across screens. The [code guide](CODE_GUIDE.md) lists the files and patterns.

AI-assisted additions include challenge data, daily assignments, editing, completion tracking, protected navigation, validated storage, save-error handling, tests, and release materials. Version 1.1.1 uses a plain light layout with blue and cool grey colors and a single-save busy flag. It is adapted code, not an unchanged copy of code from another author.

The logo and app icon use simple shapes drawn for Flaminary. Retained Expo/course assets keep their original notices. Installed icons come from [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons).

Main dependency sources are [Expo](https://github.com/expo/expo), [React Native](https://github.com/facebook/react-native), [AsyncStorage](https://github.com/react-native-async-storage/async-storage), and [Zod](https://github.com/colinhacks/zod). Check each installed package's license notice for its terms.

## AI-use statement

I am the AI assistant used for this project. I inspected the ZIPs, adapted and wrote application code, revised the layout and logo, wrote tests and documentation, ran checks, and prepared release files and synthetic narration. The student supplied the requirements and course material. These tasks do not establish independent student authorship or instructor approval. The student should review the code and disclose the assistance under the course policy.
