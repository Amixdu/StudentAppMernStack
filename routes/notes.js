import express from 'express'

import { getNotes, addNotes } from '../controllers/notes.js'

const router = express.Router()

router.get('/', getNotes)
router.post('/', addNotes)

export default router