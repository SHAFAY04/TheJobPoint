import React from 'react'
import { ErrorResponse } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'
type errorProps={error:ErrorResponse}

const Error = () => {
  return (
    <>
    <div className='flex flex-col items-center h-96'>
    <FaExclamationTriangle className='text-yellow-400 text-6xl mb-5 mt-5' />
        <h1 className='font-serif mb-4 text-5xl '>404 NOT FOUND</h1>
        <p className='text-xl font-serif'>This page does not Exist!</p>

    </div>
    </>
  )
}

export default Error