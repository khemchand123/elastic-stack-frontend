import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendMessageToMCP } from '@/services/mcpService';
import { Message } from '@/types/chat';
import { parseMCPResponse } from '@/utils/parser';

export const useMCPChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const mutation = useMutation({
        mutationFn: sendMessageToMCP,
        onSuccess: (data) => {
            let parsed;
            try {
                parsed = parseMCPResponse(data);
            } catch (e) {
                console.error("Parsing error", e);
                parsed = { predata: data };
            }

            const assistantMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: data,
                parsedData: parsed,
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
        },
        onError: (error) => {
            const errorMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: 'Error: Failed to process request. Please try again.',
                timestamp: Date.now(),
                isError: true,
            };
            setMessages((prev) => [...prev, errorMessage]);
        }
    });

    const sendMessage = (content: string, indices?: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, userMessage]);
        mutation.mutate({ chatInput: content, indices });
    };

    const clearChat = () => {
        setMessages([]);
    };

    return {
        messages,
        sendMessage,
        clearChat,
        isLoading: mutation.isPending
    };
};
