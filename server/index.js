import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from 'dotenv'
import morgan from "morgan";
import KpisRoute from './routes/kpi-route.js'
import ProductsRoute from './routes/products-route.js'
import TransactionRoute from './routes/transactions-route.js'

// Imports for the Seed
// import KpiModel from "./models/kpis-model.js";
// import ProductModel from "./models/product-model.js";
// import TransactionModel from './models/transaction-model.js'
// import { transactions, products, kpis } from './data/seed.js'

// Configuration
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors())

// Routes Setup
app.use('/kpis', KpisRoute)
app.use('/products', ProductsRoute)
app.use('/transactions', TransactionRoute)

// Mongoose Setup
const PORT = process.env.PORT || 9000
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log('Server Port', PORT))

    // KPIS Seed
    // await mongoose.connection.db.dropDatabase()
    // KpiModel.insertMany(kpis)

    // Products Seed
    // await mongoose.connection.db.dropDatabase()
    // ProductModel.insertMany(products)

    // Transactions Seed
    // await mongoose.connection.db.dropDatabase()
    // TransactionModel.insertMany(transactions)

  })
  .catch((error) => console.log(`${error} did not connect`))