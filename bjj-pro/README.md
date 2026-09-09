# Focus BJJ — professional design study

A standalone companion to `bjj-website`, built with plain HTML, CSS, and JavaScript. The original website is unchanged.

## Open it

Open `index.html` directly, or use VS Code Live Server. No installation or build step is required. Google Fonts needs an internet connection; local fallback fonts remain usable offline.

## What to study

1. **Shared design tokens** — The top of `styles.css` defines the palette, typefaces, and container width. A small consistent set of decisions makes the sections feel related.
2. **Typography and hierarchy** — Antonio carries short, oversized headlines. Bai Jamjuree handles readable body text. Small numbered labels make the page easier to scan.
3. **Composition** — The hero uses a directional overlay to separate text from the photograph. The academy, coach, and FAQ sections use different grid proportions while sharing aligned edges.
4. **Spacing** — Consistent section padding and generous gaps create hierarchy without adding lots of boxes or decoration.
5. **Restraint** — Red marks important actions and two major transitions. Neutral surfaces give it room to stand out.
6. **Responsive layout** — Read the final CSS sections: columns stack, schedule rows rearrange, and navigation collapses. The content is not duplicated for mobile.
7. **Interaction** — `script.js` uses one schedule array for all filters. Pressed button states, live announcements, native disclosures, keyboard focus, and reduced-motion support make the interactions usable.

## Files

- `index.html`: semantic page structure and copy.
- `styles.css`: numbered, commented sections for each part of the design.
- `script.js`: menu, timetable filtering, session selection, and trial preparation.
- `images/`: copies of the original site's assets, so this folder is self-contained.

## Demo boundaries

This is a design concept using the original site's academy name, coach content, email, imagery, and timetable. Confirm those details and image usage rights before treating it as a real academy website. No backend or booking service is connected. The planner creates preparation advice locally; its email link opens a draft in the visitor's email app. It does not send a message or reserve a place.
