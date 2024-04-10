import React from 'react'
import Button from './Button'

const NavBar = () => {
  
  return (
    <div className='flex h-9 bg-zinc-600 justify-center'>
      <Button href='/testss' >Home</Button>
      <Button href='/testss' >My Info</Button>
      {/* get session and log in or out */}
      <Button href='/testss' className='bg-green-800' >LogIn/Out</Button>
    </div>
  )
}

export default NavBar