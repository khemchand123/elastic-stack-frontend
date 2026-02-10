'use client'

import { useState } from 'react'
import { IndexDropdown } from '@/components/IndexDropdown'
import { ChatContainer } from '@/components/Chat/ChatContainer'
import { InputBar } from '@/components/InputBar'
import { useIndices } from '@/hooks/useIndices'
import { useMCPChat } from '@/hooks/useMCPChat'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
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
    <main className="flex h-[100dvh] flex-col bg-background">
      {/* Header - Always visible */}
      <header className="flex-none h-14 flex items-center justify-between border-b px-4 lg:px-6 bg-card z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl text-primary">ElasticStack</span>
          <span className="font-medium text-muted-foreground hidden sm:inline-block">Explorer</span>
        </div>

        <div className="flex items-center gap-2">
          <IndexDropdown
            allIndices={allIndices}
            selectedIndices={selectedIndices}
            onSelectionChange={setSelectedIndices}
            isLoading={isIndicesLoading}
          />
          <Button variant="ghost" size="icon" onClick={clearChat} title="Clear Chat">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative min-h-0">

        {hasMessages ? (
          // Active Chat Layout: Scrollable messages + Fixed Input at bottom
          <>
            <div className="flex-1 min-h-0">
              <ChatContainer messages={messages} isLoading={isLoading} />
            </div>
            <div className="flex-none w-full max-w-4xl mx-auto">
              <InputBar onSend={handleSend} isLoading={isLoading} />
            </div>
          </>
        ) : (
          // Empty State Layout: Centered Content
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl space-y-8 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                  ElasticStack Explorer
                </h1>
                <p className="text-muted-foreground text-lg">
                  Query your Elasticsearch indices with natural language.
                </p>
              </div>

              <div className="w-full">
                <InputBar onSend={handleSend} isLoading={isLoading} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto pt-8">
                <div className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors cursor-pointer" onClick={() => handleSend("count indices")}>
                  <h3 className="font-medium mb-1">Count Indices</h3>
                  <p className="text-sm text-muted-foreground">Get a total count of all available indices.</p>
                </div>
                <div className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors cursor-pointer" onClick={() => handleSend("list indices starting with xmpp")}>
                  <h3 className="font-medium mb-1">Search Indices</h3>
                  <p className="text-sm text-muted-foreground">Find indices matching specific patterns.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
