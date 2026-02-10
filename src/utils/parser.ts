import { ParsedData } from '@/types/chat';

export const parseMCPResponse = (response: string): ParsedData => {
    const result: ParsedData = {};

    // Normalize newlines
    const normalized = response.replace(/\\n/g, '\n').replace(/\r\n/g, '\n');
    const lines = normalized.split('\n');

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        if (trimmed.startsWith('*predata,') || trimmed.startsWith('predata,')) {
            result.predata = trimmed.substring(trimmed.indexOf(',') + 1).trim();
        }
        else if (trimmed.startsWith('header,')) {
            const content = trimmed.substring(7).trim();
            // Remove brackets if present and split
            const cleanContent = content.replace(/^\[|\]$/g, '');
            result.header = cleanContent.split(',').map(h => h.trim());
        }
        else if (trimmed.startsWith('data,')) {
            const content = trimmed.substring(5).trim();
            try {
                // Try parsing as JSON first
                const parsed = JSON.parse(content);
                if (Array.isArray(parsed)) {
                    // If array of objects
                    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
                        // If headers exist, match keys. If not, collect all keys.
                        const keys = result.header || Array.from(new Set(parsed.flatMap(Object.keys)));
                        if (!result.header) result.header = keys;

                        result.data = parsed.map(item => keys.map(k => {
                            const val = (item as any)[k];
                            return typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
                        }));
                    } else {
                        // Array of primitives?
                        // result.data = parsed.map(item => [String(item)]);
                        // Or maybe it's just a row?
                        // Let's assume naive row behavior if not objects
                        // But valid data usually comes as array of objects in this context
                    }
                }
            } catch (e) {
                // Fallback: CSV parsing or simple split
                // Assume CSV-like if simple text
                // result.data = ...
                // For now, if JSON parse fails, maybe it's just a string?
            }
        }
        else if (trimmed.startsWith('postdata,')) {
            result.postdata = trimmed.substring(9).trim();
        }
        else if (trimmed.startsWith('finaly,') || trimmed.startsWith('final,')) {
            const idx = trimmed.indexOf(',');
            result.finaly = trimmed.substring(idx + 1).trim();
        }
    });

    // Fallback: if no structured data found, put raw response in predata
    if (Object.keys(result).length === 0) {
        // Check if it looks like the raw JSON format described
        if (response.trim().startsWith('{') && response.includes('"output":')) {
            try {
                const json = JSON.parse(response);
                if (json.output) {
                    // Recursive call with the inner string
                    return parseMCPResponse(json.output);
                }
            } catch (e) { }
        }
        result.predata = response;
    }

    return result;
};
