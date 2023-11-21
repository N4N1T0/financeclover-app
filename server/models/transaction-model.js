import mongoose from "mongoose";
import { loadType } from 'mongoose-currency'

const Schema = mongoose.Schema
loadType(mongoose)

const TransactionSchema = new Schema({
  buyer: String,
  amount: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
  },
  productIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductModel'
    }
  ]
},
{ 
  toJSON: { getters: true }, timestamps: true
}
)

const TransactionModel = mongoose.model('TransactionModel', TransactionSchema)

export default TransactionModel