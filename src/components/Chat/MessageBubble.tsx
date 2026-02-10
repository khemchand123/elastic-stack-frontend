import { Message } from "@/types/chat"
import { cn } from "@/lib/utils"
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
                            {message.parsedData.data && (
                                <div className="space-y-3 my-2">
                                    {message.parsedData.data.map((row, i) => (
                                        <div key={i} className="p-3 rounded-md border bg-card/30 space-y-1.5 shadow-sm">
                                            {row.map((cell, j) => (
                                                <div key={j} className="flex flex-col sm:flex-row sm:gap-2 text-xs border-b border-border/40 last:border-0 pb-1 last:pb-0">
                                                    <span className="font-semibold text-muted-foreground sm:min-w-[100px] uppercase tracking-wider text-[10px]">
                                                        {message.parsedData!.header?.[j] || `Field ${j + 1}`}:
                                                    </span>
                                                    <span className="break-all font-mono text-foreground/90">{cell}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
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
