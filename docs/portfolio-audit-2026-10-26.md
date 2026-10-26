# felixknutsen.com: portfolio audit

**Date:** 26 October 2026
**Scope:**
- The live site (https://felixknutsen.com, `/no/` and `/en/`).
- The source in this repo (branch `redesign`, commit `ba190d8`, which matches what is deployed).
- The uploaded CV (2 pages, Norwegian).
- The public GitHub profile and repositories.
- The public, logged-out LinkedIn profile.

## How this was tested

| Method | What it covered |
|---|---|
| Built-in browser, Chromium | Desktop at 1024 px wide and mobile emulation at 375×812 |
| Lighthouse 12, headless Chrome | Run on `/en/`, mobile and desktop presets |
| `curl` | Headers, status codes, robots, sitemap, llms.txt, 404 handling |
| JS in the page | Performance entries, LCP/CLS, heading outline, link list, contrast ratios, target sizes |
| Repo checks | `npm test`, `lint`, `typecheck`, `npm audit` |
| Background agent 1 | GitHub REST API review of all 21 public repos |
| Background agent 2 | Design-reference research, each reference loaded and inspected |

**Not done:**
- Manual screen-reader testing (NVDA or VoiceOver).
- Real-device testing.
- Field Core Web Vitals. The site has Vercel Speed Insights, so real-user data exists in the Vercel dashboard, but I did not read it.
- Logged-in LinkedIn. The logged-out view only shows the headline, the location and recent activity.
- Private repositories, including any Phonero code.

**Labels used in this report:**
- **[Verified]**: directly observed or measured.
- **[Inferred]**: a reasoned conclusion from the evidence.
- **[Recommendation]**: proposed.

---

## 1. Executive assessment

This is already a careful, above-average student portfolio, and the engineering is better than most. It is not yet a persuasive one.

### What works

- **A real concept.** The "process map" identity ties the visual grammar (swimlanes for people, process and technology, plus a single blue connector) to who you are: someone who works between users, processes and code. I have not seen this on another student site. It is not a template.
- **Unusual factual discipline.** The content files cite their sources. Team work is labelled as team work ("What we did" vs "What I did"). Nothing is inflated. Recruiters notice this, and it is worth protecting.
- **Solid engineering.** The stack is typed React 19 + Vite with content separated from components. Both languages are covered by parity tests: 242 tests pass, and lint, typecheck and `npm audit` are clean. The site has prerendered HTML, hreflang, JSON-LD and llms.txt. Lighthouse scores 100/100/100/100 on desktop and 92/100/100/100 on mobile.

### What holds it back

1. **No clear target role.** The ask is *"a full-time role where organisations, information systems and digital transformation meet"*. That is a description of a field, not a job a recruiter can match. Within 10 seconds, a visitor learns your name (in 11rem type), that you are a student, and that you "care about" technology and digitalisation. They do not learn which job you want or what you can do on day one.
2. **The evidence is thinner than the frame.** Of three case studies:
   - Only one (STA) has a visual, a live demo and code. The site labels it "in progress".
   - Phonero, the strongest story (team lead, production stack, requirements through to code), has no artefact and no outcome.
   - Kristiansand kommune has no artefact and describes research ("researched digital twins") rather than a deliverable.
3. **The page is long and repeats itself.** It is 10,201 px tall at 1024 px wide and 15,081 px on a 375 px phone, about 18½ phone screens. The same roles appear up to four times: in the hero map, the work cases, the Leadership section, and the Experience timeline plus its list. The site even says so: *"The same information is in the list below, under Leadership and under Education"*. Education lists every semester's courses.
4. **The wider footprint undercuts the site.**
   - GitHub has an empty bio, an outdated profile README ("first-year master student") and three weak repos pinned.
   - One pinned repo's README (HOWWEROLL) names and blames a classmate.
   - The CV lists C#/.NET/PostgreSQL with no public evidence.
   - The LinkedIn headline reads as student politics, not information systems.
5. **One engineering mistake undoes the prerendering.** The build prerenders HTML, then `main.tsx` uses `createRoot().render()` instead of `hydrateRoot()`. React throws away the server HTML and renders everything again on the client (§7).

**Bottom line:** the site is about 75 % of the way to excellent on craft and about 50 % on persuasion. Most of the gain comes from positioning, evidence and editing, not new visual effects. Do not rebuild it. Sharpen it.

---

## 2. Scorecard

Scores are out of 10. "Prov." means provisional because testing was limited.

| Category | Score | Reasoning and evidence |
|---|---|---|
| Visual design | **7** | Coherent tokens (paper `#e8eae3`, ink `#15201b`, one signal blue, a highlighter yellow for "now"). Good serif and grotesk pairing. Restrained motion. Held back by: a top-heavy hero where the name takes most of the first screen; the same section rhythm repeated 7 times; a defect where the email address breaks mid-word ("felix.knutsen@gmail.c / om") in the Contact section at 1024 px. |
| Distinctiveness | **7** | The process-map concept is original and earned. Its payoff is weak: the six nodes are generic labels ("User interviews", "Requirements") and clicking one leads to more text, not to evidence. |
| User experience | **6** | Clear sticky navigation with a scroll-spy and a language switch that keeps your position. Very long page with fourfold repetition of the same roles. The Education course lists are low-value for recruiters. |
| Responsive design | **7** (prov.) | No horizontal overflow at 375 px. Thoughtful vertical map variant. On mobile, the portrait and the "Now" line drop below the fold and the "Now" text squeezes into a narrow column. The timeline needs sideways scrolling, and labels are cut off at the left edge. |
| Project presentation | **5** | An honest, consistent structure (context, role, steps, outcome or learning). But 2 of 3 cases have no visual or artefact, Phonero has no outcome, and the strongest public artefact (STA) is undersold. |
| Recruitment effectiveness | **5** | Target role unclear. Skills are spread through prose ("Technology" lens paragraph) instead of being shown against evidence. The English site offers only a Norwegian CV. The CTAs are good: View CV in the hero, plus email, form, LinkedIn and GitHub. |
| Technical quality | **8** | Clean architecture, typed bilingual content, tests, prerendering, careful head metadata. Held back by: `createRoot` throwing away the prerendered HTML; no CI; two production-looking branches (`Main` and `main`) on the remote. |
| Performance | **8** | **[Verified]** Lighthouse desktop 100 (LCP 0.5 s). Mobile (simulated slow 4G) 92: FCP 2.1 s, LCP 2.5 s (right at the "good" threshold), TBT 130 ms, CLS 0. In-browser: TTFB 112 ms, CLS 0. 86 KB gzip JS (268 KB raw) for a page that is almost entirely static. |
| Accessibility | **8** (prov.) | Automated: Lighthouse 100. Manual: skip link, landmarks, logical heading outline, all images have alt text, reduced-motion handled in 7 places, a visible focus style. Measured contrast passes: ink-soft on paper 6.4:1, signal blue on paper 5.21:1. Not done: screen-reader pass, interactive keyboard test of the map and timeline. |
| SEO and discoverability | **8** | Canonical, hreflang (nb/en/x-default), OG/Twitter tags with alt text, ProfilePage + Person JSON-LD, sitemap, robots, llms.txt, prerendered content, a proper 404. Held back by: a single-page site that gives one URL per language and no indexable project pages; sitemap `lastmod` set to the build date on every build. |
| Content and messaging | **6** | Accurate and careful. The hero statement is generic ("care about how technology, digital transformation and user-centred design can meet real needs in organisations"). The English role title "Officer of the learning environment" is awkward. Outcomes are thin. |
| Overall credibility | **7** | The site alone would score 8 for its honesty. GitHub (pinned repos, the classmate-naming README, stale claims) and the CV-to-evidence gaps bring the overall picture down. |

---

## 3. Detailed findings (section by section, live site)

### Header and navigation
- **[Verified]** The sticky header has the name and a blue "connector" mark, five section links, and a NO/EN toggle. Below 896 px it collapses to a "Menu" pill. The active section is underlined. All of this works well.
- **[Recommendation]** Add **CV** as a persistent header action on desktop. Today it lives only in the hero and in Contact, and it is the action recruiters want most.

### Hero (first 5–10 seconds)
**[Verified]** At 1024×600, the first screen holds:
- The name at around 110 px.
- A small grey role line ("Master's student…finishing in June 2027").
- A 26 px statement.
- A "Looking for…" line.
- Three CTAs.
- A "Now" note.
- A greyscale portrait, with the process map starting at the fold.

**What a recruiter learns:** a name, that you are a student, and an interest area. **What they do not learn:** the job you want, what you can do, and the one fact that sets you apart: you both run requirements work with users *and* write the production code yourself.

Specific problems:
1. The name is the hero. `--fs-name: clamp(3.5rem, 13.5vw, 11.5rem)` spends the most valuable space on information already in the browser tab and the URL.
2. The most important sentence, the role line, is the smallest and lowest-contrast text in the hero.
3. "Care about…" is a statement of interest, not of ability.
4. "Now" puts the 50 % student-politics role ahead of any technical identity. That suits public-sector and organisation roles, but it confuses anyone hiring for systems work.

### Process map (hero)
- **[Verified]** It is a good idea and well built. There are horizontal lanes on wide screens and a vertical list on narrow ones, the line draws in on view, and motion is disabled under `prefers-reduced-motion`. Each node is a link to its case.
- **[Inferred]** It is mostly decorative today. The six labels are generic, so the map shows *categories* of work rather than *evidence*. A visitor who sees it learns the same as from the About section's three lenses. The two duplicate each other.
- **[Recommendation]** Make it the site's main interaction. Hovering or focusing a node should show a small preview of the real artefact for that step: an interview-guide excerpt, a MoSCoW table, a Figma frame or a sanitised data model, a process diagram from the municipality, a screenshot. Then the map *proves* the claim instead of illustrating it. Remove the separate "People / Process / Technology" lens boxes in About, which repeat it.

### About ("Between the system and the people")
- **[Verified]** It is a good heading. The body is two paragraphs, the second of which is the best positioning text on the site ("how the work is really done, what users need, and what it takes for a new solution to be adopted").
- **[Verified]** The "Technology" lens is a 60-word sentence that lists technologies with their sources. It is accurate, but recruiters scan, and they will miss it.
- **[Recommendation]** Promote the second paragraph into the hero, then replace the lens boxes with a compact **skills-with-evidence** block (see §6).

### Selected work
**Phonero (bachelor thesis):**
- **[Verified]** The best narrative: a team of three, you as group lead and contact person, "wrote most of the code, front end and back end". The steps are interviews and MoSCoW, then Figma with Phonero's component library, then sprints in React, TypeScript and GraphQL.
- **Missing:**
  - No outcome. Was it shipped, demoed or adopted? What changed for customer service?
  - No visual.
  - No technical decision, even though the copy defines a label for one ("A decision we made").
  - No link to the thesis report.
- The title "from legacy to native" is jargon: native to what?

**STA website:**
- **[Verified]** Live prototype (stastudent.vercel.app), two public repos, a screenshot. It is your own initiative and solo work.
- **[Verified by agent]** stastudentphp has 52 solo commits and a 510-line user guide.
- **Problem:** it is framed as "in progress", the outcome waits for board approval, and the WordPress port and documentation (the real engineering judgement: choosing WordPress so non-programmers can maintain it) are told only in one-line steps.

**Kristiansand kommune:**
- **[Verified]** The lede and steps are about understanding the department, mapping solutions and researching digital twins. The "What I took away" learning is mature and good.
- **Missing:** any concrete deliverable. Your public LinkedIn post shows this was part of the **KartAI** innovation environment and ended with a seminar in Bystyresalen. The site mentions neither.

### Leadership
- **[Verified]** The STA role, NITO chair with the "Local Chapter of the Year, best of 25" award and a diploma PDF, and the Student Parliament. The award is a strong, verifiable credential, and it is presented well.
- **[Recommendation]**
  - Keep this section, but shorten it to about half.
  - Rename the English title to "Learning Environment Officer". The current "Officer of the learning environment" reads as a literal translation.

### Experience
- **[Verified]** A Gantt-style timeline (2018 to today) followed by an expandable list.
  - The timeline is a nice, honest overview of parallel commitments.
  - On mobile it needs horizontal scrolling and cuts labels off.
  - It repeats data from three other sections.
- **[Recommendation]** Keep the timeline as the single overview, and link each bar to the one place that role is described. Remove the duplicate list items for roles already told elsewhere.

### Education
- **[Verified]** The section covers the master's, the bachelor's (20 courses grouped by semester behind "Show courses"), the foundation year, and upper secondary school with a "journey".
- **[Inferred]** For employers, the course lists are noise, apart from 3–4 relevant ones: IS-304 bachelor thesis, and process and change management in the master's.
- **[Recommendation]** Collapse the section to about four lines, list the three most relevant courses by name, and drop the upper-secondary journey.

### Contact
- **[Verified]** A strong section: a large email link with a copy button, the CV view and download, LinkedIn, GitHub, and a validated form with a honeypot, inline errors and a privacy note.
- **Defect [Verified]:** at 1024 px the large email link wraps mid-word ("…@gmail.c" / "om"). **Fix:** apply `overflow-wrap: anywhere` only below a breakpoint, or reduce the font size with `clamp()` so the address fits on one line, or break only at the `@`.
- **[Verified]** The CV is Norwegian only. The label says "PDF in Norwegian", which is honest, but an English CV matters for the `/en/` audience.

### Footer, 404 and states
- **[Verified]** The footer has "Built with React and TypeScript" and a source link. The 404 is a real 404 page (status 404, `noindex`), but it is Norwegian only.
- **[Verified]** The form has sending, sent and failed states, and the failed state falls back to email.
- **[Recommendation]** Make the 404 bilingual. The form is fine as it is.

---

## 4. Professional positioning

### What the site communicates now
"A thoughtful, well-organised IS student, active in student politics, interested in digitalisation, who has also coded." It reads as **organisation first, technology second**, and the call to action is a field rather than a role.

### What the evidence supports
Across the CV, the site, LinkedIn and GitHub, the evidence supports:
- **Requirements to running code, solo:**
  - Phonero thesis: interviews, MoSCoW, Figma, then React, TypeScript and GraphQL in a production stack, as group lead.
  - STA site: identified the problem, built it in Next.js, ported it to WordPress for maintainability, and wrote a full user guide.
- **Process and public-sector discovery:** Kristiansand kommune (KartAI environment) and your STA policy work on AI guidelines and digital sovereignty.
- **Leadership with a verifiable result:** NITO chair, Local Chapter of the Year, and now the national board.
- **Production-code exposure:** the Phonero internship.

### Recommended primary positioning
> **An information systems graduate who works between the people doing the job and the code that supports it, and can do both halves.**

Target roles to name explicitly:
- IT consultant / digitalisation consultant (*IT-konsulent*, *digitaliseringsrådgiver*)
- Business analyst / requirements analyst
- Graduate programmes at consultancies and in the public sector
- Product-minded developer is a secondary option, and an honest one given Phonero and STA

**Do not** position yourself as a "frontend engineer" or "developer" first. The evidence supports *capable*, not *specialist*, and you would be compared with CS graduates on their own ground. The hybrid is your edge, and the site's concept already says so. The copy just needs to commit to it.

**Breadth to keep, but lower in the page:** student politics and the KIWI shift lead role show responsibility and stakeholder skills. They support the story. They are not the headline.

---

## 5. GitHub, CV and LinkedIn alignment

### Inconsistencies
| # | Finding | Status |
|---|---|---|
| 1 | **KIWI dates:** the CV says Mar 2022 – *present*; the site (`roles.ts`) ends it in Jul 2026. | Verified |
| 2 | **CV hosted on the site ≠ uploaded CV:** the files differ byte for byte (675 KB vs 659 KB). Check which is current. | Verified |
| 3 | **C#, .NET, PostgreSQL** are on the CV and in the site's Technology lens, with **no public evidence** in 21 repos. GitHub badges show MySQL and MS SQL, not PostgreSQL. | Verified (agent) |
| 4 | **The GitHub profile README** lists Java, Python, Docker, Azure and ActionScript (none on the CV), says "first-year master student" and "work-in-progress portofolio" (typo), and does not mention Phonero, the thesis or the municipality. | Verified (agent) |
| 5 | **The GitHub bio and website fields are empty.** felixknutsen.com is not linked from GitHub. | Verified |
| 6 | **The CV omits your strongest public artefact** (the STA website, its two repos and the live prototype) and the **NITO award**. It also omits Next.js, PHP/WordPress and GraphQL, which the site claims with evidence. | Verified |
| 7 | **The LinkedIn public headline** shows "Studentorganisasjonen i Agder" (your current employer) and no positioning statement. | Verified (logged-out view) |
| 8 | **The site omits KartAI**, which your own LinkedIn post names as the municipal project context. | Verified |

### Risks on GitHub
| Priority | Finding |
|---|---|
| P0 | **HOWWEROLL (pinned)** has a README that names a classmate ("Daniel"), blames him for group problems and quotes his messages. Lines 61 and 107 of the README, checked. This harms your credibility more than any design issue on the site. |
| P0 | **`gammelportfolio/.github/workflows/update-readme.yml`** runs daily on a cron. It sets the remote to `FelixKnutsen/portfolio.git` with a `GH_TOKEN` secret, runs `git reset --hard origin/main` and pushes a README. It has never run (0 runs per the agent; scheduled workflows only run from the default branch, which is `Main`). If it ever fires, it would overwrite the live repo's README. Delete it. |
| P1 | Pinned weak repos: HOWWEROLL, GuttaKrutt17 (no README, `.vs/` committed) and ind-Repository (a 2022 test). Seven IS-105 course forks and stubs dilute the list. |
| P2 | The **stastudent** repo root is cluttered with scratch and debug files (`scratch/`, `test-results/`, about 60 `scripts/inspect_*.js` files). **stastudentphp** commits build `.zip` files and 261 generated pages. |
| P2 | Visible "Co-Authored-By: Claude" trailers appear on several commits in portfolio, stastudent and stastudentphp. This is not a problem in itself, and using AI tools well is a real skill in 2026. But a reviewer who sees it will ask what *you* decided. Be ready to explain the architecture and trade-offs in your own words, and consider one honest line in each README ("Built with AI-assisted tooling; requirements, design decisions and content are mine"). |

### What to do
1. **CV:**
   - Add a "Selected projects" block (STA website, with link; Phonero thesis).
   - Add the NITO award.
   - Align the skills with evidence: add Next.js, WordPress/PHP and GraphQL; keep C# and .NET only if you can point to coursework.
   - Make an **English version**.
2. **GitHub:**
   - Bio: "IS master's student at UiA · requirements → running code · Kristiansand".
   - Website field: felixknutsen.com.
   - Rewrite the profile README to about 15 lines, with three linked projects.
   - Re-pin: portfolio, stastudentphp, stastudent.
   - Archive the forks and stubs.
   - Fix or remove the HOWWEROLL README.
   - Delete the cron workflow.
3. **Close the C#/.NET/SQL gap honestly.** Either remove those from the headline skills, or build one small public project. A good fit is an ASP.NET Core API with PostgreSQL, EF Core, xUnit and GitHub Actions, modelled on the "person-centred equipment list" domain from your thesis. It doubles as a demonstrable Phonero-style artefact without NDA problems.
4. **LinkedIn:**
   - Headline: "Master's student in Information Systems (UiA) · requirements, process and development · digitalisation".
   - Add the STA website as a project.
   - Set the website link to the portfolio.

---

## 6. Design direction

Keep the concept, the palette, the type and the stack. The direction is **"the map leads to the evidence"**: every visual element should either point to proof or be proof.

### Design tokens (keep, small additions)
- **Colour:** keep everything already in `tokens.css`. Add `--evidence-frame` (a 1 px `--rule-strong` border with `--paper-raised` fill) as the single treatment for artefact previews (screenshots, diagrams, document excerpts), so evidence is instantly recognisable across the site.
- **Type scale:**
  - Reduce `--fs-name` to `clamp(2.75rem, 7vw, 6rem)`.
  - Introduce `--fs-hero-claim: clamp(1.75rem, 3.6vw, 3rem)` for the positioning sentence. That sentence, not the name, becomes the largest piece of meaning on screen.
- **Spacing:** the 8 px system is fine. Shorten section padding by about 25 % once the content is cut. The page should feel denser, like a product, not airier.

### Hero (proposed wireframe, desktop)
```
┌──────────────────────────────────────────────────────────────┐
│ ●— Felix Fabricius Knutsen      Work  Background  Contact  CV↓ NO|EN │
├──────────────────────────────────────────────────────────────┤
│ FELIX FABRICIUS KNUTSEN  (≈6rem)                   [portrait]│
│ I work between the people doing the job and the    [colour?] │
│ code that supports it, and I can do both halves.  (≈3rem)    │
│ Master's in Information Systems, UiA · June 2027             │
│ Seeking: IT/digitalisation consultant · business analyst     │
│ [See the work →]  [CV (EN/NO)]  [Email]                      │
├──────────────────────────────────────────────────────────────┤
│ PEOPLE   ●Interviews ─────────────────────────●AI guidelines │
│ PROCESS        └─●MoSCoW ──────●Process map ┘                │
│ TECH                 └─●React/GraphQL ●WordPress port        │
│   (hover/focus a node → preview card with the real artefact) │
└──────────────────────────────────────────────────────────────┘
```
On mobile, keep the vertical map, but put the claim, the "Seeking" line and the CTAs before the portrait, and move "Now" into About.

### Project presentation
- **On the homepage:** three cards, each with a visual (a screenshot or a diagram you draw), a one-line problem, a one-line contribution and a one-line result, plus "Read the case study". If Phonero screenshots cannot be shown, draw the **before/after data model**: device-centric list → person-centric list with SIM-based auto-registration. A diagram you made is both safe and more impressive for an IS role than a screenshot.
- **Case-study pages** (`/en/work/phonero/` and so on, prerendered like the existing pages). Use only the sections you can support:
  1. Context, team and your role
  2. Problem (with a quote or paraphrase from the interviews, if you have permission)
  3. What we found: the MoSCoW table
  4. One decision and its trade-off (the "A decision we made" label already exists in `copy.ts`; use it)
  5. Build: stack and why
  6. Result
  7. What I'd do differently

  Reference: Buzz Usborne's Atlassian case (the hypothesis → validation arc) and Daorong Fang's needs-to-features chart, both loaded and checked. Trace your MoSCoW items to the features you shipped.

### Skills with evidence (replaces the lens boxes)
A compact three-column matrix where every skill links to its proof:

| Skill | Where it was used | Proof |
|---|---|---|
| Requirements and user interviews | Phonero thesis | case study → |
| Process mapping | Kristiansand kommune | case study → |
| React / TypeScript / GraphQL | Phonero intern + thesis | case study → |
| Next.js, WordPress / PHP | STA website | live site · repo → |
| Leadership and stakeholder work | NITO (award), STA | diploma PDF → |

Skills with no proof link (C#, .NET, PostgreSQL) go in a small "Also worked with in coursework" line.

### Interaction principles
- **Keep:** one orchestrated moment (the line drawing in), feedback on actions, and `prefers-reduced-motion` handling. This restraint is correct.
- **Add (high value):** node-to-evidence previews on the map, and shared-element transitions from card to case page using the View Transitions API, with a plain fallback.
- **Skip:**
  - 3D or WebGL.
  - A cursor spotlight (Brittany Chiang's site is widely cloned).
  - A portfolio chatbot.
  - Scroll-jacking.
  - A dark-mode toggle (the dark Contact section already gives contrast; a full dark theme is P3 at most).

### References
All were loaded on 26 October 2026 by the research agent.

| Site | What to adapt |
|---|---|
| **adhamdannaway.com** | A two-sided "designer / coder" hero. The closest model for your hybrid; your map already does this more originally. |
| **emilkowal.ski, paco.me** | A crisp role label and a "Today/Now" line; one sentence per project. Very low effort. |
| **rauno.me** | A 5–7 line "how I work" principles list instead of a bio paragraph. |
| **maggieappleton.com** | The same serif and sans pairing. Optional short "process notes" for writing about public-sector digitalisation (P3). |
| **brittanychiang.com** | Selected work up front with an archive behind it. Do not copy its layout. |
| **Avoid** | henryheffernan.com-style 3D desktops: they gate content behind a "best on desktop" screen and hurt recruiter scanning. |

---

## 7. Technical audit

### Verified issues
| # | Issue | Impact | Severity | Fix |
|---|---|---|---|---|
| T1 | `src/main.tsx` calls `createRoot(...).render()` on a root that `scripts/prerender.mjs` has filled with server HTML. React discards the markup and renders it again. | Extra main-thread work (mobile TBT 130 ms) and a possible repaint of the LCP element (in-browser LCP was the H1 at 944 ms). It also contradicts the site's own claim of prerendering. | P1 | Use `hydrateRoot` on `/no/` and `/en/`. `/` currently serves Norwegian and then picks a language on the client, which would cause a hydration mismatch. Resolve `/` with a Vercel redirect, e.g. a `has: [{type:'header', key:'accept-language', value:'.*en.*'}]` redirect to `/en/` and otherwise `/no/`, then hydrate everywhere. |
| T2 | No CI: tests, lint and typecheck never run on PRs. | A good test suite that is invisible to reviewers and not enforced. | P1 | Add `.github/workflows/ci.yml` running `npm ci`, `lint`, `typecheck`, `test` and `build`, and add a status badge to the README. |
| T3 | The remote has both `Main` (the default branch, 45 ahead and 31 behind) and `main` (holding the merged PR #10). The live site matches `redesign`. | Confusing to reviewers; risky for the stale cron workflow; unclear which branch is production. | P1 | Pick `main`, make it the default, and delete `Main`. Confirm the Vercel production branch. I did not check that. |
| T4 | Email link wraps mid-word at 1024 px. | A visible polish defect in the most important CTA. | P1 | Size it with `clamp()` so the address fits, or wrap only at `@`. |
| T5 | Lighthouse mobile: render-blocking CSS (estimated saving 580–730 ms). Source Serif 4 (120 KB) is not preloaded. | Mobile FCP 2.1 s and LCP 2.5 s, at the edge of "good". | P2 | Preload the serif or subset both fonts (the Latin subset could be about 40 % smaller). Consider inlining critical CSS. |
| T6 | `/images/*` served with `max-age=0, must-revalidate` (flagged as "2 resources"). | Repeat visits revalidate the images. | P2 | Add a `Cache-Control: public, max-age=604800` rule for `/images/(.*)` in `vercel.json`, or fingerprint the file names. |
| T7 | CSP is delivered only as a `<meta>` tag, with `script-src 'unsafe-inline'` and an unused `va.vercel-scripts.com` (analytics loads from `/_vercel`). | A weaker CSP than needed. `frame-ancestors` and reporting are unavailable in a meta tag. | P2 | Move the CSP to a `vercel.json` header. Check whether anything needs inline scripts (JSON-LD does not execute, so it is not affected). Remove `'unsafe-inline'` from `script-src` and the unused host, then check the console for violations. |
| T8 | HSTS is `max-age=63072000` without `includeSubDomains; preload`. | Minor. | P3 | Add both if every subdomain is HTTPS. |
| T9 | Sitemap `lastmod` is the build date on every build. | Weakens the lastmod signal. | P3 | Use the latest git commit date of `src/content`. |
| T10 | JS is 86 KB gzip / 268 KB raw for an almost static page. | Acceptable. Islands (Astro and similar) would cut it, but a rewrite is **not** justified. | P3 | After T1, lazy-load the Contact form, Timeline and Education with `React.lazy` below the fold. |
| T11 | The 404 page and the CV are Norwegian only. | An English-speaking visitor hits Norwegian. | P2 | Bilingual 404; English CV. |

### Strengths (verified)
- Typed bilingual content, with parity tests so every string exists in both languages.
- Pure logic in `lib/`.
- One CSS module per component, with design tokens.
- Prerendered HTML, so crawlers and link previews see real content.
- Security headers: XFO DENY, nosniff, Referrer-Policy, Permissions-Policy, HSTS.
- 0 audit vulnerabilities.
- DOMPurify lazy-loaded only on form submit.
- Honeypot on the form.
- Analytics events that never send typed input.
- Web3Forms' public key is correctly documented as public by design.

### Unverified concerns (need further access)
- Field Core Web Vitals in Vercel Speed Insights.
- Keyboard and screen-reader behaviour of the map previews and the timeline bars. Test with NVDA after any change.
- Whether the Web3Forms account has spam filtering or domain restriction enabled.
- Which branch Vercel deploys to production.

### Privacy note
The public CV PDF contains your phone number and is indexable. That is your choice, but consider a web version of the CV without the phone number.

---

## 8. Prioritised action register

| Priority | Finding | Recommended action | Effort | Expected impact | Verification method |
|---|---|---|---|---|---|
| P0 | HOWWEROLL README names and blames a classmate; it is pinned | Unpin it; replace the README with a neutral project summary or make the repo private | S | Credibility | Check that the profile no longer shows it and the README has no names |
| P0 | Cron workflow in gammelportfolio can force-push to the portfolio repo | Delete the workflow file; archive the repo; remove the `GH_TOKEN` secret | S | Security | The repo's Actions tab shows no workflows; the secret is gone |
| P1 | No named target role; generic hero statement | Rewrite the hero (copy in §9); shrink the name; make the claim the largest text | S | Recruitment | 5-second test with 3 people: can they state the role you want? |
| P1 | Phonero case has no outcome, no artefact, no decision | Add the result, one decision with its trade-off, and a hand-drawn before/after data-model diagram; link the thesis if allowed | M | Recruitment, project presentation | The case answers problem → role → decision → result |
| P1 | Kommune case has no deliverable | Name KartAI; add the deliverable (mid-term presentation, process map); state your specific contribution vs your partner's | S–M | Credibility | The case contains at least one concrete artefact |
| P1 | STA project undersold | Reframe it as delivered work: problem, why WordPress (maintainability for non-developers), a 510-line user guide, solo build. Add a second screenshot (editor view) | S | Evidence | Has live demo + repo + rationale + 2 visuals |
| P1 | `createRoot` discards prerendered HTML | Switch to `hydrateRoot`; resolve `/` at the edge | S–M | Performance, technical credibility | No hydration warnings; Lighthouse mobile TBT ↓; LCP element unchanged |
| P1 | No CI | Add a GitHub Actions CI workflow and badge | S | Technical credibility | A green check on a PR |
| P1 | GitHub profile empty or stale; weak pins | Bio, website, new README, re-pin, archive forks | S | Credibility, consistency | Profile review from a logged-out window |
| P1 | CV inconsistencies; no English CV; STA and award missing | Update the CV; produce EN and NO versions; serve the right one per locale | M | Recruitment | The `/en/` CV link opens the English PDF; dates match the site |
| P1 | Email wraps mid-word | Fix the type sizing | S | Visual polish | Screenshot at 1024, 1280 and 375 px |
| P2 | Page length and repetition (10.2k / 15.1k px) | Merge the lens boxes into the map; cut Education to essentials; remove duplicate list items; cut Leadership by about half | M | UX | Page height falls by ≥30 %; each role is described once |
| P2 | Skills not tied to evidence | Skills-with-evidence matrix (§6) | S | Recruitment | Every listed skill has a proof link or is labelled coursework |
| P2 | Single URL per language limits depth and SEO | Prerendered case-study pages per project | M–L | Discoverability, depth | The sitemap lists the case URLs; each has its own title, OG and canonical |
| P2 | Map is decorative | Node → evidence preview cards (hover, focus, tap) | M | Distinctiveness | Keyboard: Tab to a node shows its preview; screen reader announces it |
| P2 | No public C#/.NET/SQL evidence | Remove from headline skills, or build a small ASP.NET Core + PostgreSQL project with CI | M–L | Consistency | The repo exists with README, tests and CI, or the CV and site are adjusted |
| P2 | Font, CSS and image caching (T5, T6) | Preload or subset fonts; cache headers for images | S | Performance | Lighthouse mobile ≥ 97; FCP < 1.8 s |
| P2 | CSP in a meta tag with `unsafe-inline` (T7) | Move to a header; tighten | S | Security | securityheaders.com grade; no console violations |
| P2 | Norwegian-only 404 | Bilingual 404 | S | UX | Visit `/en/x/` |
| P3 | View Transitions card → case | Progressive enhancement | M | Polish | Works in Chromium; plain navigation elsewhere |
| P3 | Process notes / writing | 2–3 short posts on public-sector digitalisation | M | Distinctiveness, SEO | Published and indexed |
| P3 | HSTS preload, sitemap lastmod, lazy-loading below the fold | Small hardening | S | Quality | Headers and Lighthouse |

### Detail for the top items

**1. Hero rewrite (P1)**
- **Evidence:** the hero copy in `src/content/copy.ts` (`hero.*`) and `--fs-name` in `tokens.css`.
- **Why it matters:** the first screen decides whether a recruiter scrolls. It currently answers "who" but not "for what".
- **Outcome:** the role and the differentiator are understood in under 10 seconds.
- **Verify:** a 5-second test with 3 non-technical and 2 technical people.

**2. Phonero case (P1)**
- **Evidence:** `work.ts` has no `outcome`, `decision` or `evidence` fields for `work-phonero`, and the `decisionLabel` defined in `copy.ts` is unused.
- **Why it matters:** this is your best "both halves" proof.
- **Action:**
  - Ask Phonero (your supervisor) what can be shown.
  - Draw the data model and flow yourself.
  - Add one decision, e.g. why the list is organised by person rather than device, and what that changed.
  - Add the result in plain words, without inventing metrics.
- **Verify:** someone who reads only this case can explain what you personally did.

**3. GitHub clean-up (P0/P1)**
- **Evidence:** §5.
- **Why it matters:** technical reviewers click GitHub second, after the projects.
- **Verify:** a logged-out profile view shows a bio, a website and three strong pins.

**4. Hydration (P1)**
- **Evidence:** `src/main.tsx` lines 2 and 7; `scripts/prerender.mjs` fills `#root`.
- **Verify:**
  - The console shows no hydration-mismatch warnings.
  - A performance trace shows no second full render.

---

## 9. Recommended future structure

```
/en/  (and /no/)
├─ Header: Work · Background · Contact · [CV ↓]  NO|EN
├─ Hero: name · claim · seeking · CTAs · process map (nodes → evidence)
├─ Selected work: 3 cards with visual, problem, my part, result
├─ How I work: 5 principles + skills-with-evidence matrix   (merges About + lenses)
├─ Background: timeline overview, then the roles not told elsewhere
│    (KIWI, Phonero internship, STA, NITO with the award), then education in 4 lines
└─ Contact: email (one line), CV EN/NO, LinkedIn, GitHub, form

/en/work/phonero/   /en/work/sta-website/   /en/work/kristiansand-kommune/
   Case pages: context → problem → findings → decision → build → result → learnings
```

**Visitor journeys:**
- **Recruiter:** hero (role) → cards → CV.
- **Hiring manager:** cards → one case page → GitHub.
- **Developer:** map node → STA case → repo → this repo's README and CI.

| Improve | Add | Remove or consolidate |
|---|---|---|
| Hero copy and scale; the three cases; Leadership (shorter); Contact email sizing | Case pages; skills-with-evidence; English CV; artefact previews on the map; CV in the header; CI badge | About lens boxes (move into the map); duplicate Experience list items; Education course lists and upper-secondary journey; "Now" in the hero (move to About) |

### Replacement copy (factual, based only on existing sources)

**Hero claim**
- EN: *I work between the people doing the job and the code that supports it, and I can do both halves.*
- NO: *Jeg jobber mellom menneskene som gjør jobben og koden som støtter dem, og jeg kan gjøre begge deler.*

**Sub-line**
- EN: *Master's student in Information Systems at UiA, finishing June 2027. I've run user interviews and requirements work, mapped municipal processes, and written production React/TypeScript code.*
- NO: *Masterstudent i informasjonssystemer ved UiA, ferdig juni 2027. Jeg har gjennomført brukerintervjuer og kravarbeid, kartlagt arbeidsprosesser i kommunen og skrevet React/TypeScript-kode i produksjon.*

**Seeking**
- EN: *Looking for a graduate role as an IT or digitalisation consultant, business analyst or product-minded developer. Based in Kristiansand, open to relocating.*
- NO: *Ser etter en stilling som IT-/digitaliseringskonsulent, forretningsanalytiker eller produktorientert utvikler. Bor i Kristiansand, åpen for å flytte.*

**About ("How I work"), principle form, each one backed by a case**
1. Start with how the work is actually done, not with the tool. (Kommune)
2. Prioritise with the people who will use it. (Phonero, MoSCoW)
3. Build it so the people left behind can maintain it. (STA → WordPress)
4. Write down what you decided and why. (STA user guide)
5. Small improvements that get adopted beat big ones that don't. (Kommune learning)

**Phonero card**
> *Customers' equipment lists were full of wrong records and manual work. As group lead in a team of three, I ran interviews with customer service, prioritised with MoSCoW, designed in Phonero's Figma library and wrote most of the React/TypeScript/GraphQL code for a list that registers devices via the SIM card and is organised by person.*

Add the result line once you have confirmed it.

**STA card**
> *The student organisation's website was hard to update and hard to search. On my own initiative I built a new one, first in Next.js, then ported to WordPress so the board can edit it without code, with a full editor's guide. Live prototype, pending board approval.*

**Contact**
- EN: *The fastest way to reach me is email. I usually reply within a day.* Only include this if it is true.
- CV line: *CV in English · på norsk*.

---

## 10. Implementation roadmap

| Stage | What | Depends on |
|---|---|---|
| **1. Essential fixes** (≈1 day) | P0 GitHub items; email wrap; CI workflow; branch clean-up; `hydrateRoot` plus the `/` redirect; image cache headers | Nothing; all independent |
| **2. Content and visual** (≈1 week) | Positioning and hero copy (NO+EN); the three cases rewritten with artefacts (diagrams you draw); skills-with-evidence; Education and Leadership cuts; English CV; CV in the header; GitHub README, bio and pins; LinkedIn headline | The positioning decision comes first: everything else in this stage depends on it |
| **3. Architecture** (≈1 week) | Case-study routes (extend `prerender.mjs` and the sitemap with per-case pages; `meta.ts` per page); CSP to headers; font preload or subset; lazy-load below the fold | Stage 2 content (the case pages need the rewritten cases) |
| **4. Distinctive features** (≈1 week) | Map node → evidence previews; View Transitions card → case; optional .NET + PostgreSQL project; optional process notes | Stage 3 routes (for transitions) and stage 2 artefacts (for previews) |
| **5. QA** (≈1–2 days) | NVDA and keyboard pass on the map and timeline; Lighthouse mobile ≥ 97; real phone test; 5-second test with recruiters or classmates; check Speed Insights field data after 2 weeks | All of the above |

**Can be done in parallel:** stage 1 entirely; the GitHub, CV and LinkedIn work alongside the site work; the optional .NET project at any time.

---

## 11. The ten most impactful changes

1. **Name the target role and lead with the hybrid claim in the hero.** Every other improvement is wasted if visitors cannot place you within 10 seconds, and the claim is already true and evidenced.
2. **Give the Phonero case an outcome, a decision and a visual you drew.** It is your best proof of "both halves", and it currently ends at "Development in sprints".
3. **Fix the GitHub footprint** (the HOWWEROLL README, pins, bio, profile README, the cron workflow). It is the second place technical reviewers look, and right now it contradicts the polish of the site.
4. **Reframe STA as delivered engineering judgement.** It is your only fully verifiable artefact: live, solo, documented, with a maintainability-driven technology choice.
5. **Turn the process map into a gateway to evidence.** This converts the most distinctive element from decoration into proof. That is what makes the site memorable *and* credible.
6. **Cut the page by about a third** (remove repetition, course lists and lens boxes). A shorter page signals editorial judgement, which the roles you are targeting value.
7. **Align the CV with the site and publish an English CV.** Inconsistent dates and unproven skills are exactly what interviewers probe, and `/en/` visitors currently get a Norwegian PDF.
8. **Add per-project case pages.** You get depth without a long homepage, URLs you can share in applications, and more search surface.
9. **Switch to `hydrateRoot` and add CI.** Small changes that make the "technically credible" claim true at code-review level. A reviewer reading `main.tsx` will notice the first.
10. **Skills-with-evidence matrix, with unproven skills labelled honestly.** It turns a 60-word sentence into a scannable answer to "what can he do?", and protects your strongest asset: being trustworthy.
