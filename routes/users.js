import express from 'express'

import { createUser, loginUser, addUserInfo } from '../controllers/users.js'

const router = express.Router()

router.post('/create', createUser)
router.post('/login', loginUser)
router.post('/add-info', addUserInfo)

export default router