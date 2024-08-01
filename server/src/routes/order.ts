import { Router } from 'express'
import { get, post } from '../controller/order'

const router = Router()

router.get('/', get)
router.post('/add', post)

export default router
