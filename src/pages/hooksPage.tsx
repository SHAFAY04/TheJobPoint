import React, { act, useMemo, useReducer, useRef, useState } from 'react'

const hooksPage = () => {

    const [number,setNumber]=useState<number>(19)

    const inputRef=useRef<HTMLInputElement>(null)
    console.log(inputRef.current)
    console.log(inputRef?.current?.value)

    type fibfunc=(n:number)=>number
    const fib:fibfunc=(n:number)=>{

       if(n<2)return n

       return fib(n-1) + fib(n-2)
           
    }
const result= useMemo(()=>fib(number),[number])

let initState={
    
    count:0,
    color:'text-black'
}
 enum REDUCER_ACTION_TYPES{

    INCREMENT,
    DECREMENT,
    CHANGECOLOR
    
}
type reducerAction={

    type: REDUCER_ACTION_TYPES,
    payload? : string


}
const reducer=(state:typeof initState, action:reducerAction):typeof initState=>{


    switch (action.type) {
        case REDUCER_ACTION_TYPES.INCREMENT:
            return {...state, count:state.count+1}
        case REDUCER_ACTION_TYPES.DECREMENT:
            return {...state,count:state.count-1}    
        case REDUCER_ACTION_TYPES.CHANGECOLOR:
            return {...state, color:action.payload as string}    
    
        default:
            throw new Error()
    }
}
 const [state,dispatch]=useReducer(reducer,initState)
 const increment=()=>{
    dispatch({type:REDUCER_ACTION_TYPES.INCREMENT})
 }
 const decrement=()=>{
    dispatch({type:REDUCER_ACTION_TYPES.DECREMENT})
 }
 const changeColorState=(newColor:string)=>{
    dispatch({type:REDUCER_ACTION_TYPES.CHANGECOLOR,payload:newColor})
 }

  return (
    
    <>
    <div className='bg-emerald-300'>
        <div className='grid md:grid-cols-2 sm:grid-cols-1 m-auto gap-4 pt-16 pb-16 pl-6 pr-6 '>
            <div className='p-5 shadow-lg bg-white '>
                <h2 className='font-bold font-serif text-2xl mb-4'>
                    UseMemo() Hook!
                </h2>
                <p className='font-mono italic mb-4'>The useMemo hook is used for complex or computationaly expensive mathematical operations or functions which could possibly crash the browser so we use the useMemo hook which kinda performs the expensive calculation takes some time for the first time but then it actually memoizes the result and takes no time at all every other time the component re-renders and that really speeds up the process just know that useMemo is to be used only when there is an expensive calculation and when there is a need for optimization    </p>
                <p> the fibonacci sequence for the given number {number} is {result}</p>
<input ref={inputRef} className='p-1' type="number" name="num" id="numfield" placeholder='Enter a number' onChange={(e)=>setNumber(e.target.value as unknown as number)}  />

            </div>
            <div className='p-5 shadow-lg bg-white '>
                <h2 className='font-bold font-serif text-2xl mb-4'>
                    UseReducer() Hook!
                </h2>
                <p className='font-mono italic mb-4'>The useReducer hook is an alternative to the useState hook and is prefferable over the useState hook when you have complex state logic that involves multiple subvalues for example you have to send a lot of states as a prop to a component so useReducer can make the work easier by handling all of those states it is useful for understanding reducer functions and global state that's used in redux or other state management libraries</p>
                <p  className='mb-4'>Count with UseReducer: {state.count} </p>
                <div className='inline-flex mb-4'>
                <button className='text-3xl px-2  border-black border-x-2 shadow-lg rounded-md bg-emerald-200 mx-4 hover:bg-emerald-300' onClick={increment}>+</button>
                <button  className='text-3xl px-3  border-black border-x-2 shadow-lg rounded-md bg-emerald-200 hover:bg-emerald-300'onClick={decrement}>-</button>
                </div>
                <p id='variableColorText' className={`mb-4 text-2xl ${state.color}`}>THE BLACK COLOR STATE</p>
                <button className='ml-3 border-x-2  rounded-md p-2 border-black bg-emerald-200 hover:bg-emerald-300 ' onClick={()=>changeColorState('text-blue-300')}>Change Color</button>
                
            </div>

        </div>
    </div>
    </>
  )
}

export default hooksPage