import { FormEvent, useEffect, useRef, useState } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { usePostUserMutation } from '../api/registerApiSlice';
import { nanoid, SerializedError } from '@reduxjs/toolkit';
import Logo from '../assets/images/Scrw-modified.png'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Success from './Success';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
type newUserType = {

  username: string,
  password: string,
  roles: object
}


const Register = () => {
  const USER_REG = /^[a-zA-Z0-9]([._-]?[a-zA-Z0-9]){3,15}$/;
  const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState('');
  const [userValid, setUserValid] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setpwd] = useState('');
  const [pwdValid, setpwdValid] = useState(false);
  const [pwdFocus, setpwdFocus] = useState(false);

  const [matchPwd, setmatchPwd] = useState('');
  const [matchPwdValid, setmatchPwdValid] = useState(false);
  const [matchPwdFocus, setmatchPwdFocus] = useState(false);

  const [err, setErr] = useState<number | "TIMEOUT_ERROR" | "FETCH_ERROR" | "PARSING_ERROR" | "CUSTOM_ERROR" | string | undefined
  >()
  const [submitted, setSubmitted] = useState(false)

  const [searchParams] = useSearchParams()
  const isEditor = searchParams.get('editor') === 'true'

  // Reference to the original button
  const buttonElement = useRef<HTMLButtonElement | null>(null);

  // Create loading spinner
  const newElement = document.createElement('l-tail-chase');
  newElement.setAttribute('size', '50');
  newElement.setAttribute('speed', '1.75');
  newElement.setAttribute('color', 'white');
  newElement.style.height = '100%';

  const nav = useNavigate()


  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REG.test(user);
    setUserValid(result);
  }, [user]);

  useEffect(() => {
    const pwdresult = PWD_REG.test(pwd);
    setpwdValid(pwdresult);
    const matchPwdResult = matchPwd === pwd;
    setmatchPwdValid(matchPwdResult);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErr('');
  }, [user, pwd, matchPwd]);


  //USING THE RTKQUERY!
  const [postUser, { isSuccess }] = usePostUserMutation()

  useEffect(() => {
    if (submitted) {
      if (isSuccess) {
        setTimeout(() => {
          nav('/login')
        }, 2000)
      }

    }

  }, [isSuccess, submitted])

  async function handleSubmit(event: FormEvent): Promise<void> {

    event.preventDefault()
    const v1 = USER_REG.test(user)
    const v2 = PWD_REG.test(pwd)

    if (!v1 || !v2) {
      setErr('Invalid Entry')
      return
    }
    const newUser: newUserType = {

      username: user,
      password: pwd,
      roles: isEditor ? {
        User: 2024,
        Editor: 1998
      } : {
        User: 2024
      }


    }
    setSubmitted(true)
    try {

      buttonElement.current?.replaceWith(newElement);

      await postUser(newUser).unwrap()
    }
    catch (err) {
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
  return (
    <section className='pt-10 h-screen bg-emerald-200'>
      {isSuccess ? <Success isLogin={false} /> : (<div><div><img className='mx-auto drop-shadow-2xl h-40 fadeScaleBounce' src={Logo} alt="Logo Here" /></div><section className='bg-emerald-400 shadow-2xl max-w-sm  mt-10 py-14 px-10 mx-auto'>
        <p ref={errRef} className={err ? 'text-red-700 p-2 mb-6 bg-red-200 w-full' : 'hidden'} aria-live="assertive">{err}</p>
        <h1 className='text-center font-serif text-4xl mb-8'>{isEditor ? 'EMPLOYER REGISTRATION' : 'REGISTRATION'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2">
            <label htmlFor="username">USERNAME:</label>
            <span className={userValid ? 'text-green-800' : 'hidden'}>
              <FaCheck className='text-2xl' />
            </span>
            <span className={!user || userValid ? 'hidden' : 'text-red-600'}>
              <FaTimes className='text-2xl' />
            </span>
          </div>
          <input
            type="text"
            className='mt-2 p-2 rounded-md w-full'
            id='username'
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={userValid ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p id='uidnote' className={`${userFocus && user && !userValid ? 'text-white bg-black rounded-md p-1 mt-6' : 'hidden'} text-sm mt-1`}>
            <FaInfoCircle />4-16 characters long.<br />
            Contain only alphanumeric characters, underscores, and hyphens.<br />
            Cannot start or end with a hyphen or underscore.<br />
          </p>

          <div className="flex flex-col mt-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="password">PASSWORD:</label>
              <span className={pwdValid ? 'text-green-800' : 'hidden'}>
                <FaCheck className='text-2xl' />
              </span>
              <span className={!pwd || pwdValid ? 'hidden' : 'text-red-600'}>
                <FaTimes className='text-2xl' />
              </span>
            </div>
            <input
              type="password"
              className='mt-2 p-2 rounded-md'
              id='password'
              onChange={(e) => setpwd(e.target.value)}
              required
              aria-invalid={pwdValid ? "false" : "true"}
              aria-describedby="upwdnote"
              onFocus={() => setpwdFocus(true)}
              onBlur={() => setpwdFocus(false)}
            />
          </div>
          <p id='upwdnote' className={`${pwdFocus && !pwdValid ? 'text-white bg-black rounded-md p-1 mt-6' : 'hidden'} text-sm mt-1`}>
            <FaInfoCircle />Is at least 8 characters long.<br />
            Contains at least one uppercase letter, one lowercase letter, one digit, and one special character<br />
            Allowed special charecters: <span aria-label='exclamation mark'>!</span>
            <span aria-label='at symbol'>
              @
            </span>
            <span aria-label='dollar sign'>
              $
            </span>
            <span aria-label='hashtag'>
              #
            </span>
            <span aria-label='percent'>
              %
            </span>
          </p>
          <div className="flex flex-col mt-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="password">CONFIRM PASSWORD:</label>
              <span className={matchPwd && matchPwdValid && pwdValid ? 'text-green-800' : 'hidden'}>
                <FaCheck className='text-2xl' />
              </span>
              <span className={!matchPwdFocus || matchPwdValid ? 'hidden' : 'text-red-600'}>
                <FaTimes className='text-2xl' />
              </span>


            </div>
            <input
              type="password"
              className='mt-2 p-2 rounded-md'
              id='matchpassword'
              onChange={(e) => setmatchPwd(e.target.value)}
              required
              aria-invalid={matchPwdValid ? "false" : "true"}
              aria-describedby="umatchpwdnote"
              onFocus={() => setmatchPwdFocus(true)}
              onBlur={() => setmatchPwdFocus(false)}
            />
          </div>
          <p id='umatchpwdnote' className={`${matchPwdFocus && !matchPwdValid ? 'text-white bg-black rounded-md p-1 mt-6' : 'hidden'} text-sm mt-1`}>
            <FaInfoCircle />Passwords Does'nt match!<br />

          </p>
          <div className='flex justify-center items-center mb-4 mt-8 '>
            <button ref={buttonElement} className='shadow-2xl hover:bg-emerald-600 w-full p-4 rounded-md bg-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed' disabled={!userValid || !pwdValid || !matchPwdValid}>Sign Up</button>

          </div>
          <p className='mt-5 mb-2'>Already Registered?</p>
          <Link className='underline text-lg' to={'/login'}>Sign In Now!</Link>
        </form>
      </section></div>)}
    </section>

  );
}

export default Register;
