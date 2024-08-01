import { Router } from 'express'
import { get } from '../controller/category'

const router = Router()

router.get('/', get)

export default router
