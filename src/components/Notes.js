import React, { useEffect, useState, useRef } from 'react'
import { useJwt } from "react-jwt";
import { Link, useNavigate } from 'react-router-dom'
import { Modal, Button, Form, Alert, Container, Card } from 'react-bootstrap'
import Loader from './Loader'

export default function Notes() {
  const titleRef = useRef()
  const descriptionRef = useRef()

  const [notes, setNotes] = useState()
  const [newNoteTitle, setNewNoteTitle] = useState()
  const [newNoteDescription, setNewNoteDescription] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  
  const [clikedNoteTitle, setClikedNoteTitle] = useState()
  const [clikedNoteDescription, setClikedNoteDescription] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [reload, setReload] = useState(false)

  const [showAddModal, setShowAddModal] = useState()
  const [showUpdateModal, setShowUpdateModal] = useState()
  const [showDeleteModal, setShowDeleteModal] = useState()

  const navigate = useNavigate()

  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true)

  const handleAdd = async () => {
    const req = await fetch('http://localhost:8000/notes', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        newTitle: newNoteTitle,
        newDescription: newNoteDescription
      })
    })

    const data = await req.json()
    if (data.status == 'ok'){
      setNotes(data.notes)
      console.log('Note Added Successfully')
    }
    else{
      console.log('There was an error in adding the note')
    }
  }

  const handleUpdate = async () => {

  }

  const handleDelete = async () => {

  }
  
  const getNotes = async () => {
    const req = await fetch('http://localhost:8000/notes', {
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
    <>
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "95vh" }}>
        <div>
            <p style={{ fontSize:'35px' }}> No Notes Available </p>
            <Link to="/home" className='btn btn-primary'>Go Back</Link>
            {'  '}
            <Button onClick={() => handleAddModalShow()} className=''>Add Notes</Button>
        </div>
      </Container>

      <Modal show={showAddModal} onHide={handleAddModalClose}>
          {loading && <Loader backgCol={'light'}/>}
          <Modal.Header closeButton>
              <Modal.Title style={{ textAlign:"center" }}> Add Notes</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              {error && <Alert variant='danger'>{error}</Alert>}

              <Form onSubmit={handleAdd}>
                <Form.Group id="name" className='mb-3'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" onChange={(e) => {setNewNoteTitle(e.target.value)}} required ></Form.Control>
                </Form.Group>

                <Form.Group id="description" className='mb-3'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={(e) => {setNewNoteDescription(e.target.value)}} required ></Form.Control>
                </Form.Group>

                <Button disabled={loading} className='w-100' type="submit">
                  Add
                </Button>
              </Form>

          </Modal.Body>
      </Modal>
    </>
  )
}
