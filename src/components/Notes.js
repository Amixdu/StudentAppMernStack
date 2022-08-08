import React, { useEffect, useState, useRef } from 'react'
import { useJwt } from "react-jwt";
import { Link, useNavigate } from 'react-router-dom'
import { Modal, Button, Form, Alert, Container, Card } from 'react-bootstrap'
import Loader from './Loader'
import LoaderMiddle from './LoaderMiddle';
import "./Notes.css"

export default function Notes() {
  const titleRef = useRef()
  const descriptionRef = useRef()

  const [fetchedNotes, setFetchedNotes] = useState()
  const [newNoteTitle, setNewNoteTitle] = useState()
  const [newNoteDescription, setNewNoteDescription] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  
  const [clickedNoteId, setClickedNoteId] = useState()
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

  const handleAddModalClose = () => setShowAddModal(false)
  const handleAddModalShow = () => setShowAddModal(true)

  const handleRemoveModalClose = () => setShowDeleteModal(false);
  const handleRemoveModalShow = (id) => {
      setClickedNoteId(id)
      setShowDeleteModal(true)
  }

  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleUpdateModalShow = (id, title, description) => {
    setClickedNoteId(id)
    setClikedNoteTitle(title)
    setClikedNoteDescription(description)
    setShowUpdateModal(true)
  }

  const handleAdd = async () => {
    setLoading(true)
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
      setLoading(false)
      console.log('Note Added Successfully')
    }
    else{
      setLoading(false)
      console.log('There was an error in adding the note')
    }
  }

  const handleUpdate = async () => {
    const req = await fetch('http://localhost:8000/notes/update', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        id: clickedNoteId,
        title: clikedNoteTitle,
        description: clikedNoteDescription
      })
    })

    const data = await req.json()

    if (data.status == 'ok'){
      setFetchedNotes(data.notes)
      console.log('Note Added Successfully')
    }
    else{
      console.log('There was an error in updating the note')
    }
  }

  const handleDelete = async () => {
    const req = await fetch('http://localhost:8000/notes/delete', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        id: clickedNoteId
      })
    })

    const data = await req.json()

    if (data.status == 'ok'){
      setFetchedNotes(data.notes)
      setShowDeleteModal(false)
      setReload(!reload)
      console.log('Note Deleted Successfully')
    }
    else{
      console.log('There was an error in deleting the note')
    }
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
  }, [reload])

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
                      <Card key={value._id}>
                        <Card.Body>
                          <Card.Title>
                            <p style={{ fontSize:'30px' }}>{value.title}</p>
                          </Card.Title>

                          <Card.Text style={{ fontSize:'20px' }}>
                            {value.description}
                          </Card.Text>

                          <Button onClick={() => handleUpdateModalShow(value._id, value.title, value.description)} className='mb-2'>Update</Button>
                            {' '}
                          <Button onClick={() => handleRemoveModalShow(value._id)} variant='danger'  className='mb-2'>Remove</Button>

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
                  <Button onClick={() => navigate(-1)}>Logout</Button>
                  {'  '}
                  <Button onClick={() => handleAddModalShow()} className=''>Add Notes</Button>
              </div>
            </Container>
          )
        ) : <LoaderMiddle col='primary'/>
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

      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
          {loading && <Loader backgCol={'light'}/>}

          <Modal.Header closeButton>
            <Modal.Title> Update Show Details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleUpdate}>

              <Form.Group id="title" className='mb-3'>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" required defaultValue={clikedNoteTitle} onChange={(e) => {setClikedNoteTitle(e.target.value)}}></Form.Control>
              </Form.Group>

              <Form.Group id="description" className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} required defaultValue={clikedNoteDescription} onChange={(e) => {setClikedNoteDescription(e.target.value)}}></Form.Control>
              </Form.Group>

              <Button disabled={loading} className='w-100' type="submit">
                Save Changes
              </Button>

            </Form>
          </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleRemoveModalClose}>
          {loading && <Loader backgCol={'light'}/>}
          <Modal.Header closeButton>
              <Modal.Title style={{ textAlign:"center" }}> Are you sure you want to delete this note? </Modal.Title>
          </Modal.Header>

          <Modal.Body>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Button disabled={loading} className='w-100' onClick={handleDelete}>
                  Confirm
              </Button>
          </Modal.Body>
      </Modal>
    </>
  )
}
