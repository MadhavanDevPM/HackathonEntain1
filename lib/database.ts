// Mock database implementation for demo purposes
// In a real application, you would connect to your actual data warehouse

interface Customer {
  customer_id: number
  customer_name: string
  segment: string
  country: string
  signup_date: string
}

interface Order {
  order_id: number
  customer_id: number
  product_id: number
  order_date: string
  quantity: number
  unit_price: number
  total_amount: number
}

interface Product {
  product_id: number
  product_name: string
  category: string
  cost: number
  price: number
}

// Mock data
const customers: Customer[] = [
  { customer_id: 1, customer_name: "Acme Corp", segment: "Enterprise", country: "USA", signup_date: "2023-01-15" },
  { customer_id: 2, customer_name: "TechStart Inc", segment: "SMB", country: "Canada", signup_date: "2023-02-20" },
  {
    customer_id: 3,
    customer_name: "Global Solutions",
    segment: "Enterprise",
    country: "UK",
    signup_date: "2023-03-10",
  },
  { customer_id: 4, customer_name: "Local Business", segment: "SMB", country: "USA", signup_date: "2023-04-05" },
  {
    customer_id: 5,
    customer_name: "Innovation Labs",
    segment: "Startup",
    country: "Germany",
    signup_date: "2023-05-12",
  },
]

const products: Product[] = [
  { product_id: 1, product_name: "Analytics Pro", category: "Software", cost: 50, price: 199 },
  { product_id: 2, product_name: "Data Insights", category: "Software", cost: 30, price: 99 },
  { product_id: 3, product_name: "Business Suite", category: "Software", cost: 100, price: 499 },
  { product_id: 4, product_name: "Starter Pack", category: "Software", cost: 20, price: 49 },
]

const orders: Order[] = [
  {
    order_id: 1,
    customer_id: 1,
    product_id: 1,
    order_date: "2023-06-01",
    quantity: 5,
    unit_price: 199,
    total_amount: 995,
  },
  {
    order_id: 2,
    customer_id: 2,
    product_id: 2,
    order_date: "2023-06-15",
    quantity: 2,
    unit_price: 99,
    total_amount: 198,
  },
  {
    order_id: 3,
    customer_id: 1,
    product_id: 3,
    order_date: "2023-07-01",
    quantity: 1,
    unit_price: 499,
    total_amount: 499,
  },
  {
    order_id: 4,
    customer_id: 3,
    product_id: 1,
    order_date: "2023-07-10",
    quantity: 10,
    unit_price: 199,
    total_amount: 1990,
  },
  {
    order_id: 5,
    customer_id: 4,
    product_id: 4,
    order_date: "2023-08-01",
    quantity: 3,
    unit_price: 49,
    total_amount: 147,
  },
  {
    order_id: 6,
    customer_id: 2,
    product_id: 3,
    order_date: "2023-08-15",
    quantity: 2,
    unit_price: 499,
    total_amount: 998,
  },
  {
    order_id: 7,
    customer_id: 5,
    product_id: 2,
    order_date: "2023-09-01",
    quantity: 1,
    unit_price: 99,
    total_amount: 99,
  },
  {
    order_id: 8,
    customer_id: 3,
    product_id: 4,
    order_date: "2023-09-15",
    quantity: 5,
    unit_price: 49,
    total_amount: 245,
  },
]

export function getTableSchema(): string {
  return `
CUSTOMERS table:
- customer_id (INTEGER): Unique customer identifier
- customer_name (TEXT): Customer company name
- segment (TEXT): Customer segment (Enterprise, SMB, Startup)
- country (TEXT): Customer country
- signup_date (DATE): When customer signed up

ORDERS table:
- order_id (INTEGER): Unique order identifier
- customer_id (INTEGER): References customers.customer_id
- product_id (INTEGER): References products.product_id
- order_date (DATE): When order was placed
- quantity (INTEGER): Number of items ordered
- unit_price (DECIMAL): Price per unit
- total_amount (DECIMAL): Total order value

PRODUCTS table:
- product_id (INTEGER): Unique product identifier
- product_name (TEXT): Product name
- category (TEXT): Product category
- cost (DECIMAL): Product cost
- price (DECIMAL): Product selling price
`
}

export async function executeQuery(query: string): Promise<any[]> {
  // Simple SQL parser for demo purposes
  // In a real application, you would use a proper SQL database

  const normalizedQuery = query.toLowerCase().trim()

  try {
    // Handle SELECT queries
    if (normalizedQuery.startsWith("select")) {
      return executeSelectQuery(query)
    }

    throw new Error("Only SELECT queries are supported in this demo")
  } catch (error) {
    throw new Error(`Query execution failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

function executeSelectQuery(query: string): any[] {
  const normalizedQuery = query.toLowerCase()

  // Simple pattern matching for common queries
  if (normalizedQuery.includes("customers") && normalizedQuery.includes("revenue")) {
    // Top customers by revenue
    const customerRevenue = customers
      .map((customer) => {
        const customerOrders = orders.filter((order) => order.customer_id === customer.customer_id)
        const totalRevenue = customerOrders.reduce((sum, order) => sum + order.total_amount, 0)
        return {
          customer_name: customer.customer_name,
          segment: customer.segment,
          total_revenue: totalRevenue,
          order_count: customerOrders.length,
        }
      })
      .sort((a, b) => b.total_revenue - a.total_revenue)

    return normalizedQuery.includes("limit 5") || normalizedQuery.includes("top 5")
      ? customerRevenue.slice(0, 5)
      : customerRevenue
  }

  if (normalizedQuery.includes("monthly") && normalizedQuery.includes("sales")) {
    // Monthly sales trends
    const monthlySales = orders.reduce(
      (acc, order) => {
        const month = order.order_date.substring(0, 7) // YYYY-MM
        acc[month] = (acc[month] || 0) + order.total_amount
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(monthlySales)
      .map(([month, sales]) => ({ month, sales }))
      .sort((a, b) => a.month.localeCompare(b.month))
  }

  if (normalizedQuery.includes("products") && normalizedQuery.includes("profit")) {
    // Product profit margins
    return products
      .map((product) => ({
        product_name: product.product_name,
        category: product.category,
        cost: product.cost,
        price: product.price,
        profit_margin: (((product.price - product.cost) / product.price) * 100).toFixed(2) + "%",
        profit_amount: product.price - product.cost,
      }))
      .sort((a, b) => b.profit_amount - a.profit_amount)
  }

  if (
    normalizedQuery.includes("new customers") ||
    (normalizedQuery.includes("customer") && normalizedQuery.includes("quarter"))
  ) {
    // New customers by quarter
    const quarterCustomers = customers.reduce(
      (acc, customer) => {
        const date = new Date(customer.signup_date)
        const quarter = `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`
        acc[quarter] = (acc[quarter] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(quarterCustomers).map(([quarter, count]) => ({ quarter, new_customers: count }))
  }

  if (normalizedQuery.includes("average order value") || normalizedQuery.includes("aov")) {
    // Average order value by segment
    const segmentAOV = customers.reduce(
      (acc, customer) => {
        const customerOrders = orders.filter((order) => order.customer_id === customer.customer_id)
        if (customerOrders.length > 0) {
          const totalValue = customerOrders.reduce((sum, order) => sum + order.total_amount, 0)
          const avgValue = totalValue / customerOrders.length

          if (!acc[customer.segment]) {
            acc[customer.segment] = { total: 0, count: 0 }
          }
          acc[customer.segment].total += avgValue
          acc[customer.segment].count += 1
        }
        return acc
      },
      {} as Record<string, { total: number; count: number }>,
    )

    return Object.entries(segmentAOV).map(([segment, data]) => ({
      segment,
      average_order_value: Math.round(data.total / data.count),
    }))
  }

  // Default fallback - return sample data
  return [
    { message: "Query executed successfully", note: "This is a demo with limited query parsing" },
    { available_queries: "Try asking about customers, revenue, products, or sales trends" },
  ]
}
