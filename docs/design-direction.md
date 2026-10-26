# Design direction: «From how people work to systems that work»

October 2026. Replaces the process-map design from spring 2026.

## What the site has to say

Felix works between the people doing the job and the code that supports it, and can do both halves: user interviews, requirements and process mapping on one side, production React/TypeScript and a full Next.js → WordPress build on the other. The evidence is three projects (Phonero thesis, the STA website, Kristiansand kommune) and a leadership record with one verifiable award (NITO Local Chapter of the Year, best of 25).

## Concept

The job is turning the loose, human reality of an organisation into a structured system. The site shows that, literally:

- **Human register**: loose and rotated. Problems written as workshop notes (sticky-note yellow), fragments scattered at different depths.
- **System register**: aligned to a strict grid, ultramarine, connected by lines.

The signature moment is the hero. Real fragments of Felix's work (interviews, MoSCoW, process mapping, GraphQL, WordPress…) start scattered across an ultramarine field, next to the problems they answered ("manual work", "hard to update"). As the visitor scrolls, the problems drift away and the fragments sort themselves into three lanes, people, process and technology, joined by one connector in the order the work happened. The finished state is a working index: every fragment links to the project that proves it.

Everything else stays quiet and disciplined so that moment carries the identity.

## Tokens

| Name | Hex | Role |
|---|---|---|
| Ultramarine | `#2A36E6` | The system. Full fields (hero, contact), links, focus, connectors |
| Paper | `#F1F2F4` | Cool workshop-wall white, the reading surface |
| Ink | `#10142B` | Text, the Approach section's field |
| Graphite | `#565C72` | Secondary text (5.9:1 on paper) |
| Note | `#FFD54F` | Human things only: problems, notes, "now" |
| Wash | `#DFE2FF` | Quiet blue surfaces inside illustrations |

Type: one family, **Archivo** (variable, weight 100–900, width 62–125%), self-hosted. The width axis is the expressive device:

- The hero claim is set **wide** (118%, weight 820). Its first line, about people, starts **loose**: every word at its own width and weight. It settles into the wide setting as the board sorts.
- Section titles, chapter covers and the award are set **condensed** (66%, weight 800, very large, tight leading), so they can be tall without being wide. Wide against condensed is the hierarchy, instead of size alone.
- Reading text is at normal width.

Surfaces: a fine grid emerges under the hero board as it sorts. Loose fragments are ghost outlines; sorted ones are solid white index cards. Each project's illustration sits on its own plate (blue wash, grey with a dot grid, or night ink) that runs off the right edge of the page. The portrait is pinned like a print: white border, slight tilt, a note for the credit.

Layout: a 12-column frame, left-aligned throughout, generous gutters. Sections alternate between paper and two full colour fields (ultramarine at the start and the end, ink in the middle) instead of repeating one rhythm.

## Project treatments

Each project gets an interactive illustration that explains its idea, clearly labelled as an illustration where it is not the real artefact:

- **Phonero**: an equipment list that re-sorts from "by device" to "by person", with a device joining its owner through the SIM card (made-up data, not Phonero's UI).
- **STA website**: the real prototype in a browser frame, with a second tab showing the editor's guide, because the point of the project is that non-developers can maintain it.
- **Kristiansand kommune**: an isometric block grid, like the Kvadraturen street grid, to explain what a digital twin models. Pointer-reactive, drawn on a 2D canvas.

## Motion rules

- One orchestrated, scroll-linked moment (the hero sort). No fade-up-on-every-section.
- Everything else answers an action: toggles, tabs, the language switch (a view transition), the menu.
- `prefers-reduced-motion`: the hero shows the sorted system at once, illustrations are static, transitions are instant.

## Deliberately avoided

Cream and terracotta, black with an acid accent, all-caps eyebrows, `01/02/03` markers on things that are not sequences, identical rounded cards, arrows appended to every link, decorative WebGL. Three.js was considered for the digital-twin illustration and rejected: a 2D canvas draws the same thing with no dependency.
