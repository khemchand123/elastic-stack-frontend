export const API_CONFIG = {
    MCP_WEBHOOK_URL: process.env.NEXT_PUBLIC_MCP_WEBHOOK_URL || 'https://imworkflow.intermesh.net/webhook/es_mcp',
    // Use the Next.js API route as the default proxy
    INDEX_LIST_API_URL: process.env.NEXT_PUBLIC_INDEX_LIST_API_URL || '/api/indices',

    // Server-side only config (not exposed to client)
    // ELASTIC_BACKEND_URL is read directly in the API route handler

    TIMEOUT: 30000, // 30 seconds
    CACHE_TTL: 5 * 60 * 1000, // 5 minutes
};
