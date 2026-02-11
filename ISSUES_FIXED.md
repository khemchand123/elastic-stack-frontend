# Data Parsing Improvement

## Date: 2026-02-11

---

## 🔧 Index Data Parsing Update
**Task:** Configure the frontend to correctly parse the structuredJSON response from the Elastic index list endpoint.
**Change:** Updated `src/services/indexService.ts` to:
1.  Detect if the API returns an array of objects (as shown in the provided logs) or strings.
2.  Extract the `index` property from each object (e.g., `buyer_webapp_application_logs-2026.02.04`).
3.  Sort the resulting list alphabetically for easier navigation.

**Result:** The application now correctly displays the list of indices in the UI dropdown, handling the complex object format returned by the backend.
