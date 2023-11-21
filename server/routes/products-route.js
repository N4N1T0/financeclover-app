import { Router } from 'express'
import ProductModel from '../models/product-model.js'

const router = Router()

router.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

export default router