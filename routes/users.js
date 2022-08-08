import express from 'express'

import { createUser, loginUser, updateUser } from '../controllers/users.js'

const router = express.Router()

router.post('/create', createUser)
router.post('/login', loginUser)
router.post('/update', updateUser)

export default router