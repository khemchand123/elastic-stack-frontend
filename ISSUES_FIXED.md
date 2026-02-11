# Index Deduplication & Wildcard Logic

## Date: 2026-02-11

---

## 🧹 Index Cleanup Logic
**Task:** Reduce clutter in the index list by consolidating time-series indices into a single wildcard entry.
**Change:** Updated `src/app/api/indices/route.ts` with transformation logic.
- **Before:** API returned raw list including `logs-2026.01.01`, `logs-2026.01.02`, etc.
- **After:**
  1.  Regex `-\d{4}\.\d{2}\.\d{2}$` identifies date suffixes.
  2.  Transforms matching indices to end with `-*`.
  3.  Deduplicates entries (e.g., multiple daily logs become one `logs-*` entry).
  4.  Returns a clean, sorted unique list to the frontend.

**Impact:** The dropdown menu is now much cleaner, showing simplified index patterns instead of hundreds of daily indices.
