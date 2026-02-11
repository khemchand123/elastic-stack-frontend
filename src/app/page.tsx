'use client'

import { useState } from 'react'
import { IndexSelector } from '@/components/IndexSelector'
import { ChatContainer } from '@/components/Chat/ChatContainer'
import { InputBar } from '@/components/InputBar'
import { useIndices } from '@/hooks/useIndices'
import { useMCPChat } from '@/hooks/useMCPChat'
import { Button } from '@/components/ui/button'
import { Trash2, MessageSquare, Database, Sparkles, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Home() {
  const { data: allIndices = [], isLoading: isIndicesLoading } = useIndices()
  const { messages, sendMessage, isLoading, clearChat } = useMCPChat()
  const [selectedIndices, setSelectedIndices] = useState<string[]>([])

  const handleSend = (text: string) => {
    const indicesString = selectedIndices.length > 0 ? selectedIndices.join(',') : undefined;
    sendMessage(text, indicesString);
  }

  const hasMessages = messages.length > 0;

  return (
    <main className="flex h-[100dvh] flex-col bg-background overflow-hidden font-sans">
      {/* Premium Header */}
      <header className="flex-none h-16 flex items-center justify-between border-b px-6 bg-card/80 backdrop-blur-md z-20 shadow-sm relative">
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-foreground flex items-center gap-2">
              ElasticStack <span className="text-muted-foreground font-normal">MCP</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center text-xs text-muted-foreground mr-2 bg-muted/50 px-3 py-1 rounded-full border border-border/50">
            <Database className="h-3 w-3 mr-1.5" />
            {allIndices.length} Indices Available
          </div>

          <IndexSelector
            allIndices={allIndices}
            selectedIndices={selectedIndices}
            onSelectionChange={setSelectedIndices}
            isLoading={isIndicesLoading}
          />

          <div className="h-6 w-[1px] bg-border/50 mx-1"></div>

          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
            title="Clear Chat"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative min-h-0 overflow-hidden bg-gradient-to-b from-background to-muted/20">

        {hasMessages ? (
          // Active Chat Layout
          <>
            <div className="flex-1 min-h-0 overflow-hidden relative">
              <ChatContainer messages={messages} isLoading={isLoading} />
            </div>
            <div className="flex-none w-full bg-background/80 backdrop-blur-xl border-t z-30 pt-4 pb-6 px-4 shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.05)]">
              <div className="max-w-4xl mx-auto">
                <InputBar onSend={handleSend} isLoading={isLoading} />
              </div>
            </div>
          </>
        ) : (
          // Enhanced Empty State Layout
          <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
            <div className="w-full max-w-2xl text-center space-y-10">

              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/5 border border-primary/10 shadow-xl shadow-primary/5 mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50"></div>
                  <MessageSquare className="h-10 w-10 text-primary relative z-10" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                  How can I help you?
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  Query your Elasticsearch data using natural language. Select indices to narrow down your search or query across everything.
                </p>
              </div>

              <div className="w-full transform transition-all hover:scale-[1.01]">
                {/* Input placeholder simulation or actual input */}
                <div className="relative">
                  <InputBar onSend={handleSend} isLoading={isLoading} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-4">
                <button
                  onClick={() => handleSend("count indices")}
                  className="group relative p-5 rounded-2xl border bg-card hover:bg-accent/5 hover:border-primary/30 transition-all duration-300 text-left shadow-sm hover:shadow-md"
                >
                  <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Count Indices</h3>
                  <p className="text-sm text-muted-foreground">Get a total count of all available indices in the cluster.</p>
                </button>

                <button
                  onClick={() => handleSend("list indices starting with xmpp")}
                  className="group relative p-5 rounded-2xl border bg-card hover:bg-accent/5 hover:border-primary/30 transition-all duration-300 text-left shadow-sm hover:shadow-md"
                >
                  <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Search className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Search Indices</h3>
                  <p className="text-sm text-muted-foreground">Find indices matching specific patterns like "xmpp".</p>
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </main>
  )
}
