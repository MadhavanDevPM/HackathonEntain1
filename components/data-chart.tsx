import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface DataChartProps {
  data: any[]
}

export function DataChart({ data }: DataChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-400 py-8">No data to visualize</div>
  }

  const columns = Object.keys(data[0])
  const numericColumns = columns.filter((col) => data.some((row) => typeof row[col] === "number" && row[col] !== null))
  const textColumns = columns.filter((col) => data.some((row) => typeof row[col] === "string" && row[col] !== null))

  // Determine chart type based on data structure
  const getChartType = () => {
    if (numericColumns.length >= 2) return "scatter"
    if (numericColumns.length === 1 && textColumns.length >= 1) {
      if (data.length <= 10) return "pie"
      return "bar"
    }
    if (textColumns.some((col) => col.toLowerCase().includes("date") || col.toLowerCase().includes("month"))) {
      return "line"
    }
    return "bar"
  }

  const chartType = getChartType()
  const xKey = textColumns[0] || columns[0]
  const yKey = numericColumns[0] || columns[1]

  // Dark mode friendly colors
  const colors = ["#60a5fa", "#f87171", "#34d399", "#fbbf24", "#a78bfa", "#22d3ee", "#a3e635", "#fb923c"]

  const renderChart = () => {
    switch (chartType) {
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={yKey}
                nameKey={xKey}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => [new Intl.NumberFormat().format(value), yKey]}
                contentStyle={{
                  backgroundColor: "#374151",
                  border: "1px solid #4b5563",
                  borderRadius: "6px",
                  color: "#f3f4f6",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey={xKey} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                formatter={(value: any) => [new Intl.NumberFormat().format(value), yKey]}
                contentStyle={{
                  backgroundColor: "#374151",
                  border: "1px solid #4b5563",
                  borderRadius: "6px",
                  color: "#f3f4f6",
                }}
              />
              <Line type="monotone" dataKey={yKey} stroke="#60a5fa" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )

      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey={xKey} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                formatter={(value: any) => [new Intl.NumberFormat().format(value), yKey]}
                contentStyle={{
                  backgroundColor: "#374151",
                  border: "1px solid #4b5563",
                  borderRadius: "6px",
                  color: "#f3f4f6",
                }}
              />
              <Bar dataKey={yKey} fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        )
    }
  }

  return <div className="w-full">{renderChart()}</div>
}
