# Scene Memory Study

Static browser-based psychology experiment built with plain HTML, CSS, and JavaScript.

## Files
- `index.html` — page structure
- `styles.css` — layout and styling
- `script.js` — stimulus rendering, random assignment, scoring, and CSV export

## Run locally
Unzip the folder and open `index.html` in a modern browser. No server, framework, database, or build step is required.

## Procedure
1. Three illustrated slides show a blue car at an intersection with a STOP sign.
2. Random assignment to misleading (yield-sign wording) or accurate (stop-sign wording) question.
3. Choice between two versions of the scene: STOP sign or YIELD sign. Left/right position is randomized.
4. Independent random assignment to confirming feedback (“Correct!”) or neutral feedback (“Okay.”).
5. Confidence rating from 1 to 10.
6. Results screen and one-row CSV download.

## CSV variables
Session ID, timestamps, question condition/group, feedback condition/group, feedback shown, selected picture/sign, correct picture position, accuracy (1 = correct; 0 = incorrect), and confidence (1–10).

Data stay in the browser and are not transmitted. Download the CSV before closing the results page. Each new session is randomized.

## Important research note
The feedback condition is assigned independently of response accuracy, so “Correct!” may be shown after an incorrect choice. Participants should be debriefed after the study because the misleading question and feedback involve deception. Obtain instructor/ethics approval and informed consent before collecting data. The traffic stimuli are custom vector illustrations, not photographs.
