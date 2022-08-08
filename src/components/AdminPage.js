import React, { useState, useEffect } from 'react'
import { Modal, Form, Alert, Container, Card, Button, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader'
import LoaderMiddle from './LoaderMiddle'
import "./Notes.css"

export default function AdminPage() {
    const [showAddUserModal, setShowAddUserModal] = useState()
    const [showDetailsModal, setShowDetailsModal] = useState()
    const [email, setEmail] = useState()
    const [msg, setMsg] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState()
    const [fetchedUsers, setFetchedUsers] = useState()

    const [clickedId, setClickedID] = useState()
    const [clickedFirstName, setClickedFirstName] = useState()
    const [clickedLastName, setClickedLastName] = useState()
    const [clickedEmail, setClickedEmail] = useState()
    const [clickedDateOfBirth, setClickedDateOfBirth] = useState()
    const [clickedMobile, setClickedMobile] = useState()
    const [clickedStatus, setClickedStatus] = useState()
    const [clickedAccountType, setClickedAccountType] = useState()

    const navigate = useNavigate()

    const handleDetailsModalOpen = (id, fName, lName, email, dob, mobile, status, aType) => {
        setClickedID(id)
        setClickedFirstName(fName)
        setClickedLastName(lName)
        setClickedEmail(email)
        setClickedDateOfBirth(dob)
        setClickedMobile(mobile)
        setClickedStatus(status)
        setClickedAccountType(aType)
        setShowDetailsModal(true)
    }

    const handleOpenModal = () => {
        setMsg('')
        setError(false)
        setShowAddUserModal(true)
    }

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
        if (data.status === 'success'){
            setError(false)
            setMsg('Email with login details has been sent!')
        }
        else{
            setError(true)
            setMsg('A student with the entered email already exists in the database')
        }
        setLoading(false)
    }

    const getUsers = async () => {
        const req = await fetch('http://localhost:8000/users', {
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        })
    
        const data = await req.json()
        if (data.status == 'ok'){
          setFetchedUsers(data.users.length > 0 ? data.users : 'Empty')
        }
        else{
          console.log('BYE')
          navigate('/login')
        }

    }

    useEffect(() => {
        getUsers()
      }, [])

    return (
        <div >
            {
                fetchedUsers ?
                (
                    fetchedUsers !== 'Empty' ? (
                        <>
                            <div className='box'>
                                <h2 style={{ fontSize:'50px', fontWeight:"bold", fontFamily:"Georgia, serif" }}>Users</h2>
                                <Link to="/login" className='btn btn-primary'>Log Out</Link>
                                {'  '}
                                <Button onClick={() => handleOpenModal()} className=''>Add Students</Button>
                            </div> 

                            <br />

                            <Table striped bordered hover>
                                <tbody>
                                    {Object.entries(fetchedUsers).map((user) => {
                                        const [key, value] = user
                                        const formattedDate = (String(value.dateOfBirth)).slice(0, 10)
                                        return (
                                            <tr>
                                                <td>{value.email}</td>
                                                <td><Button onClick={() => handleDetailsModalOpen(value._id, value.firstName, value.lastName, value.email, formattedDate, value.mobile, String(value.status), value.accountType)}>Details</Button></td>
                                            </tr>
                                        )
                                        })}
                                </tbody>
                            </Table>
                        </>
                    ) :
                    (
                        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "95vh" }}>
                            <div>
                                <p style={{ fontSize:'35px' }}> No Students In Database </p>
                                <Link to="/login" className='btn btn-primary'>Log Out</Link>
                                {'  '}
                                <Button onClick={() => handleOpenModal()}>Add Students</Button>
                            </div>
                        </Container>
                    )
                    
                ) : <LoaderMiddle col='primary'/>
                
            }
            
            <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}>
                {loading && <Loader backgCol={'light'}/>}
                <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign:"center" }}> Clicking create will send an email to the entered adress with login details </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {error ? (msg && <Alert variant='danger'>{msg}</Alert>) : (msg &&<Alert>{msg}</Alert>)}
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

            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                {loading && <Loader backgCol={'light'}/>}
                <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign:"center" }}> User Details </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {error ? (msg && <Alert variant='danger'>{msg}</Alert>) : (msg &&<Alert>{msg}</Alert>)}
                    <Table>
                        <tbody>
                            <tr>
                                <td><strong>ID: </strong></td>
                                <td>{clickedId}</td>
                            </tr>

                            <tr>
                                <td><strong>First Name: </strong></td>
                                <td>{clickedFirstName}</td>
                            </tr>

                            <tr>
                                <td><strong>Last Name: </strong></td>
                                <td>{clickedLastName}</td>
                            </tr>

                            <tr>
                                <td><strong>Email: </strong></td>
                                <td>{clickedEmail}</td>
                            </tr>

                            <tr>
                                <td><strong>Date Of Birth: </strong></td>
                                <td>{clickedDateOfBirth}</td>
                            </tr>

                            <tr>
                                <td><strong>Mobile: </strong></td>
                                <td>{clickedMobile}</td>
                            </tr>

                            <tr>
                                <td><strong>Status (First time login): </strong></td>
                                <td>{clickedStatus}</td>
                            </tr>

                            <tr>
                                <td><strong>Account Type: </strong></td>
                                <td>{clickedAccountType}</td>
                            </tr>
                        </tbody>
                    </Table>

                    
                </Modal.Body>
            </Modal>
        </div>
        
    )
}
