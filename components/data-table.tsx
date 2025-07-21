import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DataTableProps {
  data: any[]
}

export function DataTable({ data }: DataTableProps) {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-400 py-4">No data to display</div>
  }

  const columns = Object.keys(data[0])

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return "N/A"
    if (typeof value === "number") {
      // Format currency if it looks like a monetary value
      if (
        value > 1000 &&
        columns.some(
          (col) =>
            col.toLowerCase().includes("revenue") ||
            col.toLowerCase().includes("price") ||
            col.toLowerCase().includes("amount"),
        )
      ) {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
      }
      return new Intl.NumberFormat("en-US").format(value)
    }
    return String(value)
  }

  return (
    <div className="rounded-md border border-gray-600 max-h-96 overflow-auto bg-gray-900">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-600 hover:bg-gray-800">
            {columns.map((column) => (
              <TableHead key={column} className="font-semibold text-gray-200 bg-gray-800">
                {column.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} className="border-gray-700 hover:bg-gray-800">
              {columns.map((column) => (
                <TableCell key={column} className="text-gray-300">
                  {formatValue(row[column])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
