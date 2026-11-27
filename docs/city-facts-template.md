# City facts: how to make a city page worth indexing

City pages are only indexed when they say something true and specific about
that city that no other city page says. Otherwise Google treats ~150 near-copies
of one template as thin content, which can hold the whole site back.

Facts live in `lib/cityFacts.ts` under the city's slug (for example `noida`).
A city is indexed (hub page and main personal-loan page) only when it has:

1. an **overview** of at least 250 characters, **and**
2. at least **one lender** or **two local notes**, **and**
3. a **verifiedOn** date (YYYY-MM-DD).

Until then the page stays `noindex, follow`.

## What to write (only things Amortas itself knows)

- **Overview (3 to 5 sentences):** how Amortas actually helps people in this
  city. Who serves it, from which office, how contact happens, what a
  customer there typically needs to bring.
- **Lenders:** lenders you have actually placed cases with for customers in
  this city. Not lenders you merely list nationally.
- **Local notes (checkable points):** walk-in hours, how a visit works, which
  local documents or proofs lenders have asked for in practice, anything else
  a person there would find useful.
- **verifiedOn:** the date you last checked all of the above.

## Hard rules

- No copied or scraped text. Write it yourself.
- No rates, approval odds, "fastest", "lowest", "best", or "no fee" claims.
- No customer names, phone numbers or anything that identifies a person. If you
  use a case example, make it anonymous and get the customer's consent.
- If you are not sure a fact is true, leave it out.

## Fill-in sheet (send this to the developer, or edit `lib/cityFacts.ts`)

```
City:
Overview (3-5 sentences):
Lenders actually used for customers here:
Local notes (2 or more, each one checkable):
  -
  -
Verified on (date):
Verified by (name, kept internally):
```

## Suggested first cities

Start with cities inside the Delhi catchment, where you already have an office
nearby: Noida, Gurgaon, Ghaziabad, Faridabad. Then add others one at a time.
Do not add a city until the facts are real. A page with two true specifics
beats ten generic ones.
