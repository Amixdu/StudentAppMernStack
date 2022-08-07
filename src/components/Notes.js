import React, { useEffect, useState } from 'react'
import { useJwt } from "react-jwt";
import { Link, useNavigate } from 'react-router-dom'
import { Modal, Form, Alert, Container, Card } from 'react-bootstrap'

export default function Notes() {
  const [notes, setNotes] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [showUpdateModal, setShowUpdateModal] = useState()
  const [clikedNoteTitle, setClikedNoteTitle] = useState()
  const [clikedNoteDescription, setClikedNoteDescription] = useState()

  const navigate = useNavigate()
  
  const getNotes = async () => {
    const req = await fetch('http://localhost:8000/api/notes', {
      headers:{
        'x-access-token': localStorage.getItem('token')
      }
    })

    const data = await req.json()
    if (data.status == 'ok'){
      setNotes(data.notes)
      console.log('HELLO')
    }
    else{
      console.log('BYE')
      navigate('/login')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token){
      navigate('/login')
    }
    else{
      console.log("sdbghabsdhgbsdhgh")
      getNotes()
    }
  }, [])

  return (
    <div>{notes || 'No Notes' }</div>
  )
}
