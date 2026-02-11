# API Proxy Implementation

## Date: 2026-02-11

---

## 🛡️ Wrapper API Implementation
**Task:** Create a Next.js API route to proxy requests to the Elastic backend, avoiding direct frontend-to-backend calls.
**Solution:**
1.  **Created Proxy Route:** Implemented `src/app/api/indices/route.ts` which acts as a server-side proxy.
    - Handles GET requests.
    - Fetches data from the internal Elastic endpoint (`http://10.84.85.37:8081/indices`).
    - Exposes this data at `/api/indices`.
2.  **Updated Configuration:**
    - Modified `.env` to point `NEXT_PUBLIC_INDEX_LIST_API_URL` to the local `/api/indices` endpoint instead of the direct IP.
    - Added `ELASTIC_BACKEND_URL` to `.env` for server-side use.
    - Updated `src/config/api.ts` to default to the proxy endpoint.

**Benefits:**
- **Solves CORS Issues:** Browsers no longer block requests due to cross-origin policies.
- **Hides Internal IP:** The actual backend IP is now hidden from the client-side code.
- **Better Error Handling:** Server-side timeouts and errors can be logged and formatted before reaching the frontend.

**Next Steps:**
- **Restart Server:** You must restart your development server (`npm run dev`) for the new environment variables to be loaded properly.
