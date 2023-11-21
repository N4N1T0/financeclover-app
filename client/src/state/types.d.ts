export interface GetKpisResponse {
  id: string
  _id: string
  __v: number
  totalProfit: number
  totalRevenue: number
  totalExpenses: number
  expensesByCategory: ExpensesByCategory
  monthlyData: Array<MonthyData>
  dailyData: Array<DailyData>
  created_at: string
  updatedAt: string
}

export interface ExpensesByCategory {
  salaries: number
  supplies: number
  services: number
}

export interface MonthyData {
  id: string
  month: string
  revenue: number
  expenses: number
  nonOperationalExpenses: number
  operationalExpenses: number
}

export interface DailyData {
  id: string
  month: string
  revenue: number
  expenses: number
}

export interface GetProductsResponse {
  id: string
  _id: string
  __v: number
  price: number
  expense: number
  transaction: number
  expensesByCategory: Array<string>
  createdt: string
  updatedAt: string
}

export interface GetTransactionsResponse {
   id: string
  _id: string
  __v: number
  buyer: number
  amount: number
  productIds: Array<string>
  createdt: string
  updatedAt: string
}