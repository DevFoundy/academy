/* Course content is kept separate from the interface so another course can reuse the renderer. */
const modules = [
  {
    title: "Understanding AI-assisted development",
    minutes: 35,
    lessons: [
      {
        title: "What is AI-assisted software development?",
        minutes: 11,
        objectives: [
          "Describe the stages of building software",
          "Explain where an AI assistant fits",
        ],
        body: [
          "Software development begins with a problem, not a code editor. A developer finds out who needs the software, defines what it should do, chooses a practical design, builds it, and checks that it behaves as promised. Even a small task app has decisions about data, interaction, errors, and accessibility.",
          "An AI coding assistant can draft code, explain unfamiliar syntax, suggest test cases, and help investigate errors. It may make implementation faster, but it cannot know all of your users or verify that a feature works on their devices unless you give it evidence and test the result.",
          "A useful workflow is: idea → requirements → plan → AI assistance → implementation → testing → review → deployment. You own the decisions at each step. Ask what each generated part does before accepting it.",
        ],
        example:
          "Idea: “Remember my tasks.” Requirement: “Tasks remain after a refresh.” Plan: use browser localStorage for a first version. Ask AI for a small persistence function, inspect it, reload the page, then test with an empty list.",
        activity: { type: "workflow" },
        check: {
          q: "Which step should happen before asking an AI to write a feature?",
          options: [
            "Define the problem and expected behavior",
            "Publish the first generated answer",
            "Skip planning to save time",
          ],
          answer: 0,
          why: "A clear requirement gives you a way to judge whether generated code succeeds.",
        },
        takeaway:
          "AI helps with implementation; the developer stays responsible for requirements, testing, and decisions.",
      },
      {
        title: "Understanding AI limitations",
        minutes: 12,
        objectives: [
          "Recognize plausible but incorrect output",
          "Check security and documentation claims",
        ],
        body: [
          "AI responses can sound confident even when a function or package does not exist. This is sometimes called a hallucination. Other failures are less obvious: an answer may use an outdated API, make assumptions about your files, or implement only the happy path.",
          "A solution can run and still be unsafe. For example, a secret placed in browser JavaScript is visible to visitors. A feature may also be too complex for its job, making later changes harder. Treat generated code as a proposal to inspect.",
          "Verify an unfamiliar API in its official documentation, check the installed package version, run the feature, test edge cases, and read the code. If a response claims certainty without evidence, ask for the assumption it made and check it yourself.",
        ],
        example:
          'AI suggests `localStorage.save("tasks", tasks)`. That method does not exist. The browser API is `localStorage.setItem("tasks", JSON.stringify(tasks))`.',
        activity: { type: "spot" },
        check: {
          q: "Why is a secret API key in frontend JavaScript unsafe?",
          options: [
            "It makes CSS slower",
            "Visitors can inspect and copy it",
            "The browser removes it automatically",
          ],
          answer: 1,
          why: "Code sent to the browser is visible to the visitor, even if a variable name is obscure.",
        },
        takeaway:
          "Plausible code is not proof. Check APIs, assumptions, behavior, and security.",
      },
      {
        title: "The developer’s responsibility",
        minutes: 12,
        objectives: [
          "Decide what to delegate and what to review",
          "Use evidence before deployment",
        ],
        body: [
          "You are accountable for software you publish. That includes understanding what it stores, how it handles unexpected input, and whether its design works for someone other than you. An assistant cannot accept that responsibility on your behalf.",
          "Delegation works best for bounded tasks such as drafting a small component, explaining a function, or proposing tests. Review the result against the actual requirement. Ask for an explanation when a generated line is unclear; remove code you cannot justify.",
          "Build the habit of reading diffs, checking official references, and trying the feature yourself. Record a small test plan before release. Knowing when to pause and verify is a development skill, not a sign that AI failed.",
        ],
        example:
          "Your assistant adds a login form. You decide whether login is necessary, review where credentials go, test invalid input, and refuse to ship it until you understand its security model.",
        activity: { type: "decision" },
        check: {
          q: "Who makes the final decision to publish generated code?",
          options: [
            "The AI assistant",
            "The developer maintaining the project",
            "The package manager",
          ],
          answer: 1,
          why: "The project owner must review and verify behavior before release.",
        },
        takeaway:
          "Delegate drafting where useful, but retain the final decision and review.",
      },
    ],
  },
  {
    title: "Prompt engineering for developers",
    minutes: 45,
    lessons: [
      {
        title: "Writing effective development prompts",
        minutes: 15,
        objectives: [
          "Identify the five parts of a useful prompt",
          "Improve a vague development request",
        ],
        body: [
          "A good development prompt describes the goal, relevant context, requirements, constraints, and expected output. Goal says what problem to solve. Context says what already exists. Requirements describe behavior. Constraints set boundaries. Expected output tells the assistant what to return.",
          "“Make me a website” leaves nearly every decision open. A better request states who uses it, what actions are possible, which technologies fit the project, and how you will judge success. Specificity reduces ambiguity; it does not guarantee correct output.",
          "Start small. Ask for one feature or a plan, then review. Include acceptance criteria: observable results such as “a task remains after refresh.” Avoid pasting secrets or private data into prompts.",
        ],
        example:
          "Build a mobile-friendly task list for one person using HTML, CSS, and JavaScript. Users can add, complete, and delete tasks. Store tasks in localStorage. Use labeled controls and explain how to test persistence.",
        activity: { type: "analyzer" },
        check: {
          q: "Which item is an acceptance criterion?",
          options: [
            "Make it modern",
            "Tasks remain after refreshing the page",
            "Use something cool",
          ],
          answer: 1,
          why: "It describes behavior you can verify.",
        },
        takeaway:
          "Give the assistant a goal, context, requirements, constraints, and a testable output.",
      },
      {
        title: "Context and constraints",
        minutes: 15,
        objectives: [
          "Supply useful project context",
          "Protect secrets and scope",
        ],
        body: [
          "When changing an existing app, explain its structure and show only the relevant files. State its language, framework, installed versions, current behavior, and the exact result you want. A small accurate context is often more useful than a huge unfiltered paste.",
          "Constraints prevent an assistant from solving the wrong problem. You might require no new dependencies, support for mobile widths, keyboard accessibility, or compatibility with a static host. Make these limits explicit before the code is drafted.",
          "Acceptance criteria turn preferences into checks. For example: “The form shows an error for an empty title; adding a valid title displays a task; refreshing keeps it.” Remove tokens, keys, passwords, and sensitive user data before sharing context.",
        ],
        example:
          "Existing files: index.html, style.css, app.js. Change only app.js and the task form markup. Do not add packages. Preserve keyboard submission. Return a short explanation and a manual test checklist.",
        activity: { type: "builder" },
        check: {
          q: "Which detail should be removed before sharing project context?",
          options: [
            "The framework version",
            "A private API token",
            "The relevant function",
          ],
          answer: 1,
          why: "Secrets should not be put into prompts or committed to a repository.",
        },
        takeaway:
          "Useful context plus clear boundaries makes generated changes easier to review.",
      },
      {
        title: "Iterative prompting",
        minutes: 15,
        objectives: [
          "Break work into reviewable steps",
          "Give useful feedback after a failed attempt",
        ],
        body: [
          "A single request to build an entire product often produces code that is difficult to inspect. Break the work into milestones: define the data, build the basic interaction, persist it, handle errors, and polish the interface.",
          "After each change, run it and describe the exact behavior. “It doesn’t work” gives little information. “After I add a task and reload, the list is empty; the console reports a JSON parse error” points to the fault.",
          "Ask the assistant to state assumptions and make the smallest fix. Keep a working version in Git so you can compare changes or revert. Repeated full rewrites can erase functionality that already worked.",
        ],
        example:
          "Step 1: add tasks in memory. Step 2: mark them complete. Step 3: save and load. Step 4: test empty and malformed saved data. Review each step before continuing.",
        activity: {
          type: "choice",
          prompt:
            "The add button works, but tasks disappear after refresh. Which follow-up is best?",
          options: [
            "Rewrite everything from scratch",
            "Add localStorage save and load to the existing task functions; preserve current UI and show a test plan",
            "Make the design brighter",
          ],
          answer: 1,
        },
        check: {
          q: "What feedback is most useful when debugging with AI?",
          options: [
            "“Broken”",
            "An exact action, observed result, and error message",
            "“Try again”",
          ],
          answer: 1,
          why: "Reproducible evidence narrows the problem.",
        },
        takeaway:
          "Ask for one reviewable change at a time, test it, and report precise results.",
      },
    ],
  },
  {
    title: "Planning a software project",
    minutes: 45,
    lessons: [
      {
        title: "From idea to requirements",
        minutes: 15,
        objectives: [
          "Write user stories and requirements",
          "Define a small first version",
        ],
        body: [
          "A broad idea is a starting point, not a specification. Write a problem statement: who has the problem and what is difficult today? Then describe user stories such as “As a student, I want to see unfinished tasks so I know what to do next.”",
          "Functional requirements describe actions: add, complete, delete. Nonfunctional requirements describe qualities: readable on a phone, responsive with a keyboard, understandable error messages. Acceptance criteria give a concrete test for each requirement.",
          "An MVP is the smallest useful version that solves the central problem. Save optional features for a later release. A narrow scope creates room to finish, test, and learn from real use.",
        ],
        example:
          "TaskFlow Lite MVP: create a task, mark it complete, delete it, and keep the list after refresh. A calendar and team accounts can wait.",
        activity: { type: "priority" },
        check: {
          q: "What belongs in the first version of a simple personal task list?",
          options: [
            "Task creation and persistence",
            "Team billing and analytics",
            "A 3D animated dashboard",
          ],
          answer: 0,
          why: "A useful first release should solve the core task.",
        },
        takeaway:
          "Translate ideas into small, testable requirements before implementation.",
      },
      {
        title: "Choosing a technology stack",
        minutes: 15,
        objectives: [
          "Distinguish frontend, backend, and storage",
          "Choose tools based on requirements",
        ],
        body: [
          "HTML describes the page structure, CSS controls its appearance, and JavaScript handles interaction. Together they can build a useful browser application. A frontend framework helps organize larger interfaces, but adds setup and complexity.",
          "A backend runs on a server and can provide shared accounts, private business logic, or data access. A database stores structured data that should be available beyond one browser. An API is a defined way for software parts to exchange data.",
          "For a single-person task list, localStorage is a reasonable first persistence method. It stays on that browser and is not a backup or synchronization system. If users need the same tasks on multiple devices, you will need a server or hosted data service and an appropriate security model.",
        ],
        example:
          "Static task list: HTML + CSS + JavaScript + localStorage + static hosting. Shared team task list: frontend + authenticated backend + database.",
        activity: { type: "stack" },
        check: {
          q: "Can localStorage synchronize tasks between your phone and laptop by itself?",
          options: [
            "Yes, automatically",
            "No, it is local to a browser",
            "Only when CSS is enabled",
          ],
          answer: 1,
          why: "Cross-device synchronization requires shared storage and identity.",
        },
        takeaway:
          "Choose the simplest stack that meets the actual data and sharing requirements.",
      },
      {
        title: "Architecture and project structure",
        minutes: 15,
        objectives: [
          "Separate responsibilities among files",
          "Describe basic version control",
        ],
        body: [
          "A project structure is a map of responsibilities. index.html holds semantic page content; styles/main.css defines presentation; scripts/tasks.js handles task operations; scripts/storage.js handles saved data. Names should explain purpose.",
          "Separating concerns makes changes easier to locate. It does not mean splitting a tiny project into dozens of files. Prefer clear boundaries that match how you work. Document setup, behavior, and limitations in a README.",
          "Git records snapshots of your work. Make small commits with meaningful messages so you can understand what changed. Avoid committing secrets, generated clutter, or large files you do not need.",
        ],
        example:
          "taskflow/\n├── index.html\n├── styles/main.css\n├── scripts/app.js\n├── scripts/tasks.js\n├── scripts/storage.js\n└── README.md",
        activity: { type: "files" },
        check: {
          q: "Which file should normally describe how to run the project?",
          options: ["README.md", "A random image", "The browser cache"],
          answer: 0,
          why: "A README helps others understand setup, use, and limitations.",
        },
        takeaway:
          "Give files clear jobs and save focused changes in version control.",
      },
    ],
  },
  {
    title: "Building software with AI",
    minutes: 75,
    lessons: [
      {
        title: "Generating your first feature",
        minutes: 25,
        objectives: [
          "Request one feature with acceptance criteria",
          "Run and inspect browser code",
        ],
        body: [
          "Begin with a single visible task: add an item to a list. Define the input, the action, the output, and what happens for invalid input. Ask AI for a minimal implementation, then read the code before running it.",
          "The DOM is the browser’s representation of the page. JavaScript can read a form value, create a list item, and update what users see. Use textContent for user-entered text; assigning raw input to innerHTML can create injection problems.",
          "Use the playground below to try a small implementation. The preview runs inside a sandboxed frame, separate from the Academy page. Test an empty input, a normal task, and text containing angle brackets.",
        ],
        example:
          "Prompt: “Implement task creation in plain JavaScript. Reject blank titles, show a helpful message, use textContent, and keep the current HTML structure. Explain the event handler.”",
        activity: { type: "playground" },
        check: {
          q: "Which DOM property is safer for showing a user-entered task title as text?",
          options: ["textContent", "innerHTML with raw input", "eval"],
          answer: 0,
          why: "textContent treats the input as text rather than HTML.",
        },
        takeaway:
          "Build one small feature, inspect the code, then test normal and unusual input.",
      },
      {
        title: "Working with existing code",
        minutes: 25,
        objectives: ["Describe a scoped change", "Inspect a code diff"],
        body: [
          "Most development happens in code that already exists. Before asking for a change, identify the relevant files and the current behavior. Tell the assistant what to preserve, such as existing keyboard support or saved data.",
          "A diff shows added and removed lines. Read it before accepting the change. Look for unrelated rewrites, hidden dependencies, changed data formats, and code that no longer matches the requirement.",
          "If a suggestion alters several files for a tiny feature, ask why. Run the existing flows after the change. A new feature is incomplete if it breaks what already worked.",
        ],
        example:
          "Request: “Add a clear-completed button to the existing task app. Modify only the task controls and task state logic. Keep add, delete, and save behavior. Show the changed files and tests.”",
        activity: { type: "review" },
        check: {
          q: "What should you inspect after an AI changes an existing project?",
          options: [
            "Only the new button’s color",
            "The diff and existing flows",
            "Only the commit title",
          ],
          answer: 1,
          why: "Changes may affect code outside the requested feature.",
        },
        takeaway:
          "Protect working behavior by making scoped changes and reviewing diffs.",
      },
      {
        title: "Developing incrementally",
        minutes: 25,
        objectives: [
          "Plan milestones",
          "Avoid accumulating unverified changes",
        ],
        body: [
          "Incremental development keeps the project in a working state. Add one capability, test it, and commit it before moving to the next. This makes regressions easier to locate.",
          "Choose milestone boundaries that produce observable behavior. A task app might progress from rendering an empty state, to adding tasks, to marking tasks complete, to saving them. Each milestone has a short acceptance test.",
          "If a feature becomes complicated, split it again. A reliable small release teaches you more than an ambitious interface with half-working controls.",
        ],
        example:
          "Milestone A: add and delete. Test both. Milestone B: complete and filter. Test both. Milestone C: persist and recover from malformed saved data. Test refresh and failure.",
        activity: { type: "milestones" },
        check: {
          q: "When should you save a focused Git commit?",
          options: [
            "After a tested working milestone",
            "Only when the entire product is finished",
            "Before reading what changed",
          ],
          answer: 0,
          why: "Small working commits are easier to review and revert.",
        },
        takeaway:
          "Keep changes small, test at each milestone, and preserve a working version.",
      },
    ],
  },
  {
    title: "Debugging, testing, and security",
    minutes: 70,
    lessons: [
      {
        title: "Debugging AI-generated code",
        minutes: 23,
        objectives: ["Reproduce an error", "Form and test a hypothesis"],
        body: [
          "Debugging starts with a reproducible observation. Record the action, expected result, actual result, and any console error. Reduce the problem to the smallest case you can reproduce.",
          "Form a hypothesis about the cause, then test it. Inspect variable values and follow the data through the function. Avoid changing many unrelated lines at once, or you will not know which change fixed the problem.",
          "An AI assistant can suggest likely causes, but it needs your evidence. Check its proposed fix against the failing case and run nearby cases to detect regressions.",
        ],
        example:
          "Bug: refreshing with an empty localStorage value crashes JSON.parse. Hypothesis: the app parses an empty string. Test a fallback and a try/catch for malformed saved content.",
        activity: { type: "debug" },
        check: {
          q: "What is the first useful step when an app fails?",
          options: [
            "Rewrite all the files",
            "Record steps to reproduce and the observed error",
            "Deploy again",
          ],
          answer: 1,
          why: "A reproducible failure gives you evidence for a targeted fix.",
        },
        takeaway:
          "Observe, reproduce, hypothesize, change one thing, and retest.",
      },
      {
        title: "Testing and verification",
        minutes: 23,
        objectives: [
          "Write behavior-based tests",
          "Test edge cases and accessibility",
        ],
        body: [
          "A test asks whether a requirement is true. Manual testing is useful for interface behavior; automated tests help repeat the same checks. Neither replaces understanding what the user needs.",
          "Test normal use and edge cases: empty input, long text, repeated clicks, refresh, corrupted saved data, narrow screens, keyboard navigation, and reduced motion. These are ways real users can expose assumptions.",
          "A test should fail when the feature is broken. “The page loads” is not enough to prove tasks persist. Write a specific sequence: add a task, reload, and check that the exact task remains.",
        ],
        example:
          "Acceptance test: Given an empty task list, when I add “Read chapter 2,” then it appears once. After refresh, it is still present and can be marked complete.",
        activity: { type: "testplan" },
        check: {
          q: "Which test verifies persistence?",
          options: [
            "The heading is visible",
            "Add a task, refresh, then check that it remains",
            "Open the CSS file",
          ],
          answer: 1,
          why: "The test checks behavior after the page reloads.",
        },
        takeaway:
          "Test observable requirements, unusual input, and real interaction methods.",
      },
      {
        title: "Secure and maintainable AI-assisted code",
        minutes: 24,
        objectives: [
          "Identify common frontend risks",
          "Keep generated code understandable",
        ],
        body: [
          "Security begins with boundaries. Do not put private API keys in client code or a public repository. Treat user input as untrusted, and display it as text unless you have a careful sanitization strategy.",
          "Dependencies can introduce security and maintenance costs. Check whether you actually need a package, what version is installed, and whether its documentation matches the code. Never run unknown generated commands without understanding them.",
          "Maintainable code has clear names, small responsibilities, and documented assumptions. Ask AI to simplify a dense answer, but verify that the simplified version still handles errors and accessibility.",
        ],
        example:
          "Unsafe: `list.innerHTML += `<li>${title}</li>``. Safer: create an li element, set `li.textContent = title`, then append it.",
        activity: { type: "security" },
        check: {
          q: "What should you do with a private API key used by a web app?",
          options: [
            "Put it in a public script",
            "Store it securely on a backend when needed",
            "Hide it in a CSS comment",
          ],
          answer: 1,
          why: "Browser assets and public repositories expose their contents.",
        },
        takeaway:
          "Protect secrets, treat input as untrusted, and keep the code explainable.",
      },
    ],
  },
  {
    title: "From prototype to production",
    minutes: 60,
    lessons: [
      {
        title: "Git and GitHub",
        minutes: 20,
        objectives: [
          "Explain commits and repositories",
          "Use a basic review workflow",
        ],
        body: [
          "Git tracks changes locally; GitHub hosts repositories and collaboration tools. A repository holds your files and their history. A commit is a named snapshot of a related set of changes.",
          "A typical flow is to inspect status, review the diff, stage intended files, commit with a clear message, then push. A branch lets you work on a change without immediately changing the main version. A pull request invites review before merging.",
          "Do not assume a successful push means the software works. Review the changed files, test locally, and check the deployed page. Keep secrets and unnecessary generated files out of the repository.",
        ],
        example:
          'git status → git diff → git add index.html app.js → git commit -m "Persist tasks across refresh" → git push',
        activity: { type: "git" },
        check: {
          q: "What does a Git commit represent?",
          options: [
            "A saved snapshot of changes",
            "A live web server",
            "A private password",
          ],
          answer: 0,
          why: "Commits preserve a reviewable point in the project history.",
        },
        takeaway:
          "Review changes, commit focused work, and verify the result after pushing.",
      },
      {
        title: "Deployment and maintenance",
        minutes: 20,
        objectives: ["Explain static deployment", "Plan checks after release"],
        body: [
          "Deployment makes your app available to other people. A static project can often be hosted on GitHub Pages. Check the repository settings and path: a project page usually lives under a repository subdirectory, so root-relative asset paths may break.",
          "Before release, test on a narrow screen, with keyboard controls, with saved and empty data, and with the network unavailable if your app claims offline behavior. After deployment, open the public URL and repeat the main user journey.",
          "Maintenance means responding to bugs, updating documentation, and reviewing dependencies or platform changes. Write known limitations honestly. A working first release is a starting point, not the end of the project.",
        ],
        example:
          "For a project at `username.github.io/taskflow/`, use `./style.css` rather than `/style.css`; the latter points to the site root.",
        activity: { type: "deploy" },
        check: {
          q: "What should you do after GitHub Pages reports a successful deployment?",
          options: [
            "Assume every feature works",
            "Open the public URL and test the main flow",
            "Delete the local project",
          ],
          answer: 1,
          why: "The deployed environment can differ from local development.",
        },
        takeaway:
          "Release deliberately, test the public version, and document limitations.",
      },
      {
        title: "Becoming an independent developer",
        minutes: 20,
        objectives: [
          "Plan future learning",
          "Know when to verify AI suggestions",
        ],
        body: [
          "Independence does not mean never using tools. It means knowing what problem you are solving, how your app works, and how to find evidence when something fails. AI can speed up drafts while you develop judgment.",
          "When you meet an unfamiliar concept, make a tiny experiment. Read the official documentation, change one line, predict what will happen, and observe. This is more durable than collecting code you cannot explain.",
          "Finish by building TaskFlow Lite. Make it your own, but keep the first release small. Document what AI helped with, what you changed, and how you verified the result. Then choose one improvement based on a real user need.",
        ],
        example:
          "Learning loop: define a question → predict → build a small experiment → observe → explain the result → use it in a project.",
        activity: { type: "reflection" },
        check: {
          q: "What shows that you understand generated code?",
          options: [
            "You can explain and test its behavior",
            "It looks long and complex",
            "You pasted it without errors",
          ],
          answer: 0,
          why: "Understanding is demonstrated by explanation, prediction, and verification.",
        },
        takeaway:
          "Use AI as a collaborator while building your own reasoning and verification habits.",
      },
    ],
  },
];
const glossary = {
  API: "A defined interface that lets software parts exchange requests and data.",
  "Acceptance criteria":
    "Observable conditions that show whether a requirement is met.",
  Backend:
    "Software that runs on a server, often handling data or private operations.",
  Commit: "A saved snapshot of project changes in Git.",
  Dependency: "External software a project uses.",
  Diff: "A view of lines added, removed, or changed.",
  DOM: "The browser’s object representation of an HTML document.",
  Frontend: "The interface code delivered to and run in a browser.",
  Hallucination: "A plausible but incorrect claim generated by an AI system.",
  localStorage:
    "Browser storage scoped to a site and browser, with no built-in cross-device sync.",
  MVP: "Minimum viable product: the smallest useful version that solves the main problem.",
  Repository: "A project and its tracked Git history.",
  "User story": "A short description of what a user wants and why.",
};
const resources = [
  {
    title: "Development prompt template",
    body: "Goal: [what problem are we solving?]\nContext: [relevant files, current behavior, stack]\nRequirements: [observable user actions]\nConstraints: [dependencies, accessibility, hosting]\nExpected output: [files, explanation, test plan]",
  },
  {
    title: "Debugging checklist",
    body: "1. Reproduce the error.\n2. Record expected and actual behavior.\n3. Read the console error.\n4. Isolate the smallest failing case.\n5. Test one hypothesis.\n6. Check nearby features after the fix.",
  },
  {
    title: "Security checklist",
    body: "Never commit secrets. Display untrusted text with textContent. Validate input. Review dependencies. Check permissions. Understand generated commands before running them.",
  },
  {
    title: "Git workflow",
    body: 'git status\ngit diff\ngit add <intended files>\ngit commit -m "Describe the change"\ngit push\nThen test the public build.',
  },
  {
    title: "Test plan template",
    body: "Given [starting state], when [action], then [observable result].\nRepeat for empty input, unusual input, refresh, mobile width, and keyboard use.",
  },
  {
    title: "TaskFlow Lite guide",
    body: "Define your requirements. Build add, complete, delete, then persistence. Test each milestone. Write a README and publish a verified static build.",
  },
];
