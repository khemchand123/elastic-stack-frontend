import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface IndexDropdownProps {
    allIndices: string[]
    selectedIndices: string[]
    onSelectionChange: (indices: string[]) => void
    isLoading?: boolean
}

export function IndexDropdown({ allIndices, selectedIndices, onSelectionChange, isLoading }: IndexDropdownProps) {
    const [open, setOpen] = React.useState(false)

    // simple grouping logic
    const groupedIndices = React.useMemo(() => {
        const groups: Record<string, string[]> = {}
        allIndices.forEach(index => {
            const prefix = index.split(/[-_]/)[0]
            if (!groups[prefix]) groups[prefix] = []
            groups[prefix].push(index)
        })
        return groups
    }, [allIndices])

    const toggleSelection = (index: string) => {
        if (selectedIndices.includes(index)) {
            onSelectionChange(selectedIndices.filter((i) => i !== index))
        } else {
            onSelectionChange([...selectedIndices, index])
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between"
                    disabled={isLoading}
                >
                    <span className="truncate">
                        {selectedIndices.length === 0
                            ? "Select indices (All)"
                            : `${selectedIndices.length} selected`}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
                <Command>
                    <CommandInput placeholder="Search indices..." />
                    <CommandList>
                        <ScrollArea className="h-[300px]">
                            <CommandEmpty>No index found.</CommandEmpty>
                            <CommandGroup heading="Global">
                                <CommandItem
                                    value="__all__"
                                    onSelect={() => onSelectionChange([])}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedIndices.length === 0 ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    All Indices
                                </CommandItem>
                            </CommandGroup>
                            {Object.entries(groupedIndices).map(([prefix, indices]) => (
                                <CommandGroup key={prefix} heading={prefix.toUpperCase()}>
                                    {indices.map((index) => (
                                        <CommandItem
                                            key={index}
                                            value={index}
                                            onSelect={() => toggleSelection(index)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedIndices.includes(index) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {index}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
