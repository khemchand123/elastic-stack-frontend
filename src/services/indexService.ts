import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';

export const fetchIndices = async (): Promise<string[]> => {
    try {
        const response = await apiClient.get<string[]>(API_CONFIG.INDEX_LIST_API_URL);
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error('Failed to fetch indices:', error);
        // Return empty array on error to prevent crashing, allowing "ALL" fallback
        return [];
    }
};
