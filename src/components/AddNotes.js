import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './Loader'

export default function AddNotes() {
  const titleRef = useRef()
  const descriptionRef = useRef()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  async function handleSubmit(e){
    e.preventDefault()
    
  }


  return (
    <div style={{ backgroundColor:'#1569C7' }}>
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>

          {loading && <Loader backgCol={'light'}/>}
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Add Notes</h2>
              {error && <Alert variant='danger'>{error}</Alert>}
              {success && <Alert> Show Added Successfully </Alert>}

              <Form onSubmit={handleSubmit}>

                <Form.Group id="name" className='mb-3'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" ref={titleRef} required ></Form.Control>
                </Form.Group>

                <Form.Group id="description" className='mb-3'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} ref={descriptionRef} required ></Form.Control>
                </Form.Group>

                <Button disabled={loading} className='w-100' type="submit">
                  Add
                </Button>

              </Form>
            </Card.Body>
          </Card>
          
          
        </div>
      </Container>
    </div>
  )
}
