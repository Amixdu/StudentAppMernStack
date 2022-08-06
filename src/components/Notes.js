import React, { useEffect } from 'react'
import { useJwt } from "react-jwt";
import { Link, useNavigate } from 'react-router-dom'

export default function Notes() {
  const navigate = useNavigate()
  
  const getNotes = async () => {
    const req = await fetch('http://localhost:8000/api/notes', {
      headers:{
        'x-access-token': localStorage.getItem('token')
      }
    })

    const data = req.json()
    console.log(data)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token){
      navigate('/login')
    }
    else{
      console.log("sdbghabsdhgbsdhgh")
      getNotes()
    }
  }, [])

  return (
    <div>Notes</div>
  )
}
