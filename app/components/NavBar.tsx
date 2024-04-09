import React from 'react'

interface ButtonProps {
  href : string
  children : React.ReactNode
  extraCss? : string 
}

const NavBarButton : React.FC<ButtonProps> = ({href   , children , extraCss}) => {
  return <a href={href} className={`btn bg-gray-600 text-white btn-outline text-xl px-1 mx-1  ${extraCss}`} >{children}</a>
}

const NavBar = () => {
  
  return (
    <div className='navbar bg-zinc-600 justify-center'>
      <NavBarButton href='/testss' >Home</NavBarButton>
      <NavBarButton href='/testss' >My Info</NavBarButton>
      {/* get session and log in or out */}
      <NavBarButton href='/testss' extraCss='bg-green-800' >LogIn/Out</NavBarButton>
    </div>
  )
}

export default NavBar