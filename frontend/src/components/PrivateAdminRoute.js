import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateAdminRoute( { children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [userType, setUserType] = useState()
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
                setUserType(data.accountType)
                setAuthenticated(true)
            }
            else{
                setUserType('')
                setAuthenticated(false)
            }
            setIsCallFinished(true)
        }

        authenticate()
    }, [])

    return (
        isCallFinished ? ((authenticated && userType === 'admin') ? children : <Navigate to='/' />) : <></>
    )
}