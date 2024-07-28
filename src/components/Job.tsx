import React, { ReactNode } from 'react'


type jobProps = { children: ReactNode }

const Job = ({ children }: jobProps) => {
  return (

    <div className="bg-white rounded-xl shadow-md relative">
      
        {children}
      
    </div>

  )
}

export default Job