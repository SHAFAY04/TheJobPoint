import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { usePostUserMutation } from '../api/usersApiSlice';
import { nanoid } from '@reduxjs/toolkit';
type newUserType={
  id:string,
  username:string,
  password:string
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

  const [err, setErr] = useState<string|number|undefined>('');
  const[submitted,setSubmitted]=useState(false)

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
const [postUser,{isSuccess,isError,isLoading,error}]=usePostUserMutation()

useEffect(()=>{
if(submitted){
  if(isLoading){
    toast.info('Loading..please wait!')
  }
  else if(isError){
    setTimeout(()=>{
      toast.dismiss()
      setErr('status' in error? error.status : error.message)
      errRef.current?.focus()
      toast.error('Oops! Could`nt register')
  
    },300)
  }
  else{

    toast.success('YAY! registered successfully!')
  }
  
}
  
},[isSuccess,isError,isLoading])

  async function handleSubmit(event: FormEvent): Promise<void> {

    event.preventDefault()
    const v1= USER_REG.test(user)
    const v2= PWD_REG.test(pwd)

    if(!v1||!v2){
      setErr('Invalid Entry')
      return
    }
    const newUser:newUserType={
      id:nanoid(4),
      username:user,
      password:pwd

    }
    console.log(user,pwd)
    postUser(newUser)
    setSubmitted(true)
  }
  return (
    <div className='container m-auto'>
      <section className='bg-emerald-400 shadow-2xl py-14 px-10 mx-48 my-28'>
        <p ref={errRef} className={err ? 'text-red-700 p-2 mb-4 bg-red-200 w-full' : 'hidden'} aria-live="assertive">{err}</p>
        <h1 className='text-3xl mx-16 mb-8 font-thin'>REGISTER</h1>
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
            className='mt-4 p-2 rounded-md w-full'
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
                <FaCheck className='text-2xl'/>
              </span>
              <span className={!pwd || pwdValid ? 'hidden' : 'text-red-600'}>
                <FaTimes className='text-2xl'/>
              </span>
            </div>
            <input
              type="password"
              className='mt-4 p-2 rounded-md'
              id='password'
              onChange={(e) => setpwd(e.target.value)}
              required
              aria-invalid={pwdValid ? "false" : "true"}
              aria-describedby="upwdnote"
              onFocus={() => setpwdFocus(true)}
              onBlur={() => setpwdFocus(false)}
            />
          </div> 
          <p id='upwdnote' className={`${pwdFocus &&  !pwdValid ? 'text-white bg-black rounded-md p-1 mt-6' : 'hidden'} text-sm mt-1`}>
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
              <span className={matchPwd && matchPwdValid &&pwdValid ? 'text-green-800' : 'hidden'}>
                <FaCheck className='text-2xl'/>
              </span>
              <span className={!matchPwdFocus || matchPwdValid? 'hidden' : 'text-red-600' }>
                <FaTimes className='text-2xl'/>
              </span>
              
              
            </div>
            <input
              type="password"
              className='mt-4 p-2 rounded-md'
              id='matchpassword'
              onChange={(e) => setmatchPwd(e.target.value)}
              required
              aria-invalid={matchPwdValid ? "false" : "true"}
              aria-describedby="umatchpwdnote"
              onFocus={() => setmatchPwdFocus(true)}
              onBlur={() => setmatchPwdFocus(false)}
            />
          </div> 
          <p id='umatchpwdnote' className={`${matchPwdFocus &&  !matchPwdValid ? 'text-white bg-black rounded-md p-1 mt-6' : 'hidden'} text-sm mt-1`}>
            <FaInfoCircle />Passwords Does'nt match!<br />
            
          </p>
          <button className='mt-10 shadow-2xl hover:bg-emerald-600 w-full p-2 rounded-md bg-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'  disabled={!userValid || !pwdValid || !matchPwdValid}>Sign Up</button>
          <p className='mt-5 mb-2'>Already Registered?</p>
          <a className='underline' href="#">Sign In</a>
        </form>
      </section>
    </div>
  );
}

export default Register;
