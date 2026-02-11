export const API_CONFIG = {
    MCP_WEBHOOK_URL: process.env.NEXT_PUBLIC_MCP_WEBHOOK_URL || 'https://imworkflow.intermesh.net/webhook/es_mcp',
    INDEX_LIST_API_URL: process.env.NEXT_PUBLIC_INDEX_LIST_API_URL || 'http://10.84.85.37:8081/indices',
    TIMEOUT: 30000, // 30 seconds
    CACHE_TTL: 5 * 60 * 1000, // 5 minutes
};
