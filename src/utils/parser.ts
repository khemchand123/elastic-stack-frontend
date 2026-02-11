import { ParsedData } from '@/types/chat';

export const parseMCPResponse = (response: string): ParsedData => {
    const result: ParsedData = {};
    let contentToParse = response;

    // 1. Try to unwrap JSON if it's the specific format: [{ "output": "..." }]
    try {
        const trimmed = response.trim();
        if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].output) {
                contentToParse = parsed[0].output;
            } else if (typeof parsed === 'object' && parsed.output) {
                contentToParse = parsed.output;
            }
        }
    } catch (e) {
        // Not a JSON wrapper, use raw string
    }

    // Normalize newlines
    const normalized = contentToParse.replace(/\\n/g, '\n').replace(/\r\n/g, '\n');
    const lines = normalized.split('\n');

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        if (trimmed.startsWith('predata,')) {
            result.predata = trimmed.substring(8).trim();
        }
        else if (trimmed.startsWith('header,')) {
            const content = trimmed.substring(7).trim();
            try {
                // Should be valid JSON array: ["col1", "col2"]
                result.header = JSON.parse(content);
            } catch (e) {
                // Fallback: simple split if not valid JSON
                result.header = content.replace(/^\[|\]$/g, '').split(',').map(s => s.trim().replace(/^"|"$/g, ''));
            }
        }
        else if (trimmed.startsWith('data,')) {
            const content = trimmed.substring(5).trim();
            try {
                // The format is: [{"val1","val2",123}, {"val3","val4",456}]
                // Convert { to [ and } to ] to make it valid JSON array of arrays
                const validJson = content.replace(/\{/g, '[').replace(/\}/g, ']');
                const parsedData = JSON.parse(validJson);

                if (Array.isArray(parsedData)) {
                    result.data = parsedData.map(row => {
                        if (Array.isArray(row)) {
                            return row.map(cell => String(cell));
                        }
                        return [String(row)];
                    });
                }
            } catch (e) {
                console.error("Error parsing data row:", e);
                // Fallback or leave empty?
            }
        }
        else if (trimmed.startsWith('postdata,')) {
            result.postdata = trimmed.substring(9).trim();
        }
        else if (trimmed.startsWith('finaly,') || trimmed.startsWith('final,')) {
            // handle both 'finaly,' (typo in server output) and correct 'final,'
            const prefix = trimmed.startsWith('finaly,') ? 'finaly,' : 'final,';
            result.finaly = trimmed.substring(prefix.length).trim();
        }
    });

    // If we failed to parse anything structured, treat the whole cleaned string as predata
    // but only if we didn't extract inner output successfully initially
    if (!result.predata && !result.header && !result.data && !result.postdata && !result.finaly) {
        // If we extracted "output" string successfully, use that as predata
        // Otherwise use original response
        result.predata = contentToParse;
    }

    return result;
};
