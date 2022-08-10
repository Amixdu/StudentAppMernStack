import React, { useState, useEffect } from 'react'
import { Modal, Form, Alert, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import LoaderMiddle from './LoaderMiddle'
import "./AdminPage.css"
import PaginationComponent from './PaginationComponent'

export default function AdminPage() {
    const [showAddUserModal, setShowAddUserModal] = useState()
    const [showDetailsModal, setShowDetailsModal] = useState()
    const [createUserEmail, setCreateUserEmail] = useState()

    const [msg, setMsg] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState()

    const [fetchedUsers, setFetchedUsers] = useState()
    const [pageNumber, setPageNumber] = useState(0)
    const [totalPages, setTotalPages] = useState()

    const [filterVariable, setFilterVariable] = useState('Email')
    const [filterVariableData, setFilterVariableData] = useState()
    const [fetchedFilteredUsers, setFetchedFilteredUsers] = useState()
    const [filteredPageNumber, setFilteredPageNumber] = useState(0)
    const [filteredPages, setFilteredPages] = useState()
    const [filtered, setFiltered] = useState(false)

    const [clickedId, setClickedID] = useState()
    const [clickedFirstName, setClickedFirstName] = useState()
    const [clickedLastName, setClickedLastName] = useState()
    const [clickedEmail, setClickedEmail] = useState()
    const [clickedDateOfBirth, setClickedDateOfBirth] = useState()
    const [clickedMobile, setClickedMobile] = useState()
    const [clickedStatus, setClickedStatus] = useState()
    const [clickedAccountType, setClickedAccountType] = useState()

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
            email: createUserEmail
        })
        })

        const data = await response.json()
        if (data.status === 'success'){
            setError(false)
            setMsg('Login instructions will be sent to the entered email!')
        }
        else{
            setError(true)
            setMsg('A student with the entered email already exists in the database')
        }
        setLoading(false)
    }

    const handleFilter = async () => {
        setLoading(true)
        if (filterVariableData){
            const req = await fetch(`http://localhost:8000/users/filtered?page=${filteredPageNumber}`, {
            method: 'POST',
            headers:{
                'x-access-token': localStorage.getItem('token'),
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                filterVariable,
                filterVariableData
            })
            })
            const data = await req.json()
            if (data.status === 'ok'){
                setFilteredPages(data.totalPages)
                setFetchedFilteredUsers(data.users)
                setFiltered(true)
                setFilterVariableData('')
            }
            else{
                setFiltered(false)
            }
        }
        else{
            setFiltered(false)
        }
    }

    const getUsers = async () => {
        setLoading(true)
        const req = await fetch(`http://localhost:8000/users?page=${pageNumber}`, {
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        })
    
        const data = await req.json()

        if (data.status === 'ok'){
            setTotalPages(data.totalPages)
            setFetchedUsers(data.users)
        }
        else{
            window.alert('There was an issue in retrieving the data')
        }
        setLoading(false)
    }

    useEffect(() => {
        setLoading(false)
    }, [filtered])

    useEffect(() => {
        getUsers()
    }, [pageNumber])

    useEffect(() => {
        if (filtered){
            handleFilter()
        }
    }, [filteredPageNumber])


    return (
        <div >
            {
                (fetchedUsers && !loading) ?
                (
                    <>
                        <div className='box'>
                            <h2 style={{ fontSize:'50px', fontWeight:"bold", fontFamily:"Georgia, serif" }}>Users</h2>
                            <Link to="/" className='btn btn-primary'>Log Out</Link>
                            {'  '}
                            <Button onClick={() => handleOpenModal()} className=''>Add Students</Button>
                        </div> 

                        <br />
                        
                        <div className='main-container'>
                            <div className='left-container'>
                                {!filtered ? 
                                    <>
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
                                        <PaginationComponent totalPages={totalPages} updatePageNumber={(e) => setPageNumber(e)} pageNumber={pageNumber} />
                                    </>
                                : 
                                    fetchedFilteredUsers.length > 0 ?
                                    <>
                                        <Table striped bordered hover>
                                            <tbody>
                                                {Object.entries(fetchedFilteredUsers).map((user) => {
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
                                        <PaginationComponent totalPages={filteredPages} updatePageNumber={(e) => setFilteredPageNumber(e)} pageNumber={filteredPageNumber} />
                                    </> : <p style={{ fontSize:'20px' }}>No Matches</p>
                                }
                            </div>

                            <div className='right-container'>
                                <Form onSubmit={handleFilter}>
                                    <Form.Select onChange={(e) => {setFilterVariable(e.target.value)}} aria-label="Default select example" className='mb-3' value={filterVariable} >
                                        <option value="Email">Email</option>
                                        <option value="ID">ID</option>
                                        <option value="First Name">First Name</option>
                                    </Form.Select>
                                    <Form.Group id="email" className='mb-3'>
                                        <Form.Control type={filterVariable === 'Email' ? "email" : "text"} required onChange={(e) => {setFilterVariableData(e.target.value)}} placeholder={'Enter ' + filterVariable} ></Form.Control>
                                    </Form.Group> 
                                </Form>

                                <Button disabled={loading || !filterVariableData} onClick={handleFilter} style={{display:'inline-block'}} >
                                    Filter
                                </Button>

                                {' '}

                                <Button disabled={loading} onClick={() => setFiltered(false)} style={{display:'inline-block'}} >
                                    Remove Filter
                                </Button>
                                
                            </div>
                        </div>
                    </>
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
                            <Form.Control type="email" required onChange={(e) => {setCreateUserEmail(e.target.value)}}></Form.Control>
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
                                <td><strong>Status (first time login): </strong></td>
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