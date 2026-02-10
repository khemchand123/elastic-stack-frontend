import { useQuery } from '@tanstack/react-query';
import { fetchIndices } from '@/services/indexService';
import { API_CONFIG } from '@/config/api';

export const useIndices = () => {
    return useQuery({
        queryKey: ['indices'],
        queryFn: fetchIndices,
        staleTime: API_CONFIG.CACHE_TTL,
    });
};
