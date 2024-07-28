import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import HomeCards from "./components/HomeCards"
import JobListing from "./components/JobListing"
import ViewAllJobs from "./components/ViewAllJobs"

//Note that the dist folder is only generated
//when you run the build command. During 
//development, Vite uses in-memory compilation to
//serve your app, so you won't see the compiled
//JavaScript files on disk.

//if you're in tsx i.e; the return div of the
//component you cant right normal comments instead
//you'll comment like this 
{/* LIKE THIS */ }

//create variables here its basic ts out here
//while in the return of a component its all tsx
let name: string = 'shafay'
let x: number = 20
let y: number = 10
let names = ['sara', 'jonathon', 'oakley']
let loggedIn = true
let styles = {
  color: 'green'
}


//use rafce to create a react component!
//like the following

const App = () => {
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
    
      {/*to put inline css one you use 2 {} */}
      <div style={{ color: 'red' }} className='text-5xl underline'>Hello {name}</div>
      <br></br>
      <p style={styles}>The sum of {x} and {y} is: </p>
      <p>{x + y}</p>
      <br></br>
      <ul>
        {/*you cant do names.foreach here because
      //React expects a reactNode while the foreach
      //method returns void so you gotta use map*/}
        {names.map((name, index) => (
          //each list item must have unique keys
          <li key={index}>{name}</li>
        ))}
      </ul>
      {/*react supports single liners we can't
        use an if statement so we use ternary*/}
      {loggedIn ? <h1>HELLO MEMBER</h1> : ''}
      {/*or you can simply do this: */}
      {loggedIn && <h1>HELLO MEMBER</h1>}

      {/*NOW JUST COPYING SOME TAILWIND UI BY
          BRAD FOR NOW TO LEARN REACT*/}

      {/*Now we dont want this these are too
        many components in a parent component so we 
        have to break them so now we will break 
        them into different files and import them
        like we are importing our navbar on the 
        top of the page  */}
      <Navbar />
    { /*now we can pass in props to a component
      //which will be its attributes*/}
    {/*the reactNode element needs to be in between
      the two html tags of that component*/}
      <Hero title='React Props' subtitle="THIS IS TEST SUBTITLE">
       Now this is the reactNode, this is how you pass it to the component
      </Hero>
      <HomeCards />
      <JobListing/>
      <div>
      <ViewAllJobs />
      </div>

      {/*Now talking about states there are
       component states of individual components
       and then there is a global state which
       belongs to the which relates to entire
       app, so now we will see the component state
       and change the state of the job component using
       useState() hook*/}
    </>
  )
}

export default App