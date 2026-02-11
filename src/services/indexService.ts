import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';

interface IndexItem {
    health: string;
    status: string;
    index: string;
    uuid: string;
    [key: string]: any;
}

export const fetchIndices = async (): Promise<string[]> => {
    try {
        const response = await apiClient.get<IndexItem[] | string[]>(API_CONFIG.INDEX_LIST_API_URL);

        if (Array.isArray(response.data) && response.data.length > 0) {
            const firstItem = response.data[0];

            // Handle array of objects (e.g., [{ index: "name", ... }])
            if (typeof firstItem === 'object' && firstItem !== null && 'index' in firstItem) {
                return (response.data as IndexItem[])
                    .map(item => item.index)
                    .sort();
            }

            // Handle array of strings (e.g., ["name1", "name2"])
            if (typeof firstItem === 'string') {
                return (response.data as string[]).sort();
            }
        }

        return [];
    } catch (error) {
        console.error('Failed to fetch indices:', error);
        return [];
    }
};
