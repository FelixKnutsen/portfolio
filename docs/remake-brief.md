# Remake brief (draft, 15 November 2026)

Status: Phase 1 is done. Phase 2 (LinkedIn) is blocked, see the end. Nothing is built yet. This brief needs Felix's approval first.

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

## Blocked: LinkedIn

LinkedIn cannot be read from this cloud session. It refuses requests that are not from a logged-in browser, and automated access was blocked by the session's safety rules. `docs/linkedin-inventory.md` is therefore an empty template. Options:

1. Run Phase 2 from a desktop session with a browser logged in to LinkedIn.
2. Request a LinkedIn data export (Settings, Data privacy, Get a copy of your data, choose Posts) and add the files and photos to the repository.
3. Send the post links and photos directly.
