# Art direction exploration

October 2026. Three working prototypes of a new direction, compared with the current site. Nothing in the production site was changed for this. The prototypes live in `prototypes/` and only run on the dev server (`npm run dev`, then open `/prototypes/`). The production build does not include them.

## Critique of the current site

1. **The workshop metaphor took over.** Sticky notes, crossed-out problems, an index-card wall, dot-grid plates, a pinned photo and yellow highlights are all the same joke told six times. Only one moment is genuinely memorable: the loose first line of the headline settling into order. The rest reads as decoration.
2. **The palette is loud and digital.** Saturated ultramarine with lemon yellow, plus ink, pale blue and grey plates. Five surface colours and no calm. It is the colour of software, not of a person.
3. **Too much competes for attention.** The first screen alone carries 16 fragments with sources and 5 notes. Each project shows a problem note, lede, role, 3–4 steps, status, technology, links, a note and a caption, all at once. The same facts then return in the principles, the skills table and the background ledger: four tellings of three projects.
4. **Scale without composition.** One grotesk at two extremes (very wide, very condensed). The giant condensed section titles fill space rather than organise it. It is a familiar generated pattern.
5. **Almost no imagery.** One small black-and-white portrait and one screenshot. Everything else is UI mock-ups and diagrams, so the site never feels like it is about a person.

## Three directions

All three use the same content (`prototypes/shared/content.ts`, built from `src/content`) with a new hierarchy: one primary message, a one-sentence summary per project, facts in a short list, and process detail one level down.

| | A, Feature | B, Instrument | C, Plan |
|---|---|---|---|
| Idea | A magazine profile | A model you can turn over | An architect's monograph |
| Palette | Newsprint, ink, oxblood | Dark olive, chalk, amber | Concrete, black, pine |
| Type | Newsreader (serif, optical sizes) | IBM Plex Sans and Mono | Host Grotesk |
| Opening | Large serif headline, roman and italic, beside a big black-and-white portrait, with a contents list | Light headline beside a rotatable 3D model of people, process and technology | Half portrait, half message, set on one baseline |
| Projects | Spreads: title, standfirst, facts, a large figure, a pull quote, and notes in small columns | Scroll-linked: the project being read lights its thread through the three layers; demo panels; a collapsible process log | An index: pointing changes a large frame, opening a row unfolds the project sheet; every project drawn as a plan |
| Interactions | Images uncover as they are reached; the equipment list re-sorts | Drag to turn the model; scroll-linked threads; annotated screenshot; digital-twin hover readout | Hover-to-preview index; unfolding sheets; to-scale timeline you can read |
| Page length (desktop) | 8,757 px | 6,254 px | 3,904 px (sheets closed) |

The current site is 15,410 px.

## Evaluation

- **A, Feature** reads best and is the most human: your face, your own words as pull quotes, and a typographic voice that handles long case studies gracefully. Its risk is the palette. Warm paper with a serif and a red is close to a common generated look. It stays distinct only through the black-and-white photography, the strict notes system and very sparing oxblood. Its interactions are the most modest of the three.
- **B, Instrument** has the single strongest idea: each project as a thread through people, process and technology. That is the information-systems framework you actually work in, and it makes your positioning visible instead of stated. It is the most memorable. It is also the hardest to read (dark, a lot of mono), the first screen says less about who you are, and on a phone the model shrinks to a sketch.
- **C, Plan** is the most refined and the calmest, with the best use of space. But a split-portrait opening is a familiar pattern, the accordions hide the projects until opened, and it has the fewest effects. It comes closest to the static minimalism you said you do not want.

## Recommendation

**A, Feature, as the base, with B's thread model brought in as its one live figure.**

Editorial design is the most mature language for a portfolio that has to tell three stories well and carry a lot of real detail without feeling heavy. It gives you an identity built on your photograph and your own words, not on effects. B's best idea transfers well. The people–process–technology figure, redrawn in ink with an oxblood thread, would be the feature's central illustration, lighting each project's thread as you reach its spread. A's strengths (readability, photography, voice) would not survive the move into B's dark instrument.

To keep A from drifting into the generic warm-serif look: keep the paper greyer (newsprint, not cream), use oxblood only for the masthead rule, kickers and pull quotes, and let black-and-white photography carry the warmth.

## Keep, redesign, remove

**Keep:**
- The verified content model and both languages.
- Prerendering, accessibility work, the contact form and the CV links.
- The equipment re-sort.
- The STA screenshots, now shown as a laptop and phone pair.
- The variable-font idea, as a quieter optical-size or weight settle on the headline.

**Redesign:**
- The digital-twin canvas, as ink linework or a figure-ground plan.
- The background ledger, as a compact record listing.
- The principles, as three short items inside the profile.
- The skills table, folded into each project's facts.

**Remove:**
- Ultramarine and lemon.
- Sticky notes as decoration.
- The 16-fragment hero board and the sorting animation.
- Dot grids and the index-card wall.
- The giant condensed section titles.
- The repeated tellings of the same projects.
