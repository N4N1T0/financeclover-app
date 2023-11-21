import mongoose from "mongoose";
import { loadType } from 'mongoose-currency'

const Schema = mongoose.Schema
loadType(mongoose)

const ProductSchema = new Schema({
  price: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
  },
  expense: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100
  },
  transaction: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TransactionModel'
    }
  ]
},
{ 
  toJSON: { getters: true }, timestamps: true
}
)

const ProductModel = mongoose.model('ProductModel', ProductSchema)

export default ProductModel