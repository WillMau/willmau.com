# willmau.com Rebuild Brief

A handoff document for building the next version of willmau.com. Paste this into a fresh Claude Code session to start the rebuild.

## Context

I'm Will Mau. I just won reelection to the Schalmont School Board on 5/19/2026. The current willmau.com is a campaign site, frozen in time, with a countdown stuck at zero and every CTA pointing to "vote May 19." It needs to be rebuilt as a permanent personal identity hub now that the campaign is over.

I also own and run **mauops.com** (an AI consulting business for small businesses, built in Astro, already live). willmau.com is NOT my consulting site. It is the personal "front door" people land on when they Google my name.

## What willmau.com is (and isn't)

**It IS:** a static personal identity hub. Four pages. Low maintenance. The place someone Googles "Will Mau," lands within 10 seconds understands who I am, and finds where my actual work lives.

**It ISN'T:** a blog, a content site, a campaign site, or a consulting site. There is no posting cadence to maintain. School board content lives on Facebook. AI/consulting content lives on mauops.com and LinkedIn. willmau.com is the evergreen front door, updated maybe twice a year.

**Do NOT** redirect the domain to mauops.com. willmau.com stays its own site with its own brand.

## Site Structure

```
willmau.com/
├── /                          One-page hub
├── /about                     Long-form bio
├── /resume                    Digital CV with PDF download
└── /archive/2026-election     Preserved current campaign site
```

That's the whole site. Four pages.

## Tech Stack

- **Framework:** Astro (same stack as mauops.com so I have one mental model)
- **Hosting:** Wherever mauops.com is hosted, ideally. Netlify or Vercel are fine.
- **CMS:** None. Astro content collections if any structured content is needed later, but for now everything can live in markdown files in the repo.
- **Forms:** Newsletter signup using whatever email tool I land on (Buttondown, ConvertKit, or keep Substack as the email engine). For now, stub the signup form so it captures emails to a placeholder.
- **Analytics:** Plausible or Fathom (privacy-respecting). No GA.

## Brand and Design

**Palette:**
- Navy blue (civic, trustworthy)
- Green (bright, ~#6FCF97, echoes Schalmont without copying)
- White, off-white, charcoal for text

**Rules:**
- Never use the Schalmont district shield logo or exact district green (#00572c). Implies official endorsement.
- Keep navy distinct from the district's black.
- Sans-serif body, can pair with a warmer serif for headings if it reads well.
- Photography over illustration. Real photos of me, family, Rotterdam, district events.

**Tone:**
- Warm, direct, civic-minded.
- Not corporate. Not slick. Not "personal brand" feeling.
- Reads like a real person who happens to do interesting things, not like a marketing site.

**Never use em dashes anywhere in copy.** Use commas, colons, semicolons, or parentheses instead. This is a hard rule.

## Page Specs

### / (Homepage)

A single scrolling page. Sections in order:

1. **Hero**
   - Photo (headshot or environmental, not too formal)
   - Name: "Will Mau"
   - One-sentence identity line, something like: "Husband and dad in Rotterdam, NY. School board member at Schalmont Central School District. Scout troop leader. Founder of Mauops."
   - Sub-line: city / role context if useful.

2. **What I'm doing now (card grid)**
   - 4 cards, each links out to where that work actually lives:
     - **Mauops** (AI agents and consulting for small businesses) → mauops.com
     - **Schalmont School Board** (elected 2023, reelected 2026) → Facebook page link (will provide URL)
     - **Scouts** (troop leadership) → public troop info (will provide URL or omit link if too personal)
     - **Resume / CV** → /resume
   - If/when I commit to writing publicly, add a **Writing** card. Leave a slot for it in the layout.

3. **About snapshot**
   - 2-3 sentence "more about me" teaser
   - Link to /about for the long version

4. **Footer**
   - Email contact
   - LinkedIn
   - Link to /archive/2026-election with the phrasing "See the 2026 reelection campaign archive"
   - Small "Built with Astro" or similar if you want

### /about

The long version. Reads as a single essay-style page, not a corporate "About Us." Includes:

- **Origin story:** I ran for school board the first time because of a kindergarten class size issue. This is the strongest piece of writing on the current site. Preserve it. The full version exists on the current willmau.com and can be migrated.
- **Family and Rotterdam roots:** Lifelong-local context.
- **Current roles:** Board member, Scout troop chair, ops role at TalentSmart, founder of Mauops.
- **Photo or two:** Family, kids, district event, something human.
- **Soft CTA at the bottom:** Email signup or a link to /resume.

### /resume

Digital CV. Two formats on one page:
- Web version: scannable layout, sections for Experience, Education, Civic/Volunteer, Skills.
- "Download PDF" button at the top that exports the same content as a clean PDF.

The URL must be sharable. I drop willmau.com/resume into LinkedIn, applications, and board bios.

### /archive/2026-election

The entire current willmau.com preserved as-is. Banner at the top reads: "This is an archive of my 2026 reelection campaign for the Schalmont Central School District Board of Education. For current writing and updates, visit [willmau.com](/)."

Do not reformat, re-skin, or shorten the campaign content. The record, the budget data, the kindergarten origin story, the photos, the videos if any: all preserved. The current site lives entirely under this path.

Implementation note: easiest path is to copy the current site files into `/src/pages/archive/2026-election/` or equivalent and patch up internal links so they resolve under the archive path. If routes conflict, namespace them.

## Migration Tasks

1. Pull down the full current willmau.com source / content.
2. Move all campaign content under `/archive/2026-election/`.
3. Build the four new pages above.
4. Preserve all current URLs by 301-redirecting them to their archive equivalents (e.g., current `/record` becomes `/archive/2026-election/record`).
5. Pull the kindergarten origin story specifically into a clean version on `/about` (it's worth the work to make it read as evergreen, not campaign copy).

## Functional Requirements

- Fully responsive (mobile-first).
- Fast: Lighthouse 95+ on performance, accessibility, SEO.
- Semantic HTML, alt text on all images.
- Open Graph and Twitter card meta on every page.
- Favicon and apple-touch-icon.
- robots.txt and sitemap.xml.
- 404 page with personality, links back to /.
- All external links open in new tabs with `rel="noopener noreferrer"`.

## What NOT to Do

- Don't redirect willmau.com to mauops.com.
- Don't use the Schalmont district shield or exact district green.
- Don't add a blog / writing section right now. Leave the slot in the card grid for later.
- Don't use em dashes in any copy.
- Don't make it feel like a consulting site or a campaign site. It's a personal hub.
- Don't make it dependent on a CMS. Markdown files in the repo are fine.

## Acceptance Criteria

- All four pages exist and are linked from the homepage and footer.
- The 2026 campaign content is fully preserved under /archive/2026-election and reachable from the footer.
- Mobile and desktop both look great.
- I can update the homepage cards and /about by editing a markdown or content file, no developer needed.
- /resume has a working PDF download.
- Newsletter signup is wired (even if to a stub) and ready to swap to a real provider.
- Lighthouse scores above 95 across the board.

## Future (Not Now)

- Spin up `/2028` or similar when the next campaign cycle starts, by copying the structure of /archive/2026-election as a template.
- Add `/writing` if a real essay cadence emerges.
- Migrate off Substack to a self-hosted newsletter if I commit to writing.

End of brief.
