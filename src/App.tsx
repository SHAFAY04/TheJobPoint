import Errorpage from './pages/ErrorPage'
import Jobspage from './pages/jobspage'
import MainLayout from './layouts/MainLayout'
import Homepage from './pages/homepage'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import JobPage from './pages/JobPage'
import './index.css'; // Include this for custom Tailwind styl
import AddJobPage from './pages/addJobPage'
import EditJobPage from './pages/EditJobPage'
import { useState } from 'react'
import HooksPage from './pages/hooksPage'
import { createContext } from 'react'
import Register from './components/Register'
import Login from './components/login'
import RequireAuth from './auth/requireAuth'
import PersistLogin from './auth/persistLogin'

//Note that the dist folder is only generated
//when you run the build command. During 
//development, Vite uses in-memory compilation to
//serve your app, so you won't see the compiled
//JavaScript files on disk.

//if you're in tsx i.e; the return div of the
//component you cant right normal comments instead
//you'll comment like this 
// {/* LIKE THIS */ }

//create variables here its basic ts out here
//while in the return of a component its all tsx
// let name: string = 'shafay'
// let x: number = 20
// let y: number = 10
// let names = ['sara', 'jonathon', 'oakley']
// let loggedIn = true
// let styles = {
//   color: 'green'
// }

//sending user prop to hooksPage without Prop drilling!
//you have to provide a default value which will be used only if this userContext is used in a component without wrapping that component in a provider!
//and you need to export this context
export const userContext=createContext('ANTHONY')

//we will create all the add, edit, delete methods here
// interface Job{
 
//   title: string;
//   description: string;
//   salary: string;
//   location: string;
//   company:{
//     name:string,
//     description:string,
//     contactPhone:string,
//     contactEmail:string,
//   }
// }

// const addJob=async(job:Job)=>{

//   let res= await fetch('/api/jobs',{
//     method:'POST',
//     headers:{
//       'Content-type':'application/json',
//     },
//     body:JSON.stringify(job)
//   })
// }

const deleteJob= async(id:string)=>{

  const res= await fetch(`/api/jobs/${id}`,{
    method:'DELETE'
  })
  res.ok
 
}
export const deleteJobContext=createContext(deleteJob)

// const editJob=async(id:any,editedJob:Job)=>{

//     const res= await fetch(`/api/jobs/${id}`,{
      
//       method:'PUT',
//       headers:{

//         'Accept':'application/json, text/plain, */*',
//         'Content-type':'application/json'
//       },
//       body:JSON.stringify(
//           editedJob
//       )
    

//     })
// }
// export const editJobContext=createContext(editJob)

 
//use rafce to create a react component!
//like the following

const App = () => {
  const [user]=useState('DAVID')
  
const router = createBrowserRouter(createRoutesFromElements(
<>
  //LAYOUTS
  //okay so we use layouts for mostly used components like nav bar like this we just wrap all the child routes inside the layout route and when we do this we have to use outlet in the layout file to display the child routes and you can see that in the MainLayout.tsx
  
<Route path='/' element={<MainLayout/>}>

{/*the :id is dynamic its a variable for any id that you pass in for examples job/1 */}
{/*here we are passing in that dataloader */}
<Route element={<PersistLogin/>}>
<Route index element={<Homepage />}/>
<Route element={<RequireAuth allowedRoles={[2024]}/>}>
<Route path='/jobs' element={<Jobspage/>}/>
</Route>
<Route element={<RequireAuth allowedRoles={[2024]}/>}>
<Route path='jobs/:id' element={<JobPage />} />
</Route>
<Route element={<RequireAuth allowedRoles={[1998,2004]}/>}>
<Route path='/edit-job/:id'element={<EditJobPage />}/>
<Route path='/add-job' element={<AddJobPage/>}/>
</Route>
</Route>
<Route path='/hooks' element={<userContext.Provider value={user}><HooksPage/></userContext.Provider>}/>

<Route path='*' element={<Errorpage error={{status:404,data:{message:'Oops Page not found!'}}}/>}/>

</Route>
  <Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>
</>))


  return (
    //this html like syntax is TSX not html
    //we use classNameName in TSX because class is
    //a reserved keyword in typescript 

    //also you can return only 1 component/element
    //there can be much stuff in that 1 element
    //but it can only return 1
    //so you cant do the following two lines
    // <div className='text-5xl font-bold underline'>Hello {name}</div>
    // <p>hello</p>

    //but you can do this if you want 2 components
    <>
        <RouterProvider router={router} />
    
      {/*to put inline css one you use 2 {} */}
      {/* <div style={{ color: 'red' }} className='text-5xl underline'>Hello {name}</div>
      <br></br>
      <p style={styles}>The sum of {x} and {y} is: </p>
      <p>{x + y}</p>
      <br></br>
      <ul> */}
        {/*you cant do names.foreach here because
      //React expects a reactNode while the foreach
      //method returns void so you gotta use map*/}
        {/* {names.map((name, index) => (
          //each list item must have unique keys
          <li key={index}>{name}</li>
        ))}
      </ul> */}
      {/*react supports single liners we can't
        use an if statement so we use ternary*/}
      {/* {loggedIn ? <h1>HELLO MEMBER</h1> : ''} */}
      {/*or you can simply do this: */}
      {/* {loggedIn && <h1>HELLO MEMBER</h1>} */}

      {/*NOW JUST COPYING SOME TAILWIND UI BY
          BRAD FOR NOW TO LEARN REACT*/}

      {/*Now we dont want this these are too
        many components in a parent component so we 
        have to break them so now we will break 
        them into different files and import them
        like we are importing our navbar on the 
        top of the page  */}
      {/* <Navbar /> */}
      { /*now we can pass in props to a component
      //which will be its attributes*/}
      {/*the reactNode element needs to be in between
      the two html tags of that component*/}
      {/* <Hero title='React Props' subtitle="THIS IS TEST SUBTITLE">
       Now this is the reactNode, this is how you pass it to the component
      </Hero>
      <HomeCards />
      <JobListing/>
      <ViewAllJobs /> */}


      {/*Now talking about states there are
       component states of individual components
       and then there is a global state which
       belongs to the which relates to entire
       app, so now we will see the component state
       and change the state of the job component using
       useState() hook and you can see it in the
       JobListing component*/}

    </>
  )
}

export default App