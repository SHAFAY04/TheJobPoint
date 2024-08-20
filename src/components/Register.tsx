import React, { useEffect, useRef, useState } from 'react'

const Register = () => {

    const USER_REG=/^[a-zA-Z0-9]([._-]?[a-zA-Z0-9]){2,15}$/
    const PWD_REG=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


   const userRef= useRef<HTMLInputElement|null>(null)
   const errRef= useRef<HTMLInputElement|null>(null)

   const [user,setUser]=useState('')
   const [userValid,setUserValid]=useState(false)
   const [userFocus,setUserFocus]=useState(false)

   const [pwd,setpwd]=useState('')
   const [pwdValid,setpwdValid]=useState(false)
   const [pwdFocus,setpwdFocus]=useState(false)

   const [matchPwd,setmatchPwd]=useState('')
   const [matchPwdValid,setmatchPwdValid]=useState(false)
   const [matchPwdFocus,setmatchPwdFocus]=useState(false)

    const [err,setErr]=useState('')
    const[success,setSucess]=useState(false)


    useEffect(()=>{

        userRef.current?.focus()
    },[])

    useEffect(()=>{

        const result= USER_REG.test(user)
        setUserValid(result)

    },[user])

    useEffect(()=>{

        const pwdresult= PWD_REG.test(user)
        setpwdValid(pwdresult)
        const matchPwdResult= matchPwd===pwd
        setmatchPwdValid(matchPwdResult)

    },[pwd,matchPwd])

    useEffect(()=>{

      setErr('')
    },[user,pwd,matchPwd])

  return (
    <section>

    <p ref={errRef} className={err?"err":"offscreen" } aria-live="assertive">{err}</p>
    <h1>REGISTER</h1>
    <form>
    <label htmlFor="username">USERNAME:</label>
    <input type="text"
     id='username'
      ref={userRef}
       autoComplete="off"
        onChange={(e)=>setUser(e.target.value)}
        required
        aria-invalid={userValid?"false":"true"}
        aria-describedby="uidnote"
        onFocus={()=>setUserFocus(true)}
        onBlur={()=>setUserFocus(false)}

        />
        <p id='uidnote' className=''></p>
        </form>
    </section>
  )
}

export default Register