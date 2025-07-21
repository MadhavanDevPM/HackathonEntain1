import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, BarChart3, Table } from "lucide-react"
import { DataTable } from "./data-table"
import { DataChart } from "./data-chart"

interface QueryResultProps {
  result: {
    success: boolean
    results?: any[]
    error?: string
    explanation: string
    query: string
  }
}

export function QueryResult({ result }: QueryResultProps) {
  if (!result.success) {
    return (
      <Alert variant="destructive" className="bg-red-900 border-red-700 text-red-200">
        <XCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Query Error:</strong> {result.error}
        </AlertDescription>
      </Alert>
    )
  }

  const data = result.results || []
  const hasData = data.length > 0

  return (
    <div className="space-y-4">
      <Alert className="bg-green-900 border-green-700 text-green-200">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Query executed successfully!</strong> Found {data.length} result(s).
        </AlertDescription>
      </Alert>

      {hasData && (
        <>
          {/* Chart Visualization */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Data Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataChart data={data} />
            </CardContent>
          </Card>

          {/* Data Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Table className="h-5 w-5 text-blue-400" />
                Raw Data
                <Badge variant="secondary" className="bg-gray-600 text-gray-200">
                  {data.length} rows
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable data={data} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
