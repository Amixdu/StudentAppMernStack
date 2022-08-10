import express from 'express'

import { getNotes, addNotes, updateNotes, deleteNotes } from '../controllers/notes.js'

const router = express.Router()

router.get('/', getNotes)
router.post('/', addNotes)
router.post('/update', updateNotes)
router.post('/delete', deleteNotes)

export default router