export interface MCPRequest {
    chatInput: string;
    indices?: string; // Comma-separated list of indices
}

// The raw response from the webhook is likely text or a JSON object containing text.
// We'll define the expected shape if it's JSON, or handle text.
// Based on prompt, we send JSON, but return format isn't explicitly JSON-structured in a standard way,
// but rather "Extract predata/header/data/postdata/finaly".
// We will assume the API returns a string or a JSON with a content field.
// For now, let's treat the immediate response from Axios as potentially any, but likely we need to handle the structure.

export type MCPResponse = string | { response: string } | { text: string };

export type IndexListResponse = string[];
