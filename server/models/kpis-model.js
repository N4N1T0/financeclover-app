import mongoose from "mongoose";
import { loadType } from 'mongoose-currency'

const Schema = mongoose.Schema
loadType(mongoose)

// Monthly Schema
const monthlySchema = new Schema({
  month: String,
  revenue: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
  },
  expenses: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
  },
  operationalExpenses: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
  },
  nonOperationalExpenses: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
  }
},
{ toJSON: {
  getters: true
}}
)

// Daily Schema
const dayliSchema = new Schema({
  date: String,
  revenue: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
  },
  expenses: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
  }
},
{ toJSON: {
  getters: true
}})

const KpiSchema = new Schema({
    totalProfit: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
    },
    totalRevenue: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
    },
    totalExpenses: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
    },
    expensesByCategory: {
      type: Map,
      of: {
        type: mongoose.Types.Currency,
        currency: 'USD',
        get: (v) => v / 100
      }
    },
    monthlyData: [monthlySchema],
    dailyData: [dayliSchema]
},
{
  toJSON: { getters: true }, timestamps: true
}
)

const KpiModel = mongoose.model('KpiModel', KpiSchema)

export default KpiModel