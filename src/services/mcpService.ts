import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import { MCPRequest } from '@/types/api';

export const sendMessageToMCP = async (payload: MCPRequest): Promise<string> => {
    try {
        const response = await apiClient.post(API_CONFIG.MCP_WEBHOOK_URL, payload);

        // Handle different possible response structures
        if (typeof response.data === 'string') {
            return response.data;
        }

        if (response.data && typeof response.data === 'object') {
            // If the backend wraps the response string in a JSON object
            // e.g., { "response": "..." } or { "text": "..." }
            if ('output' in response.data) {
                return (response.data as any).output;
            }
            if ('response' in response.data) {
                return (response.data as any).response;
            }
            if ('text' in response.data) {
                return (response.data as any).text;
            }
            // If just generic object, stringify it
            return JSON.stringify(response.data);
        }

        return String(response.data);
    } catch (error) {
        console.error('MCP Webhook Error:', error);
        throw error;
    }
};
