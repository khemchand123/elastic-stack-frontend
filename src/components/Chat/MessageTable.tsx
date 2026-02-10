import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MessageTableProps {
    header?: string[]
    data?: string[][]
}

export function MessageTable({ header, data }: MessageTableProps) {
    if (!data || data.length === 0) return null

    return (
        <div className="rounded-md border my-2 bg-card">
            <ScrollArea className="h-[300px] w-full">
                <Table>
                    {header && (
                        <TableHeader>
                            <TableRow>
                                {header.map((head, i) => (
                                    <TableHead key={i} className="whitespace-nowrap keep-all px-4 py-2">{head}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                    )}
                    <TableBody>
                        {data.map((row, i) => (
                            <TableRow key={i}>
                                {row.map((cell, j) => (
                                    <TableCell key={j} className="whitespace-nowrap px-4 py-2">
                                        {cell}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}
