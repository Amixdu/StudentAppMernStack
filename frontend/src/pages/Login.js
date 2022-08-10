import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorMsg, setErrorMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        const response = await fetch('http://localhost:8000/users/login', {
          method: 'POST',
          headers:{
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
              email,
              password
          })
        })

      const data = await response.json()
      
      if (data.user){
          localStorage.setItem('token', data.user)
          setSuccess(true)

          if(data.userStatus) {
            navigate('/add-info')
          }
          else{
            if(data.accountType === 'admin'){
              navigate('/admin')
            }
            else{
              navigate('/notes')
            }
          }
          setLoading(false)
      }
      else{
          setErrorMsg('Email and Password does not match')
          setSuccess(false)
          setLoading(false)
      }
    }

    return (
      <div style={{ backgroundColor:'#1569C7' }}>
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
          <div className='w-100' style={{ maxWidth: '400px' }}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Login Page</h2>
                {success ? '' : errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) =>
                      setEmail(e.target.value)}></Form.Control>
                  </Form.Group>

                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) =>
                      setPassword(e.target.value)}></Form.Control>
                  </Form.Group>

                  <br></br>

                  <Button disabled={loading} className='w-100' type="submit">
                    Login
                  </Button>
                </Form>

              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    )
}