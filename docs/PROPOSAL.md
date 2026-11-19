# Flaminary project proposal

**Draft for instructor approval.** This proposal describes the intended app; the current source baseline is the unchanged MyTasks course example.

## Name and purpose

**Flaminary** gives drummers one focused creative challenge each day. Its name combines the rudiment “flam” with “imaginary.” Instead of repeating familiar patterns, players explore new grooves and fills within a small set of musical restrictions.

## Intended users and problem

The app is for beginner and intermediate drum-kit players who know basic grooves but struggle to choose what to practise or fall back on the same fills. Short, specific prompts make practice easier to start and encourage experimentation without requiring recording equipment or an internet connection.

## Main features

- A daily challenge describing a groove or fill, allowed kit pieces, tempo, difficulty, and practice goal.
- A searchable, filterable collection of previous and custom challenges.
- Challenge details with clear restrictions and a completion action.
- Creation, editing, and confirmed deletion of challenges.
- A progress view showing completed challenges and totals.
- Mock login with Zod validation, logout, and local persistence through AsyncStorage.

## Planned screens and navigation

Seven screens: Welcome, Login, Today, Explore, Progress, Challenge Details, and Challenge Editor. The editor handles both adding and editing. Today, Explore, and Progress form the main navigation. Details open from all three. Back returns to the previous view. Logout returns to Login and prevents Back from reopening the signed-in screens.

The [screen-flow diagram](SCREEN_FLOW.txt) shows this navigation.

## Scope

Use realistic local mock challenges and AsyncStorage. Completion is self-reported; the app does not analyse audio or judge performance. A backend, real authentication, social sharing, audio recording, and a metronome are outside this submission's scope.

## Proposed example challenges

| Title | Type | Musical restriction | Tempo | Level |
| --- | --- | --- | --- | --- |
| Two Toms, One Idea | Fill | Use only rack tom, floor tom, and kick for one bar in 4/4 | 80 BPM | Beginner |
| The Silent Four | Groove | Leave beat four completely silent in a two-bar groove | 90 BPM | Beginner |
| Ghost in the Pocket | Groove | Keep snare backbeats on two and four; add quiet snare notes between them | 85 BPM | Intermediate |
| Kick Starts the Story | Fill | Begin every beat with kick; use only kick and snare | 75 BPM | Beginner |
| No Crash Landing | Fill | Resolve into the next bar without a crash cymbal | 100 BPM | Intermediate |
| Three Across Four | Groove | Keep quarter notes on kick while repeating a three-note hand pattern over 4/4 | 70 BPM | Intermediate |
| One Voice at a Time | Fill | Play one kit piece at a time with no simultaneous hits | 90 BPM | Beginner |
| Less Is the Hook | Groove | Use no more than six hits in each bar of 4/4 | 80 BPM | Beginner |

These are draft content ideas, not installed application data.

## Submission

Submit an individually developed Expo project, accessible GitHub repository, matching project ZIP, README with honest AI-use statement and platform testing details, screen flow, screenshots, and an approximately five-minute narrated MP4. The supplied brief gives a final deadline of **Tuesday, November 24, 2026, at 11:59 PM**; confirm the submission timezone with the course.
