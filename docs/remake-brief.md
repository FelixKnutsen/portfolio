# Remake brief (15 November 2026)

Status: approved by Felix and built as `/prototypes/remake/` (add `?lang=no`). Phase 2 (LinkedIn) was done on 15 November 2026 from a desktop session: `docs/linkedin-inventory.md` lists all ten of Felix's posts, and the photo strip shows real moments. Results are at the end.

## What the live site measures (felixknutsen.com, English)

| | Live site | B2 prototype |
|---|---|---|
| Words on the page | 1,725 (1,496 in Norwegian) | 933 |
| Words on the first screen | 131 | about 130 |
| Page height, desktop / phone | 10,591px / 14,859px | 4,399px / about 7,500px |
| Real images | 2 (portrait, one STA screenshot) | 3 |
| Largest heading | 127px | 40px |

Words per live section: hero 166, about 187, work 522, leadership 252, experience 242, education 230, contact 92.

What a visitor meets: the name at 127px, then four more 92px headings, each followed by paragraphs. Education and experience together are 472 words and 2,950px, and they repeat what the CV says. In 1,725 words there are two pictures. There is nothing to look at, so there is nothing to stop for. B2 fixed the hierarchy but is still a text page: 933 words and three images.

Screenshots: `docs/remake/`.

## The one message

Felix works between the people doing the job and the code that supports it, and has done both. A visitor should leave with that sentence and three pictures in mind.

## Cut, keep, add

- **Cut** the education and experience sections as prose. One compact timeline row each, with the CV for detail.
- **Cut** the about section. Its first sentence becomes the headline, the rest goes behind "read more".
- **Cut** every heading above 40px and every introduction to a section.
- **Keep** B2's still People, Process, Technology model as the opening visual, the equipment-list interaction, and the STA laptop and phone screenshots.
- **Keep** both languages, the contact form, CV links, prerendering and the accessibility work.
- **Add** a "Seen in action" strip of photos from LinkedIn posts (award, events, talks, board work), each with one line and a date. Pending Phase 2.
- **Add** the Local Chapter of the Year 2026 award as a visual moment with the diploma, not a paragraph.

## Structure and word budgets (visible without expanding)

| Section | Content | Words |
|---|---|---|
| Opening | Headline, one line on who Felix is, the model, two actions | 40 |
| Three projects | Name, one sentence, role, one image or interaction each | 60 each |
| Seen in action | 4 to 6 photos with one-line captions | 60 |
| Award | Diploma image, one sentence | 25 |
| Record | Timeline of roles and education, titles and years only | 80 |
| Contact | Email, CV, LinkedIn, GitHub, form | 25 |
| **Total** | | **about 410**, 76% fewer than live |

## What makes it impressive

1. The model opens the page and each project section lights its own thread as it comes into view, so the idea carries through instead of being stated once.
2. Every project leads with something to look at or use: the working equipment list, the real STA site on two screens, the digital-twin grid.
3. A photo strip of real moments, which the site has never had.
4. Numbers set large where they are verified: 1 of 25 local boards, a 50% elected position, three languages on the STA site.
5. One screen per idea on desktop, so the page reads as about six stops instead of one long scroll.

## LinkedIn (was blocked, now done)

Done on 15 November 2026 with option 1 below. The notes that follow are kept for the record.


LinkedIn cannot be read from this cloud session. It refuses requests that are not from a logged-in browser, and automated access was blocked by the session's safety rules. `docs/linkedin-inventory.md` is therefore an empty template. Options:

1. Run Phase 2 from a desktop session with a browser logged in to LinkedIn.
2. Request a LinkedIn data export (Settings, Data privacy, Get a copy of your data, choose Posts) and add the files and photos to the repository.
3. Send the post links and photos directly.

## Built: measured results

Visible words, without expanding anything (English, live site against remake):

| Section | Live | Remake | Budget |
|---|---|---|---|
| Opening | 166 | 40 (including the three thread names in the model) | 40 |
| Phonero | 522 for all three | 46 of prose, plus 58 words of data inside the equipment list | 60 |
| STA | | 42 | 60 |
| Kristiansand kommune | | 45 | 60 |
| Beyond the projects (photo strip) | 252 | 35 | 60 |
| Award | | 19 | 25 |
| Timeline | 472 | 70 | 80 |
| Contact | 92 | 11 | 25 |
| **Whole page** | **1,725** | **about 385 with all labels drawn in the models** | at least 50% fewer |

- The page has 78% fewer visible words than the live site. Norwegian: about 335 against 1,496.
- Page height: 4,878px on desktop (live 10,591px) and 6,251px on a phone (live 14,859px). No horizontal scroll at 390px.
- Phonero is over budget only if the made-up device rows in the interactive list are counted as words.
- Keyboard order: skip link, navigation, the model (arrow keys turn it), then each project's controls and details. No console errors.
- Colours are B2's, so contrast is unchanged: 12.5:1, 7.1:1 and 8.3:1 on the dark background.
- Lint, typecheck, 352 tests and the production build pass. The build contains no prototype files.

Not done:
- The photo strip shows four real moments from `src/content/moments.ts`. Three have photos of Felix alone. The fourth (the KartAI seminar in Bystyresalen) stays a labelled frame until Felix approves the photo, because it shows other people. Facts added for the strip are waiting for Felix to confirm.
- The contact form opens an email draft in the prototype. The production form service is not wired in.
- The "light its thread as it comes into view" idea became a small model beside each project with that project's thread lit. Nothing moves on scroll.
- The team names in the equipment list are still English in the Norwegian version.
