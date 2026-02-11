import * as React from "react"
import { Check, ChevronsUpDown, X, Database, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface IndexSelectorProps {
    allIndices: string[]
    selectedIndices: string[]
    onSelectionChange: (indices: string[]) => void
    isLoading?: boolean
}

export function IndexSelector({ allIndices, selectedIndices, onSelectionChange, isLoading }: IndexSelectorProps) {
    const [open, setOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredIndices = React.useMemo(() => {
        if (!searchQuery) return allIndices
        return allIndices.filter(index =>
            index.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [allIndices, searchQuery])

    // Grouping logic for better organization
    const groupedIndices = React.useMemo(() => {
        const groups: Record<string, string[]> = {}
        filteredIndices.forEach(index => {
            // Group by prefix (part before first separator)
            const prefix = index.split(/[-_.]/)[0]
            const groupKey = prefix.length > 1 ? prefix : "Other"
            if (!groups[groupKey]) groups[groupKey] = []
            groups[groupKey].push(index)
        })
        return groups
    }, [filteredIndices])

    const toggleSelection = (index: string) => {
        if (selectedIndices.includes(index)) {
            onSelectionChange(selectedIndices.filter((i) => i !== index))
        } else {
            onSelectionChange([...selectedIndices, index])
        }
    }

    const clearSelection = (e: React.MouseEvent) => {
        e.stopPropagation()
        onSelectionChange([])
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-[280px] justify-between border-dashed hover:border-solid transition-all",
                        selectedIndices.length > 0 && "border-primary/50 bg-primary/5 text-primary"
                    )}
                    disabled={isLoading}
                >
                    <div className="flex items-center gap-2 truncate">
                        <Database className="h-4 w-4 shrink-0 opacity-50" />
                        <span className="truncate">
                            {selectedIndices.length === 0
                                ? "Select indices (All)"
                                : `${selectedIndices.length} selected`}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        {selectedIndices.length > 0 && (
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={clearSelection}
                                className="mr-1 rounded-full p-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </div>
                        )}
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-0" align="end">
                <Command shouldFilter={false}>
                    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <input
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Search indices..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <CommandList>
                        <ScrollArea className="h-[300px]">
                            {filteredIndices.length === 0 && (
                                <div className="py-6 text-center text-sm">No indices found.</div>
                            )}

                            {/* "All Indices" toggle when nothing is searched */}
                            {!searchQuery && (
                                <CommandGroup>
                                    <CommandItem
                                        value="__all__"
                                        onSelect={() => onSelectionChange([])}
                                        className="font-medium"
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                selectedIndices.length === 0
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <Check className={cn("h-4 w-4")} />
                                        </div>
                                        <span>Select All (Default)</span>
                                        {selectedIndices.length === 0 && (
                                            <Badge variant="secondary" className="ml-auto text-xs h-5">
                                                Active
                                            </Badge>
                                        )}
                                    </CommandItem>
                                </CommandGroup>
                            )}

                            {Object.entries(groupedIndices).sort().map(([prefix, indices]) => (
                                <CommandGroup key={prefix} heading={`${prefix.toUpperCase()} (${indices.length})`}>
                                    {indices.map((index) => {
                                        const isSelected = selectedIndices.includes(index)
                                        return (
                                            <CommandItem
                                                key={index}
                                                value={index}
                                                onSelect={() => toggleSelection(index)}
                                            >
                                                <div
                                                    className={cn(
                                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                        isSelected
                                                            ? "bg-primary text-primary-foreground"
                                                            : "opacity-50 [&_svg]:invisible"
                                                    )}
                                                >
                                                    <Check className={cn("h-4 w-4")} />
                                                </div>
                                                <span className="truncate">{index}</span>
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            ))}
                        </ScrollArea>
                    </CommandList>

                    {selectedIndices.length > 0 && (
                        <div className="p-2 border-t bg-muted/30">
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-full h-8 text-xs"
                                onClick={() => onSelectionChange([])}
                            >
                                Clear Selection ({selectedIndices.length})
                            </Button>
                        </div>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    )
}
