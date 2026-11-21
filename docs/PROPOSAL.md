# Flaminary project proposal

Prepared for the individual mobile application project. This repository records the proposal and implementation; it does not record instructor approval.

## Name and purpose

**Flaminary** gives drummers one focused creative challenge each day. The name combines the drum rudiment “flam” with “imaginary.” Players create new grooves and fills while working within a small set of musical restrictions.

## Intended users and problem

The app is for beginner and intermediate drum-kit players who know basic patterns but struggle to choose what to practise or keep returning to the same fills. Short, specific prompts make a practice session easier to start and encourage experimentation without recording equipment or an internet connection.

## Main features

- A daily groove or fill challenge with allowed kit pieces, a creative restriction, tempo, time signature, difficulty, and suggested duration.
- A searchable archive with category and practice-status filters.
- Challenge details and self-reported completion tracking.
- Creating, editing, and deleting challenges with validation and confirmation.
- A progress collection with completed challenges and derived totals.
- Mock login, logout, and local persistence through AsyncStorage.

## Screens and flow

Seven screens: Welcome, Login, Today, Explore, Progress, Challenge Details, and Challenge Editor. Today, Explore, and Progress are the main tabs. Details open from all three; Editor handles both adding and editing. Back returns to the originating view. Logout removes access to signed-in routes.

See the [screen-flow diagram](SCREEN_FLOW.txt).

## Scope

Use realistic local mock challenges and AsyncStorage. Completion is self-reported; the app does not analyse audio or judge performance. A backend, real authentication, cloud sync, social sharing, audio recording, and a metronome are outside this version's scope.

## Example challenges

| Challenge | Type | Creative restriction |
| --- | --- | --- |
| Two Toms, One Idea | Fill | Use only rack tom, floor tom, and kick |
| The Silent Four | Groove | Leave beat four silent in a two-bar groove |
| Ghost in the Pocket | Groove | Keep the backbeat while adding quiet notes between it |
| No Crash Landing | Fill | Resolve into the next bar without a crash cymbal |

The actual local challenge data is maintained in `src/data/challenges.js`.

## Delivery

The supplied brief requires an individual Expo project, accessible GitHub repository, matching project ZIP, README with an honest AI-use statement and testing platform, screen flow, screenshots, and an approximately five-minute narrated MP4. It gives a deadline of **Tuesday, November 24, 2026, at 11:59 PM**; confirm the submission timezone with the course.
