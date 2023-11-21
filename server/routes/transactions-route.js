import { Router } from 'express'
import TransactionModel from '../models/transaction-model.js'

const router = Router()

router.get('/transactions', async (req, res) => {
  try {
    const transactions = await TransactionModel.find().limit(50).sort({ createdOn: -1 })
    res.status(200).json(transactions)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

export default router