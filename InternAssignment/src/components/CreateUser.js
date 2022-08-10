import { Alert } from 'react-bootstrap'
import React, { useRef, useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'


export default function CreateUser() {
  const [email, setEmail] = useState()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
//   const history = useNavigate()

  
  async function handleSubmit(e){
    e.preventDefault()
    const response = await fetch('http://localhost:8000/users/create', {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })

    const data = await response.json()
    console.log(data)

    setLoading(false)
  }


  return (
    <div style={{ backgroundColor:'#1569C7' }}>
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>

          {/* {loading && <Loader backgCol={'light'}/>} */}

          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Create User</h2>
              
              {error && <Alert variant='danger'>{error}</Alert>}

              <Form onSubmit={handleSubmit}>

                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required onChange={(e) =>
                    setEmail(e.target.value)}>
                  </Form.Control>
                </Form.Group>

                <br></br>

                <Button disabled={loading} className='w-100' type="submit">
                  Create
                </Button>

              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  )
}