import * as React from "react"
import { SendHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface InputBarProps {
    onSend: (text: string) => void
    isLoading?: boolean
}

export function InputBar({ onSend, isLoading }: InputBarProps) {
    const [input, setInput] = React.useState("")

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleSend = () => {
        if (input.trim() && !isLoading) {
            onSend(input)
            setInput("")
        }
    }

    return (
        <div className="p-4 bg-background border-t">
            <div className="relative flex items-center max-w-4xl mx-auto">
                <Textarea
                    placeholder="Ask a question about your data... (Ctrl+Enter to send)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                            handleSend();
                        }
                    }}
                    className="pr-14 min-h-[60px] py-4 resize-none rounded-xl shadow-md border-muted-foreground/20 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary/50 text-base"
                    disabled={isLoading}
                />
                <Button
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 shrink-0 rounded-lg"
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                >
                    <SendHorizontal className="h-5 w-5" />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
                AI can make mistakes. Please verify important information.
            </p>
        </div>
    )
}
