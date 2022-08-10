import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateUserInfoRoute( { children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [userStatus, setUserStatus] = useState()
    const [isCallFinished, setIsCallFinished] = useState(false)

    useEffect(() => {
        const authenticate = async () => {
            const req = await fetch('http://localhost:8000/users/auth', {
              headers:{
                'x-access-token': localStorage.getItem('token')
              }
            })
        
            const data = await req.json()
            if (data.status === 'ok'){
                setUserStatus(data.userStatus)
                setAuthenticated(true)
            }
            else{
                setUserStatus(false)
                setAuthenticated(false)
            }
            setIsCallFinished(true)
        }

        authenticate()
    }, [])

    return (
        isCallFinished ? ((authenticated && userStatus === true) ? children : <Navigate to='/' />) : <></>
    )
}