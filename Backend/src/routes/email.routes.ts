import {Router} from 'express'
const router = Router()

import { sendEmailFeedback } from '../controllers/email.controller'
import authMiddleware from '../middlewares/auth.middleware'

router.post('/send',authMiddleware, sendEmailFeedback)

export default router

