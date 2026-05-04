# SEO and AEO rollout — manual punch list

Code changes to faro.is are complete. Items below need either action in another
repo, an external account, or a human pitching to a person.

## Cross-property changes (other repos)

### forelandmarine.com

Add to the site footer:

```html
<p>
  Designed and built by
  <a href="https://faro.is" rel="noopener">Faro Creative</a>,
  the founder-led design studio also run by Jack.
</p>
```

### nimarapilates.com

Same footer line as Foreland:

```html
<p>
  Designed and built by
  <a href="https://faro.is" rel="noopener">Faro Creative</a>.
</p>
```

### firstownersreference.com

Add a `/colophon` route. Suggested copy:

> The First Owner's Reference is published by Foreland Marine, an independent
> superyacht consultancy. It is designed and developed by
> [Faro Creative](https://faro.is), the design studio run by Jack, the editor
> of this Reference. The site uses Next.js, TypeScript, and MDX, hosted on
> Vercel. Typography is Figtree. Translations are managed with next-intl.

Also add the same one-line credit to the existing site footer.

## External accounts to create

### Plausible analytics

1. Create account at plausible.io
2. Add `faro.is` as a site
3. Set environment variable on Vercel:
   `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=faro.is`
4. Redeploy. The script tag is already wired in layout.tsx and will only load
   when the env var is set.

### Wikidata entry

Hold off until Faro has at least two external citations from independent
sources (a directory feature, a podcast appearance, an editorial mention).
Premature entries get nominated for deletion. Once ready: create a Q-item for
"Faro Creative" with statements for instance of (design studio), founder
(Jack), country (UK), website (faro.is), inception year.

## Directory submissions (one per fortnight, not a blast)

Track with an outcome column. Order from most likely to convert:

| Directory | URL | Notes |
| --- | --- | --- |
| Awwwards | awwwards.com/submit | Submit each case-study site individually, not faro.is |
| Land-book | land-book.com/submit | Curated, slow, worth it |
| Httpster | httpster.net/submit | Unfiltered firehose, fast indexing |
| Siteinspire | siteinspire.com | Editorial selection, takes weeks |
| Bestfolios | bestfolios.com | Specifically for studio portfolios |
| Sidebar.io | sidebar.io/submit | Newsletter syndication |
| One Page Love | onepagelove.com/submit | Good for landing pages |
| CSS Design Awards | cssdesignawards.com | Voting site, not pure curation |

## Editorial pitches

Each pitch needs a personal angle, not a press-release. Suggested angles:

- **It's Nice That**: pitch The First Owner's Reference as an editorial
  publication launch, not as a Faro Creative case study. Editor reads better
  for the reader; Faro gets credited in the colophon.
- **Dezeen**: same. Pitch the Reference as long-form yachting editorial,
  unusual for a consultancy to publish.
- **Brand New**: pitch Nimara Pilates identity work as a category-clearing
  brand for the saturated wellness market.
- **Sidebar (the publication, not the directory)**: pitch a written
  reflection from Jack on running both Foreland Marine and Faro Creative in
  parallel. The dual-role founder angle is rare.

## Podcast pitches

Three to research before pitching:

1. **Honest Designers Show**: founder-led design economics fits
2. **The Futur**: brand and identity focus
3. **Design Better**: studio operations, founder-led models

Pitch needs a specific topic, not "I would like to come on your show". Topic
suggestions:

- "How running a consultancy taught us how to run a design studio"
- "Why we ban Google Analytics from every Faro site"
- "Building an editorial publication as a content engine for a design studio"

## Measurement (monthly)

Track three numbers in a spreadsheet:

1. **Branded search volume** for "Faro Creative" (Google Search Console once
   verified)
2. **Referring domains** to faro.is (use Ahrefs free check or Google Search
   Console)
3. **AI citation tests**, run manually:
   - "who designed firstownersreference.com"
   - "best design studios for superyacht businesses"
   - "founder-led design studios UK"
   - "pilates studio website design"
   Run these in ChatGPT, Claude, Perplexity, Google AI Overviews. Note
   whether Faro is mentioned.

This third number is the only honest AEO measurement that exists today.

## Order of operations from here

1. Set up Plausible env var on Vercel (5 minutes)
2. Add cross-property footers on the three related sites (1 hour)
3. Verify Google Search Console for faro.is, submit sitemap (30 minutes)
4. First directory submission (Land-book), then one per fortnight
5. First editorial pitch (Brand New for Nimara) once Nimara is live
6. Wikidata once you have two citations
