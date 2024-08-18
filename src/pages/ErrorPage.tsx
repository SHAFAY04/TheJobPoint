import { FaExclamationTriangle } from 'react-icons/fa';

type ErrorProps = {
  error: string | null;
};

const Error = ({ error }: ErrorProps) => {
  return (
    <div className='flex flex-col items-center h-96'>
      <FaExclamationTriangle className='text-yellow-400 text-6xl mb-5 mt-5' />
      <h1 className='font-serif mb-4 text-5xl'>AN ERROR OCCURRED!</h1>
      <p className='text-xl font-serif'>{error || 'An unknown error occurred'}</p>
    </div>
  );
};

export default Error;
