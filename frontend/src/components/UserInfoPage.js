import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Form, Button, Card, Container, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

export default function UserInfoPage() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [mobile, setMobile] = useState()
    const [resetPassword, setResetPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [showModal, setShowModal] = useState(false)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState()
    const [success, setSuccess] = useState()

    const navigate = useNavigate()

    const handleModalClose = () => {
        if (success){
            navigate('/')
        }
        else{
            setShowModal(false)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        if (resetPassword === confirmPassword){
            const req = await fetch('http://localhost:8000/users/add-info', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    dateOfBirth: dateOfBirth,
                    mobile: parseInt(mobile),
                    resetPassword: resetPassword
                })
            })

            const data = await req.json()
            if (data.status == 'ok'){
                setMsg('Data successfully updated! Closing this will redirect you to the login page, please login again')
                setLoading(false)
                setSuccess(true)
                setShowModal(true)
            }
            else{
                setMsg('There was an error in updating the data. Please try again')
                setLoading(false)
                setSuccess(false)
                setShowModal(true)
            }
        }
        else{
            setError('Passwords do not match')
            setLoading(false)
        }
    }

    return (
        <div style={{ backgroundColor:'#1569C7' }}>
            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
                <div className='w-100' style={{ maxWidth: '400px' }}>

                    {loading && <Loader backgCol={'light'}/>}

                    <Card>
                        <Card.Body>
                        <h2 className="text-center mb-4">Add Information</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}

                        <Form onSubmit={handleSubmit}>

                            <Form.Group id="firstName" className='mb-3'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" required onChange={(e) => {setFirstName(e.target.value)}}></Form.Control>
                            </Form.Group>

                            <Form.Group id="lastName" className='mb-3'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" required onChange={(e) => {setLastName(e.target.value)}}></Form.Control>
                            </Form.Group>

                            <Form.Group id="dateOfBirth" className='mb-3'>
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control type='date' required onChange={(e) => {setDateOfBirth(e.target.value)}}></Form.Control>
                            </Form.Group>

                            <Form.Group id="mobile" className='mb-3'>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" required onChange={(e) => {setMobile(e.target.value)}}></Form.Control>
                            </Form.Group>

                            <Form.Group id="reset-password" className='mb-3'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" required onChange={(e) => {setResetPassword(e.target.value)}}></Form.Control>
                            </Form.Group>

                            <Form.Group id="confirm-password" className='mb-3'>
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type="password" required onChange={(e) => {setConfirmPassword(e.target.value)}}></Form.Control>
                            </Form.Group>

                            <Button disabled={loading} className='w-100' type="submit">
                                Submit
                            </Button>

                        </Form>
                        </Card.Body>
                    </Card>

                    <Modal show={showModal} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title> {msg} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Button className='w-100' onClick={handleModalClose}>
                                Confirm
                            </Button>
                        </Modal.Body>
                    </Modal>

                </div>
            </Container>
        </div>       
    )
}