# Community Price Review & Selection Guidelines

How farmer/trader-submitted prices are checked, reviewed, and chosen for display
on AgroBusiness Malawi. This is **Phase 1** of a phased-hybrid model:
automatic statistical checks + a human review queue now; member confirm/dispute
voting later.

---

## 1. Who may submit

Only **approved members** (farmers, sellers, buyers who completed onboarding and
were approved) have their prices count automatically. Submissions are matched to
an approved member by the phone number / member reference supplied with the
report:

- **Member match** → the price enters the automatic checks below.
- **No member match** (anonymous or unregistered) → stored as `pending` and does
  **not** count until an admin approves it. These users are nudged to register.

Prices are never shown under a submitter's personal name.

---

## 2. Price lifecycle (`status`)

Every row in `crowdsourced_prices` carries a `status`:

| Status | Meaning | Counts toward the displayed price? |
|---|---|---|
| `pending` | Awaiting review (non-member, or cold-start) | No |
| `approved` | Passed checks / approved by an admin | **Yes** |
| `flagged` | Member price that failed a check — needs a human | No (until resolved) |
| `rejected` | Rejected by an admin | No |

---

## 3. Automatic checks at submission (the statistical gate)

Applied in order when a price is submitted:

1. **Sanity bounds** — price must be `> 0` and `<= 100,000 MWK/kg`. Fails → rejected.
2. **Reference band** — compare against the **median** of `approved` prices for the
   same crop (district-level if there are enough, otherwise crop-level) from the
   last 45 days. Accept if the new price sits within **0.4× to 2.5×** the median.
   - Inside band **and** member → `approved` automatically.
   - Outside band **and** member → `flagged` for review (likely a unit mix-up or an
     extra/missing zero).
3. **Cold start** — if there are fewer than **3** prior approved prices for that
   crop, there is no reliable median yet, so the price is held as `pending` for a
   human to seed the baseline.

Non-member submissions skip auto-approval and go straight to `pending`.

---

## 4. How the displayed price is selected

For each crop + district + market, the app shows the **median** of `approved`
prices (median resists outliers far better than the average), plus the range and
the number of reports:

- **Confirmed** — **3 or more** approved reports. Shown as the headline price.
- **Unconfirmed** — 1–2 approved reports. Shown, but labelled as early/unconfirmed.
- Prices older than **45 days** are excluded so the figure stays current.

---

## 5. Reviewer decision rules (for the admin queue)

Work the queue oldest-first. For each `pending` / `flagged` price:

**Approve** when:
- The market and district are plausible and specific.
- The price is realistic for the crop and season (cross-check the AgroBiz reference
  rate and other recent community reports).
- The unit is correct (per **kg**, not per bag or per tin).

**Reject** when:
- The unit is clearly wrong (e.g. a per-bag price entered as per-kg → ~50× too high).
- The value is implausible for the crop (typo / extra zero).
- It looks like manipulation: several identical off-market prices from the same
  phone or in a short burst.

**Flag / hold** when unsure — leave a `flag_reason`, and confirm with a district
extension agent before deciding.

### Red flags to watch for
- Round numbers far from the median (e.g. everyone reports 1,000 exactly).
- A sudden cluster of high/low prices for one crop+district in minutes.
- The same submitter reporting many crops at once with suspiciously uniform prices.

**Service level:** clear the queue at least once per working day. A member whose
price is rejected should, where possible, be told why (wrong unit is the usual cause).

---

## 6. Roadmap (Phase 2)

Once there is an active member base, add **member confirm/dispute voting**
(👍/👎, restricted to approved members) so the community can corroborate prices and
surface disputes automatically, with the admin queue reserved for contested cases.
