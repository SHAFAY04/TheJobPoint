import { FormEvent, useEffect, useRef, useState } from 'react';
import Success from './Success';
import { useLoginMutation, useLogOutMutation } from '../api/authApiSlice';
import { tailChase } from 'ldrs'

tailChase.register()
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { useDispatch} from 'react-redux';
import {  setCredentials } from '../auth/authSlice';
import { Link, useLocation, useNavigate,useSearchParams } from 'react-router-dom';
import Logo from '../assets/images/Scrw-modified.png'


const Login = () => {

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [err, setErr] = useState<number | "TIMEOUT_ERROR" | "FETCH_ERROR" | "PARSING_ERROR" | "CUSTOM_ERROR" | string | undefined
  >()
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const [postUser, { isSuccess }] = useLoginMutation();

  // Reference to the original button
  const buttonElement = useRef<HTMLButtonElement | null>(null);

  // Create loading spinner
  const newElement = document.createElement('l-tail-chase');
  newElement.setAttribute('size', '50');
  newElement.setAttribute('speed', '1.75');
  newElement.setAttribute('color', 'white');
  newElement.style.height = '100%';

  const dispatch = useDispatch()

  //doing this stuff to navigate the user to the page they actually wanted to access but were redirected to the login page just because they weren't logged in and the page was a protected page
  const navigate=useNavigate()
  const location=useLocation()
  const from=location.state?.from?.pathname ||'/'

 const [searchParams]=useSearchParams()
 const isEditor=searchParams.get('editor')==='true'

 const [logOut]=useLogOutMutation()

  async function submitLoginForm(e: FormEvent): Promise<void> {
    
     // Replace button with the new loading element
     buttonElement.current?.replaceWith(newElement);
    e.preventDefault();
    
    try {
      //even tho there is no need for logOut here since the login route doesnt use verifyJwt and would overwrite the credentials of the old user by the new user anyways but we are still doing this so things look cleaner but just and explanantion..
      await logOut().unwrap()

      //the .unwrap() allows us to use the try catch which will help us handling different errors in the catch block
      const response = await postUser({ username: user, password: pwd }).unwrap()
      console.log(response)
      //similarly here if you dont spread the response in the object that you are sending with the setCredentials method it will just send the whole response object with the sub properties and hence the setCredentials method wont be able to find the accessToken because it will be further located in the response object 
      dispatch(setCredentials({...response,user}))
      

      setUser('');
      setPwd('');



    } catch (err) {
    
      //any response code outside of 200 series is considered as an error by rtk query lmao !

      newElement.replaceWith(buttonElement.current!);

      if ('status' in (err as FetchBaseQueryError)) {

        if ((err as FetchBaseQueryError).status === 400) {
          setErr('Username and Password Required!')
        }
        else if ((err as FetchBaseQueryError).status === 401) {
          setErr('Invalid Username Or Password!')
        }
        else {
          //simply means the status code lies with in the 5xx series which means a server issue
          setErr('No Server Response!')
        }
      }
      else {

        if ('message' in (err as SerializedError)) {
          setErr((err as SerializedError).message)
        }
      }
      errRef.current?.focus();
    }
  }

  // Focus on the username input when the component loads
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {

    if (isSuccess) {

      setTimeout(() => {
        navigate(from,{replace:true})
      }, 1500)
    }
  }, [isSuccess])

  // Reset error state on input change
  useEffect(() => {
    setErr(undefined);
  }, [user, pwd]);

  return (
    
      <section>
       
        <div className='bg-emerald-200 h-screen py-10 '>
        {isSuccess ? <Success isLogin={true} /> : (<section><div><img className='mx-auto drop-shadow-2xl h-40 fadeScaleBounce' src={Logo} alt="Logo Here"  /></div>
          <div className='mt-10 shadow-2xl bg-emerald-400 py-14 mx-auto max-w-sm px-10'>
            <form onSubmit={submitLoginForm}>
              {/* Error message */}
              <p aria-live="assertive" ref={errRef} className={err ? ' mb-6 text-red-700 bg-red-200 p-2 w-full' : 'hidden'}>
                {err}
              </p>
        <h1 className='text-center font-serif text-4xl mb-8'>{isEditor?'EMPLOYER LOGIN':'LOGIN'}</h1>
              {/* Username input */}
              <label htmlFor="username" >USERNAME:</label>
              <br />
              <input
                ref={userRef}
                id='username'
                type="text"
                className='p-2 mb-4 mt-4 w-full rounded-md'
                required
                onChange={(e) => setUser(e.target.value)}
                value={user}
                autoComplete="off"
              />
              <br />

              {/* Password input */}
              <label htmlFor="pwd">PASSWORD:</label>
              <br />
              <input
                type="password"
                id='pwd'
                className='p-2 rounded-md mb-8 mt-4 w-full'
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
              <p className=' mb-4'>Don't have an account?</p>
              <Link className='underline text-lg' to={isEditor?'/register?editor=true':'/register'}>{isEditor?'Register As Employer Now!':'Register Now!'}</Link>
              
              
            </form>
          </div></section>)}
        </div>
      </section>
    
  );
}

export default Login;
