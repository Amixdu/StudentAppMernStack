import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Modal, Button, Form, Container, Card, Alert } from 'react-bootstrap'
import Loader from '../components/Loader'
import LoaderMiddle from '../components/LoaderMiddle';
import "./Notes.css"
import PaginationComponent from '../components/PaginationComponent';

export default function Notes() {
  const [fetchedNotes, setFetchedNotes] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [totalPages, setTotalPages] = useState()
  const [newNoteTitle, setNewNoteTitle] = useState()
  const [newNoteDescription, setNewNoteDescription] = useState()
  
  const [clickedNoteId, setClickedNoteId] = useState()
  const [clikedNoteTitle, setClikedNoteTitle] = useState()
  const [clikedNoteDescription, setClikedNoteDescription] = useState()

  const [loading, setLoading] = useState()
  const [error, setError] = useState('')
  const [reload, setReload] = useState(false)

  const [showAddModal, setShowAddModal] = useState()
  const [showUpdateModal, setShowUpdateModal] = useState()
  const [showDeleteModal, setShowDeleteModal] = useState()

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleAddModalClose = () => setShowAddModal(false)
  const handleAddModalShow = () => {
    setError('')
    setShowAddModal(true)
  }

  const handleRemoveModalClose = () => setShowDeleteModal(false);
  const handleRemoveModalShow = (id) => {
      setError('')
      setClickedNoteId(id)
      setShowDeleteModal(true)
  }

  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleUpdateModalShow = (id, title, description) => {
    setError('')
    setClickedNoteId(id)
    setClikedNoteTitle(title)
    setClikedNoteDescription(description)
    setShowUpdateModal(true)
  }

  const handleAdd = async (e) => {
    e.preventDefault()
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
    if (data.status === 'ok'){
      setFetchedNotes(data.notes)
      setReload(!reload)
      setShowAddModal(false)
      setError('')
      setLoading(false)
    }
    else{
      setLoading(false)
      setError('There was an error in adding the note')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
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

    if (data.status === 'ok'){
      setFetchedNotes(data.notes)
      setReload(!reload)
      setShowUpdateModal(false)
      setError('')
      setLoading(false)
    }
    else{
      setLoading(false)
      setError('There was an error in updating the note')
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    setLoading(true)
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

    if (data.status === 'ok'){
      setFetchedNotes(data.notes)
      setReload(!reload)
      setShowDeleteModal(false)
      setError('')
      setLoading(false)
    }
    else{
      setLoading(false)
      setError('There was an error in deleting the note')
    }
  }
  
  useEffect(() => {
    const getNotes = async () => {
      const req = await fetch(`http://localhost:8000/notes?page=${pageNumber}`, {
        headers:{
          'x-access-token': localStorage.getItem('token')
        }
      })
  
      const data = await req.json()
      if (data.status === 'ok'){
        setTotalPages(data.totalPages)
        setFetchedNotes(data.notes.length > 0 ? data.notes : 'Empty')
        setError('')
      }
      else{
        setFetchedNotes('')
        setError('There was an issue in retrieving the data')
      }
    }
    getNotes()
  }, [reload, pageNumber])

  return (
    <>
      {
        fetchedNotes ?
        (
          fetchedNotes !== 'Empty' ? (
            <>
              <div className='box'>
                <h2 style={{ fontSize:'50px', fontWeight:"bold", fontFamily:"Georgia, serif" }}>Notes</h2>
                    <Button onClick={handleLogout}>Log Out</Button>
                    {'  '}
                    <Button onClick={() => handleAddModalShow()} className=''>Add Notes</Button>
              </div> 

              <div className='mt-4 mb-4'>
                {
                  Object.entries(fetchedNotes).map((note) => {
                    const [key, value] = note
                    return (
                      <Card key={key}>
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
              <PaginationComponent totalPages={totalPages} updatePageNumber={(e) => setPageNumber(e)} pageNumber={pageNumber} />
            </>
          ) : 
          (
            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "95vh" }}>
              <div>
                  <p style={{ fontSize:'35px' }}> No Notes Available </p>
                  <Button onClick={handleLogout}>Log Out</Button>
                  {'  '}
                  <Button onClick={() => handleAddModalShow()} className=''>Add Notes</Button>
              </div>
            </Container>
          )
        ) : error ? <Alert variant='danger'>{error}</Alert> : <LoaderMiddle col='primary'/>
      }
      

      <Modal show={showAddModal} onHide={handleAddModalClose}>
          {error && <Alert variant='danger'>{error}</Alert>}
          {loading && <Loader backgCol={'light'}/>}
          <Modal.Header closeButton>
              <Modal.Title style={{ textAlign:"center" }}> Add Notes</Modal.Title>
          </Modal.Header>

          <Modal.Body>

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
          {error && <Alert variant='danger'>{error}</Alert>}
          {loading && <Loader backgCol={'light'}/>}
          
          <Modal.Header closeButton>
            <Modal.Title> Update Show Details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
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
          {error && <Alert variant='danger'>{error}</Alert>}
          {loading && <Loader backgCol={'light'}/>}
          <Modal.Header closeButton>
              <Modal.Title style={{ textAlign:"center" }}> Are you sure you want to delete this note? </Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Button disabled={loading} className='w-100' onClick={handleDelete}>
                  Confirm
              </Button>
          </Modal.Body>
      </Modal>
    </>
  )
}