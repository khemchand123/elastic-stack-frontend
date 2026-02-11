import { NextResponse } from 'next/server';
import axios from 'axios';

// Prevent this route from being cached statically if we want real-time data
export const dynamic = 'force-dynamic';

export async function GET() {
    const backendUrl = process.env.ELASTIC_BACKEND_URL || 'http://10.84.85.37:8081/indices';

    try {
        console.log(`[API Proxy] Fetching indices from: ${backendUrl}`);

        const response = await axios.get(backendUrl, {
            timeout: 10000, // 10 seconds timeout for backend call
        });

        const rawData = response.data;
        let indices: string[] = [];

        // Extract index names from response
        if (Array.isArray(rawData)) {
            if (rawData.length > 0 && typeof rawData[0] === 'object' && 'index' in rawData[0]) {
                indices = rawData.map((item: any) => item.index);
            } else if (rawData.length > 0 && typeof rawData[0] === 'string') {
                indices = rawData as string[];
            }
        }

        // Process indices to handle date suffixes and deduplicate
        const processedIndices = new Set<string>();
        // Regex to match date patterns like -2026.01.01 or -2024.12.31 at the end
        // Also captures optional extra segments if dates are in middle, but user asked to truncate from end
        const dateSuffixRegex = /-\d{4}\.\d{2}\.\d{2}$/;

        indices.forEach(index => {
            if (dateSuffixRegex.test(index)) {
                // Replace the date suffix with -*
                const normalizedIndex = index.replace(dateSuffixRegex, '-*');
                processedIndices.add(normalizedIndex);
            } else {
                // Keep non-date indices as is
                processedIndices.add(index);
            }
        });

        // Convert Set to sorted array
        const uniqueSortedIndices = Array.from(processedIndices).sort();

        // Forward the processed data
        return NextResponse.json(uniqueSortedIndices);
    } catch (error: any) {
        console.error('[API Proxy] Error fetching indices:', error.message);

        if (error.code === 'ECONNABORTED') {
            return NextResponse.json(
                { error: 'Backend connection timed out' },
                { status: 504 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch indices from backend', details: error.message },
            { status: 500 }
        );
    }
}
