# The Exchange — research and current design spec

Status: the site is implemented in this repo. A street address is still omitted because none was verified for this Instagram account.

The selected base is the uploaded preview **IMG4544**. That file was not in this workspace when this note was written. The parent is editing that same full-page preview. An updated final file follows later.

## Selected preview (current)

Keep IMG4544 exactly, except two regions: the header mark and the footer mark. This is not a whole-page redesign.

Keep all of these as they already appear on IMG4544:

- Original huge tall condensed purple-and-blue `THE EXCHANGE` hero
- White brush-script `Buy Sell Trade` with that hero
- Hero objects
- Every lower section besides the footer mark

Do not restyle the hero into an all-chrome centered lockup. That instruction is withdrawn.

The old bio slogan word still does not appear in the design. The script line is `Buy Sell Trade`.

## Header and footer (the only changes)

In both the header and the footer, remove the circular electronics image. Replace each with the same chrome wordmark:

```
THE EXCHANGE
BUY SELL TRADE
```

- Angular italic beveled chrome, with purple and blue neon edge light, taken from the Instagram badge lettering.
- No circle.
- No electronics, sneaker, skyline, or other badge artwork in either mark.
- Header and footer use the same wordmark.
- Leave the rest of the header navigation and the rest of the footer as they are on IMG4544.

## What not to publish

- No street address, phone, hours, prices, payout speed, reviews, or offers.
- No Directions control until a full postal address is verified for this Instagram account.
- Contact is the verified handle only: https://www.instagram.com/the.exchange610/
- Do not use the circular electronics badge in the header or the footer. Both marks are the chrome wordmark above.
- Do not reproduce trademark insignia from the badge (controller marks, shoe insignia, and similar). New artwork stays unbranded.

## Verified business facts

| Fact | Status | Source |
| --- | --- | --- |
| Instagram handle `the.exchange610` | Verified live | Public oEmbed, 9 Nov 2026. Title returned: TheExchange610's (@the.exchange610) profile. https://www.instagram.com/the.exchange610/ |
| Profile image is the circular chrome badge | Verified live | oEmbed `thumbnail_url`, saved as `research/instagram-profile-avatar-240.jpg` (240×240 JPEG). The URL's encode tag names a 1080 master; only the signed 240 file was downloadable. |
| Clear logo crop | User-supplied visual authority | Chat attachment described as the logo closeup. Same badge as the avatar. Used for lettering, color, and objects. |
| City line on the badge | Observed on the logo | `READING, PENNSYLVANIA`. This is a city line, not a street address. |
| Badge service line | Observed on the logo | `BUY • SELL • TRADE` |
| Display name on the supplied profile screenshot | Observed, not re-read live | `TheExchange610` |
| Counts on that screenshot | Point in time only | 180 posts, 242 followers, 6 following |
| Contact chip on that screenshot | Observed label only | `Nick Peter`. Not confirmed as a legal owner, and no phone was attached to it. |
| Full street address | Not verified | See conflicts below. Do not print one. |
| Phone, email, hours | Not verified | Do not print them. |

Instagram's logged-out page was a login wall, so the bio was not re-read from the live HTML. The bio below is quoted from the user-supplied profile screenshot. It is provenance only. Do not put this sentence on the page.

> The Exchange | We Buy Valuables
> Got stuff? Get paid.
> Gold · Phones · Kicks · Electronics & more
> In with stuff. Out with cash. Reading PA.

Categories taken from that bio, for page copy that does not repeat the quoted slogan: gold, phones, kicks, electronics, and more. The badge also pictures a PC tower, game controller, camera, drone, phones, a laptop, and a sneaker. Those pictures are logo art, not a separate published inventory list.

## Address check — do not use

Searches that did **not** identify this Instagram account:

- Google Maps query `the.exchange610 Reading` returned no place.
- Google Maps query `The Exchange Reading PA` opened a pawn-shop card titled The Exchange at 921 Penn St, Reading, PA 19601, phone (610) 484-7170, plus code 83PJ+47, snippet “Closed · Opens 10 AM Mon”, 5.0 from 11 reviews. That card is **not** confirmed as `the.exchange610`.
- The same street number is publicly listed as G Shirts Inc., a T-shirt shop, phone (484) 516-2168, including a 15 July 2024 Reading Eagle report on 921 Penn St. Because of that conflict, do not print 921 Penn St or (610) 484-7170.
- The Exchange Inc., Langhorne (2052 E Old Lincoln Hwy, (215) 752-8993) is a different business.
- The Exchange media-store chain (`theexchange.com` / franchise locator) has no Reading store in the locator checked.
- The Exchange of PA, Wormleysburg, and The Exchange Club of Reading are different organizations.
- Capitol Cash Exchange, Cashing In, Pawn Plus, The Plug, and Off The Wall Exclusive Kicks are other Reading businesses.

## Lettering approximation

The badge wordmark is custom artwork: a heavy wide italic with a chrome bevel, purple-blue neon edge, and a custom arrow built into the E. The face is not positively identified. Do not name a proprietary font.

Closest free face for the italic mass, if a font is required behind the chrome effect: **Kanit Black Italic**. License: SIL Open Font License 1.1. Designer: Cadson Demak. Source: https://fonts.google.com/specimen/Kanit

Kanit does not include the bevel, the neon edge, or the arrow E. Those stay effects matched to the badge. Header text `The Exchange` should stay plain and readable, not a miniature chrome badge.

Comparison samples rendered locally from the OFL files are in `research/font-compare.jpg`. Row order is Exo 2 Black Italic, Kanit Black Italic, Chakra Petch Bold Italic, Quantico Bold Italic, Anybody italic, Anybody italic (narrower width), Archivo italic, Saira italic, Orbitron, Audiowide, Russo One, Goldman Bold, Oswald, Barlow Medium, Big Shoulders Display. Variable-font axis order was not rechecked after that sheet, so Anybody, Archivo, and Saira rows are less reliable than the static Kanit, Chakra Petch, and Quantico files.

## Color

From the badge and the approved purple-and-blue concept: black and charcoal fields, chrome silver, purple and blue neon, white for ordinary text. Metallic gold belongs to the product diorama (bars, coins), not to the hero type. The hero type is chrome with purple-blue edge light, not a gold gradient and not a flat purple-only fill.

## Assets in this folder

- `instagram-profile-avatar-240.jpg` — official oEmbed profile image. Research evidence. Not a header icon.
- `font-compare.jpg` — OFL lettering comparison. Not a site image.
