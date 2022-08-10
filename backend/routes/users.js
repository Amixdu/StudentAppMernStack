import express from 'express'
import { createUser, loginUser, addUserInfo, getUsers, userAuthenticate, getFilteredUsers } from '../controllers/users.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/filtered', getFilteredUsers)
router.get('/auth', userAuthenticate)
router.post('/create', createUser)
router.post('/login', loginUser)
router.post('/add-info', addUserInfo)
router.get('/forgot-password', userAuthenticate)

export default router