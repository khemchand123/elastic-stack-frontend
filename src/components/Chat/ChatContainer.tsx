import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "./MessageBubble"
import { Message } from "@/types/chat"

interface ChatContainerProps {
    messages: Message[]
    isLoading?: boolean
}

export function ChatContainer({ messages, isLoading }: ChatContainerProps) {
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const bottomRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        // Scroll to bottom whenever messages change
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading])

    // If no messages, we render nothing here (handled by page.tsx for centered layout)
    if (messages.length === 0) return null;

    return (
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto min-h-0">
            <ScrollArea className="flex-1 w-full">
                <div className="p-4 space-y-6 pb-24">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-muted text-foreground rounded-lg p-4 border animate-pulse text-sm">
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} className="h-1" />
                </div>
            </ScrollArea>
        </div>
    )
}
