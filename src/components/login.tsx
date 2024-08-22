import React, { FormEvent, useEffect, useRef, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'






const login = () => {
  
  const {setAuth}=useContext(AuthContext)
  
  const userRef=useRef<HTMLInputElement|null>(null)
  const errRef=useRef(null)

  const [err,setErr]=useState('')
  const[user,setUser]=useState('')
  const [pwd,setPwd]=useState('')

  function submitLoginForm(e:FormEvent): void {

    e.preventDefault()
    
    setAuth({user:user,pwd:pwd})
        
}

  useEffect(()=>{
    userRef.current?.focus()
  },[])
  
  useEffect(()=>{
    setErr('')
  },[user,pwd])

  

  return (
    <section>
<div className='bg-emerald-300 py-64'>
<div className='bg-emerald-500 py-14 mx-72 px-12'>
    <form onSubmit={submitLoginForm}>

{/*aria-live:assertive will make the screen reader read the paragraph when the paragraph is in focus*/}
<p aria-live="assertive" ref={errRef} className={err?' mb-4 text-red-600 bg-red-300 p-2 w-full':'hidden'}>{err}</p> 
    <label htmlFor="username" className='text-2xl' >USERNAME:</label>
    <br />
    <input ref={userRef} id='username' type="text" className='p-3 mb-6 mt-4 w-full'
    required
    onChange={(e)=>setUser(e.target.value)}
    value={user}
    autoComplete="off"

    />
    <br />
    <label htmlFor="pwd"  className='text-2xl' >PASSWORD:</label>
    <br />
    <input type="password" 
    id='pwd' 
    className='p-3 mb-8 mt-4 w-full'
    required
    onChange={(e)=>setPwd(e.target.value)}
    value={pwd}
     />
     <button type='submit' className='bg-emerald-300 rounded-md p-4 hover:bg-emerald-600 ml0 mb-6 disabled:bg-gray-300 w-full' disabled=
     {!user||!pwd}>LOG IN!</button>
<p className='text-lg mb-4'>Don't have an account?</p>  <a href="#" className='underline text-lg'>Register Here!</a>
    </form>
</div>
</div>
    </section>
  )
}

export default login