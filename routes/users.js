import express from 'express'

import { createUser, loginUser, addUserInfo, getUsers, userAuthenticate } from '../controllers/users.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/auth', userAuthenticate)
router.post('/create', createUser)
router.post('/login', loginUser)
router.post('/add-info', addUserInfo)

export default router