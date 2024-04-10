import Link from 'next/link'
import React from 'react'

interface Props {
  href : string
  children : React.ReactNode
  className? : string 
  onclick? : () => {}
}

const Button : React.FC<Props> = ({href   , children , className}) => {
  return <Link href={href} className={`btn text-base p-0 bg-gray-600 text-white btn-outline px-1 mx-1 ${className}`} >{children}</Link>
}
export default Button