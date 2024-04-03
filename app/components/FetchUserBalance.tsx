'use client'
import React, { useEffect } from 'react'

const FetchUserData = () => {

  useEffect(() => {

    const fetchData = async () => {
      // TODO: fetch user data dynamaicly later on
      const response = await fetch('api/v1/balance/66063d32d45d4104783ec5e3')
      
      const data = await response.json()
      console.log(data)
    }
    fetchData()
  },[])
  return (
    <div>{}</div>
  )
}

export default FetchUserData