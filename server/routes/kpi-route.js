import { Router } from 'express'
import KpiModel from '../models/kpis-model.js'

const router = Router()

router.get('/kpis', async (req, res) => {
  try {
    const kpis = await KpiModel.find()
    res.status(200).json(kpis)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

export default router