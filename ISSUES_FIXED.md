# Environment Variable Configuration

## Date: 2026-02-11

---

## 🔒 Configuration Externalization
**Task:** Move API endpoints to a `.env` file to allow configuration changes without modifying the source code.
**Change:**
1.  Created a `.env` file in the project root containing:
    ```env
    NEXT_PUBLIC_MCP_WEBHOOK_URL=https://imworkflow.intermesh.net/webhook/es_mcp
    NEXT_PUBLIC_INDEX_LIST_API_URL=http://10.84.85.37:8081/indices
    ```
2.  Verified that `src/config/api.ts` reads from `process.env`.

**How to Use:**
- Edit the `.env` file to change the target endpoints.
- The application will automatically pick up the new values (restart may be required for dev server).
