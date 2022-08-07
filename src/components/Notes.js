import React, { useEffect, useState, useRef } from 'react'
import { useJwt } from "react-jwt";
import { Link, useNavigate } from 'react-router-dom'
import { Modal, Button, Form, Alert, Container, Card } from 'react-bootstrap'
import Loader from './Loader'
import "./Notes.css"

export default function Notes() {
  const titleRef = useRef()
  const descriptionRef = useRef()

  const [fetchedNotes, setFetchedNotes] = useState()
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
        title: newNoteTitle,
        description: newNoteDescription
      })
    })

    const data = await req.json()
    if (data.status == 'ok'){
      setFetchedNotes(data.notes)
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
      setFetchedNotes(data.notes.length > 0 ? data.notes : 'Empty')
      
      // console.log(data.notes)
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
      {
        fetchedNotes ?
        (
          fetchedNotes !== 'Empty' ? (
            <>
              <div className='box'>
                <h2 style={{ fontSize:'50px', fontWeight:"bold", fontFamily:"Georgia, serif" }}>Notes</h2>
                {/* <div className='buttonRight'> */}
                    <Link to="/login" className='btn btn-primary'>Log Out</Link>
                    {'  '}
                    <Button onClick={() => handleAddModalShow()} className=''>Add Notes</Button>
                {/* </div> */}
              </div> 

              <div className='mt-4'>
                {
                  Object.entries(fetchedNotes).map((note) => {
                    const [key, value] = note
                    return (
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            <p style={{ fontSize:'30px', display:'inline-block' }}>{value.title}</p>
                          </Card.Title>

                          <Card.Text>
                            <p style={{ fontSize:'20px', display:'inline-block' }}>{value.description}</p>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    )
                  })
                }
              </div>
            </>
          ) : 
          (
            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "95vh" }}>
              <div>
                  <p style={{ fontSize:'35px' }}> No Notes Available </p>
                  <Link to="/home" className='btn btn-primary'>Go Back</Link>
                  {'  '}
                  <Button onClick={() => handleAddModalShow()} className=''>Add Notes</Button>
              </div>
            </Container>
          )
        ) : <Loader />
      }
      

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
