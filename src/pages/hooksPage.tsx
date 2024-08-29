import  {  useCallback, useEffect, useMemo, useReducer, useRef, useState, useContext, ChangeEvent } from 'react'
import { userContext } from '../App'
import { useTransition} from 'react'

const hooksPage = () => {

    //USEMEMO() HOOK!
    const [number,setNumber]=useState<number>(19)

    const inputRef=useRef<HTMLInputElement>(null)
    console.log(inputRef.current)
    console.log(inputRef?.current?.value)

    type fibfunc=(n:number)=>number
    const fib:fibfunc=(n:number)=>{

       if(n<2)return n

       return fib(n-1) + fib(n-2)
           
    }
    //if you remove this useMemo and directly call the fib function then every time the hooksPage render for instance everytime i increment the counter on the useReducer lesson this fib func with do calculations again and again making the system slow down!
const result= useMemo(()=>fib(number),[number])

//USEREDUCER() HOOK!
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

 //USECALLBACK HOOK!
    const [Result,setResult]=useState(0)
    const [ResultWithoutUseCalback,setResultWithoutUseCalback]=useState(0)
    const [num1]=useState(9)
    const [num2]=useState(8)
    const [num3]=useState(4)
    const [num4]=useState(4)
    const [colorstate,setcolorState]=useState('text-black')

    const sum=()=>{return num1+num2}
    //this useEffect will run on every render/change of state because every time the component renders the function reference changes
    useEffect(()=>{
        console.log(sum())
        setResultWithoutUseCalback(sum())
    },[sum])

    //as the dependencies of this function num3 or num4 changes the function reference will change causing the useEffect to run
    const sumWithUseCallback=useCallback(()=> num3+num4 ,[num3,num4])
    //this useEffect will only run on the first render since the sumWithUseCallBack function uses the useCallback hook
    useEffect(()=>{
        console.log(sumWithUseCallback())
        setResult(sumWithUseCallback())
    },[sumWithUseCallback])

    function changeState(newColor:string): void {
        setcolorState(newColor)

        if(colorstate===newColor){
            setcolorState('text-black')
        }

    
    }
    //USECONTEXT HOOK!
    const [user,setUser]=useState('')
    const useContextValue= useContext(userContext)
    function getPropFromAppWithoutDrilling(): void {
    //you cannot do this! the hooks are to be used only and only inside of a functional component nowhere else!
        // setUser(useContext(userContext))
        setUser(useContextValue)
    }

    //USEREF() HOOK!
    const [count,setCount]=useState(0)
    const changeStateWithUseState=()=>{

        setCount(count+1)
    }
    const countref=useRef(0)
    const changeStateWithUseRef=()=>{

        countref.current++
    }

    const ref=useRef<HTMLInputElement|null>(null)
    const focusOnInput=()=>{

        ref.current?.focus()
    }

    useEffect(()=>{

        console.log('RE RENDERING !!!')
    })

    //USETRANSITION HOOK!

    const [isPending,startTransition]=useTransition()
    const[list,setList]=useState<string[]>([])
    const renderlist=(e:ChangeEvent<HTMLInputElement>)=>{

        
        startTransition(()=>{ const list:string[]=[]
            const listSize=2000
    
            for (let i = 0; i < listSize; i++) {
               
                list.push(e.target.value)
                
            }
            setList(list)
    })
       

    }

    
  return (
    
    <>
 
        <div className='grid md:grid-cols-2 sm:grid-cols-1 m-auto gap-4 pt-16 pb-16 pl-6 pr-6 lg:px-40'>
            {/* USEMEMO HOOK()! */}
            <div className='p-5 shadow-lg bg-white '>
                <h2 className='font-bold font-serif text-2xl mb-4'>
                    UseMemo() Hook!
                </h2>
                <p className='font-mono italic mb-4'>The useMemo hook is used for complex or computationaly expensive mathematical operations or functions which could possibly crash the browser so we use the useMemo hook which kinda performs the expensive calculation takes some time for the first time but then it actually memoizes the result and takes no time at all every other time the component re-renders and that really speeds up the process just know that useMemo is to be used only when there is an expensive calculation and when there is a need for optimization    </p>
                <p> the fibonacci sequence for the given number {number} is {result}</p>
<input ref={inputRef} className='p-1' type="number" name="num" id="numfield" placeholder='Enter a number' onChange={(e)=>setNumber(e.target.value as unknown as number)}  />

            </div>
            {/* USEREDUCER HOOK()! */}
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

{/* USECALLBACK HOOK()! */}
            <div className='p-5 shadow-lg bg-white '>
                <h2 className={`font-bold font-serif text-2xl mb-4 ${colorstate}`}>
                    UseCallBack() Hook!
                </h2>
                <p className='font-mono italic mb-4'>The useCallback hook in React is used to memoize functions so that they are not re-created on every render.if your function is being used as a dependency to a hook for instance the useEffect hook, everytime the component renders even tho your function is not changed the useEffect will run while it should only run when the function is changed this happens because the function reference changes on every render and using the useCallBack hook can help you memoizing the function ensuring that the same function reference is used between renders </p>
               {/* without the useCallBack you will see the useEffect running on every render */}
                <p  className='mb-4'>sum without useCallback:{ResultWithoutUseCalback} </p>
                <p  className='mb-4'>sum with useCallback:{Result} </p>
                <div className='inline-flex mb-4'>
                <button className='text-2xl px-2  border-black border-x-2 shadow-lg rounded-md bg-emerald-200 mx-4 hover:bg-emerald-300' onClick={()=>changeState('text-purple-300')}>Change State and Check Console</button>
                </div>
                
            </div>

            {/* USECONTEXT HOOK()! */}
            <div className='p-5 shadow-lg bg-white '>
                <h2 className={`font-bold font-serif text-2xl mb-4 ${colorstate}`}>
                    UseContext() Hook!
                </h2>
                <p className='font-mono italic mb-4'>Context is a powerful way to pass down a prop from a parent component through multiple levels of childcomponents it lets you just jump through the components so if you have tons of nested components you dont have to keep passing your prop down to children components until it reaches the desired component(this is known as prop drilling and we dont want this) you can just createContext in the parent and then use that context in the component you want it in skipping all the middle nested components that dont actually need that prop </p>
               
                <p  className='mb-4'>Hello {user} from App Component: </p>
                
                <button className='text-2xl px-2  border-black border-x-2 shadow-lg rounded-md bg-emerald-200 mx-4 hover:bg-emerald-300' onClick={()=>getPropFromAppWithoutDrilling()}>Get Prop From App! </button>
                
                
            </div>
            {/* USEREF HOOK()! */}
            <div className='p-5 shadow-lg bg-white '>
                <h2 className={`font-bold font-serif text-2xl mb-4 ${colorstate}`}>
                    UseRef() Hook!
                </h2>
                <p className='font-mono italic mb-4'>One of the most common uses of useRef is to access and manipulate DOM elements directly.The difference between the useRef and useState hook is that when the state changes the useRef hook does not causes the component to reRender while on the other hand the useState hook makes the component to re-Render its used for storing mutable values that persist across renders, and avoiding re-renders when updating these values. one of its uses is given down below to focus on a dom element and the useEffect example is given up in the code where if you use useRef to change the state of a counter the Page wont re-render while if you use UseState to increase the counter the page will re-render every time uses:Timers,Intervals,Animations,focus,Transitions  </p>                
                <p></p>
                <input ref={ref} className='mb-4 p-2 rounder-md ' type="text" name="entertext" placeholder='Enter Some Text' id="entertext" />
                <div className='flex inline-flex'>
                <button className='p-3 mr-3 bg-emerald-200 hover:bg-emerald-400' onClick={focusOnInput}>focus On Input By useREF!</button>
                <button className='p-3 mr-3 bg-emerald-200 hover:bg-emerald-400' onClick={changeStateWithUseState}>change State With useState!</button>
                <button className='p-3 bg-emerald-200 hover:bg-emerald-400' onClick={changeStateWithUseRef}>change State With useREF!</button>

                </div>
            </div>
            {/* USETRANSITION HOOK()! */}
            <div className='p-5 shadow-lg bg-white '>
                <h2 className={`font-bold font-serif text-2xl mb-4 ${colorstate}`}>
                    UseTransition() Hook!
                </h2>
                <p className='font-mono italic mb-4'>UseTransition hook allows you to set the priority of an action to low just to avoid a very stuttering user experience it kind of breaks the operation into multiple renders and render the high priority action first
                    for example in the following input box if you enter a lot of text very fastly it may take some time or it may stuttering while typing fastly or removing fasly because of this expensive action but if i use the useTransition hook on rendering the text the text box will behave smoothly, remember just to use this when you are having performance issues because of a too resource consuming process </p>                
                
                <input  onChange={renderlist} className='mb-4 p-2 rounder-md ' type="text" name="entertext" placeholder='Enter Some Text' id="entertext" />
                {list.map((item,index)=>{return <div key={index}>{isPending?'loading': item}</div>})}
                <div className='flex inline-flex justify-center'>
                {/* <button className='p-3 mr-3 bg-emerald-200 hover:bg-emerald-400' onClick={focusOnInput}>focus On Input By useREF!</button>
                <button className='p-3 mr-3 bg-emerald-200 hover:bg-emerald-400' onClick={changeStateWithUseState}>change State With useState!</button> */}

                </div>
            </div>
        </div>
    </>
  )
}

export default hooksPage