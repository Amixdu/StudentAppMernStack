import React, { useState } from 'react'
import { Modal, Form, Alert, Container, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './Loader'

export default function AdminPage() {
    const [showAddUserModal, setShowAddUserModal] = useState()
    const [email, setEmail] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState()

    const handleSubmit = async (e) => {
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
        <>
            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "95vh" }}>
                <div>
                    <p style={{ fontSize:'35px' }}> No Students In Database </p>
                    <Link to="/login" className='btn btn-primary'>Log Out</Link>
                    {'  '}
                    <Button onClick={() => setShowAddUserModal(true)}>Add Students</Button>
                </div>
            </Container>

            <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}>
                {loading && <Loader backgCol={'light'}/>}
                <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign:"center" }}> Clicking create will send an email to the specified adress with login details </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Button disabled={loading} className='w-100' type="submit">
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
        
    )
}
