import { Message } from "@/types/chat"
import { cn } from "@/lib/utils"
import { MessageTable } from "./MessageTable"
import { Badge } from "@/components/ui/badge"

interface MessageBubbleProps {
    message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === "user"

    return (
        <div
            className={cn(
                "flex w-full mb-4",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[85%] rounded-lg p-4",
                    isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground border"
                )}
            >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {!isUser && message.parsedData ? (
                        <div className="space-y-4">
                            {message.parsedData.predata && <p>{message.parsedData.predata}</p>}
                            {(message.parsedData.header || message.parsedData.data) && (
                                <MessageTable header={message.parsedData.header} data={message.parsedData.data} />
                            )}
                            {message.parsedData.postdata && <p className="text-muted-foreground italic text-xs mt-2">{message.parsedData.postdata}</p>}
                            {message.parsedData.finaly && <Badge variant="outline">{message.parsedData.finaly}</Badge>}
                        </div>
                    ) : (
                        message.content
                    )}
                </div>

                {message.isError && (
                    <p className="text-destructive font-bold mt-2">Error sending message</p>
                )}
                <span className={cn("text-[10px] opacity-70 mt-1 block", isUser ? "text-primary-foreground" : "text-muted-foreground")}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                </span>
            </div>
        </div>
    )
}
