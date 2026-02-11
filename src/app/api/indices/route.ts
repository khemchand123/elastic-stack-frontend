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

        // Forward the data from the backend to the frontend
        return NextResponse.json(response.data);
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
