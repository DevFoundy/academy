# DevFoundy Academy — AI-Assisted Software Development

**From Prompt to Production** is a free, English-language interactive course. It has six modules, 18 lessons, one activity and knowledge check per lesson, six four-question quizzes, a browser code playground, a prompt lab, and a guided TaskFlow Lite project.

Open `index.html` in a browser or serve the directory with any static HTTP server. There are no package dependencies, accounts, API keys, or build steps. All links within the course use hash routes so direct links work on GitHub Pages project sites. To publish, enable Pages from the `main` branch and repository root in **Settings → Pages**. The expected URL is `https://devfoundy.github.io/academy/`.

Progress, bookmarks, project checks, and reflection are saved in browser `localStorage`. Clearing site data erases them. The Academy does not inspect a student's external project; the final project checklist and completion record are self-reported. The prompt analyzer is a transparent keyword checklist, not a live AI model or an objective quality score. Code in the playground runs in a sandboxed iframe with a restrictive content security policy; still, do not enter secrets or untrusted third-party code.

## Structure

- `index.html` — semantic shell and navigation
- `style.css` — responsive light and dark interface
- `course.js` — curriculum, glossary, and reference content
- `app.js` — routing, activities, quizzes, progress, and playground

## Testing

Run `node --check course.js` and `node --check app.js`. Manually check lesson navigation, quiz pass/retry, local progress after refresh, the code preview, copy actions, keyboard navigation, and a narrow viewport. No automated browser test suite is bundled.

## Contributing

Issues and focused pull requests are welcome. Keep explanations accurate, activities genuinely interactive, and the core course accessible without sign-in or payment. This repository is separate from the main DevFoundy portfolio site.
