export interface ParsedData {
    predata?: string;
    header?: string[];
    data?: string[][]; // Table rows
    postdata?: string; // Summary or footer
    finaly?: string;
}

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string; // The raw content
    parsedData?: ParsedData; // The structured data if available
    timestamp: number;
    isLoading?: boolean;
    isError?: boolean;
}

export interface ChatState {
    messages: Message[];
    isTyping: boolean;
}
