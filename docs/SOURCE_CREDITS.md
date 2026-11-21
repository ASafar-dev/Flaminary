# Source credits and adaptations

Updated November 21, 2026. Flaminary adapts the supplied course projects and includes newly authored AI-assisted application code. It is no longer an unchanged MyTasks copy.

## Course material supplied by the student

| Archive | Patterns used |
| --- | --- |
| My Tasks - Local Storage - GET and POST - Image Picker.zip | Original imported baseline; reusable components, Router, mock login, Zod, JSON storage, collection operations |
| MyTasks - components - navigation - validation.zip | Component/prop organization, navigation, and validation examples |
| MyTasks - Completed.zip | Adding, filtering, deleting, and toggling completion with React state and array helpers |
| Sessions 1 2 3.zip | Introductory JSX, components, and form examples |

The original local-storage archive was imported from its `MyTasks/` folder. Its SHA-256 is `cf82cf8c27bed22d7da403954bceba1262f38ab2310db482fffd31ada3cece46`.

The [baseline manifest](../provenance/course-source-manifest.json) records the original imported bytes and omitted entries. The historical tag `source-baseline-v1` preserves that import. Current application files were intentionally adapted and are not expected to match its checksums. The original generic course README is retained at [COURSE_README.md](COURSE_README.md) as a source record, not current setup guidance.

The course archive's MIT notice naming 650 Industries/Expo is preserved in the root [LICENSE](../LICENSE). Classroom additions are credited to the student-supplied course sources; the archive alone does not establish their original author or whether they were written with AI. No course Git history is relabelled as the student's own work.

## Adapted and newly authored application code

The implementation keeps plain JavaScript/JSX, `useState`, `useEffect`, array `map`/`filter`/`find`, callback props, reusable components, Expo Router, Zod, and AsyncStorage. The [code guide](CODE_GUIDE.md) maps these choices to the course examples.

New AI-assisted work includes the drum challenge model and mock content, seven-screen product flow, daily assignment rules, shared state, ordered safe storage, stronger validation, completion tracking, editing and confirmation, protected navigation, feedback states, responsive styling, and regression tests. This work should not be represented as unmodified code written by the course author.

The Flaminary mark uses original simple geometric shapes. The drum kit is drawn with native views and text; it does not depend on a downloaded photograph or a generated illustration. Any retained unused Expo/course starter assets remain subject to their original notices. Icons use the installed [React Native Vector Icons Ionicons package](https://github.com/oblador/react-native-vector-icons).

## Frameworks and dependencies

Consult the installed packages' own license notices for applicable terms. Main upstream projects:

- [Expo](https://github.com/expo/expo)
- [React Native](https://github.com/facebook/react-native)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- [Zod](https://github.com/colinhacks/zod)

No backend service or third-party challenge feed is used by this version.

## AI disclosure

An AI coding assistant authored and adapted application code at the student's request, using the supplied course patterns; it also helped with source review, design, tests, artwork, documentation, verification commands, and release preparation. The student remains responsible for understanding and reviewing the code and meeting the instructor's independent-work and AI-use rules. The repository records actual changes and signatures, not proof of independent student authorship.
