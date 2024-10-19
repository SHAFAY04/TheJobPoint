import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit/react';
import { FaExclamationTriangle } from 'react-icons/fa';


type myOwnErrorType={
  errorString:string,
}

type ErrorProps = {
  error: FetchBaseQueryError | SerializedError | myOwnErrorType
};

const Error = ({ error }: ErrorProps) => {

  
  return (
    <div className='flex flex-col items-center my-40'>
      <FaExclamationTriangle className='text-yellow-400 text-6xl mb-5 mt-5' />
      <h1 className='font-serif mb-4 text-5xl'>AN ERROR OCCURRED!</h1>
      <p className='text-xl font-serif'> {
      //This is an Immediately Invoked Function Expression (IIFE). It allows the logic inside to be executed immediately and returns the result directly to the JSX. This pattern is useful when you need to run conditional logic within JSX.
      (() => {
        if ('status' in error) {
          // error is of type FetchBaseQueryError
          const e= error as FetchBaseQueryError
          if(e.data && typeof e.data==='object' && 'message' in e.data){
            return `${e.status}: ${e.data.message}`
          }
        } 
       
        else {
          // error is of type SerializedError
          if('message' in (error as SerializedError)){
            const e = error as SerializedError
            return e.message || 'Unknown error occurred';
          }
        }
      })()}</p>
      
    </div>
  );
};

export default Error;
