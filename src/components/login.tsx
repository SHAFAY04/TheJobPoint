import { FormEvent, useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Success from './Success';
import { usePostUserMutation } from '../api/authApiSlice';
import 'ldrs/tailChase';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [err, setErr] = useState<number | "TIMEOUT_ERROR" | "FETCH_ERROR" | "PARSING_ERROR" | "CUSTOM_ERROR" | string | undefined
  >()
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [postUser, { isLoading, isError, error, isSuccess }] = usePostUserMutation();

  // Reference to the original button
  const buttonElement = useRef<HTMLButtonElement | null>(null);

  // Create loading spinner
  const newElement = document.createElement('l-tail-chase');
  newElement.setAttribute('size', '50');
  newElement.setAttribute('speed', '1.75');
  newElement.setAttribute('color', 'white');
  newElement.style.height = '100%';

  async function submitLoginForm(e: FormEvent): Promise<void> {
    e.preventDefault();
    try {
      // Replace button with the new loading element
      buttonElement.current?.replaceWith(newElement);
      // on using .unwrap() on response any response code outside of 200 series is considered as an error by rtk query lmao !

      const response = await postUser({ username: user, password: pwd })
      console.log('Response:', response);

      setUser('');
      setPwd('');
      setFormSubmitted(true);


    } catch (err) {
      newElement.replaceWith(buttonElement.current!);
      // Handle error
      setErr('Oops! The server broke!');
      errRef.current?.focus();
    }
  }

  // This will update the UI based on mutation state
  useEffect(() => {
    if (formSubmitted) {

      if (isLoading) {
        buttonElement.current?.replaceWith(newElement);
      }
      if (isError && error) {
        newElement.replaceWith(buttonElement.current!);
        if ('status' in error) {
          setErr(error.status);
        } else if ('message' in error) {
          setErr(error.message);
        } else {
          setErr('An unknown error occurred');
        }
        errRef.current?.focus();
      }
    }
  }, [formSubmitted, isLoading, isError, isSuccess, error]);

  // Focus on the username input when the component loads
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // Reset error state on input change
  useEffect(() => {
    setErr(undefined);
  }, [user, pwd]);

  return (
    isSuccess ? <Success isLogin={true} /> : (
      <section>
        <div className='bg-emerald-300 py-44'>
          <div className='bg-emerald-500 py-14 mx-auto max-w-md px-12'>
            <form onSubmit={submitLoginForm}>
              {/* Error message */}
              <p aria-live="assertive" ref={errRef} className={err ? ' mb-4 text-red-600 bg-red-300 p-2 w-full' : 'hidden'}>
                {err}
              </p>

              {/* Username input */}
              <label htmlFor="username" className='text-2xl'>USERNAME:</label>
              <br />
              <input
                ref={userRef}
                id='username'
                type="text"
                className='p-3 mb-6 mt-4 w-full'
                required
                onChange={(e) => setUser(e.target.value)}
                value={user}
                autoComplete="off"
              />
              <br />

              {/* Password input */}
              <label htmlFor="pwd" className='text-2xl'>PASSWORD:</label>
              <br />
              <input
                type="password"
                id='pwd'
                className='p-3 mb-8 mt-4 w-full'
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
              />

              {/* Submit button */}
              <div className='flex justify-center items-center mb-4'>
                <button
                  id='but'
                  ref={buttonElement}
                  type='submit'
                  className='  bg-emerald-300 rounded-md p-4 hover:bg-emerald-600 mb-6 disabled:bg-gray-300 w-full'
                  disabled={!user || !pwd}
                >
                  LOG IN!
                </button>
              </div>
              {/* Register link */}
              <p className='text-lg mb-4'>Don't have an account?</p>
              <a href="#" className='underline text-lg'>Register Here!</a>
            </form>
          </div>
        </div>
      </section>
    )
  );
}

export default Login;
