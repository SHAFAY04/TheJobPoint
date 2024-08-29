import  { ReactNode } from 'react'

type CardProps= {
    
    background:string,
   children:ReactNode
}

const Card = ({background='bg-gray-200', children }:CardProps) => {
  return (
    <div className={`${background} p-6 rounded-md shadow-2x`}>
        {children}
    </div>
  )
}

export default Card