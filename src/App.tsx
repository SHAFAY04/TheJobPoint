import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Devs from "./components/Devs"

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
      <Devs />




      {/* <!-- Browse Jobs --> */}
      <section className="bg-emerald-400 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-emerald-600 mb-6 text-center">
            Browse Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <!-- Job Listing 1 --> */}
            <div className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                <div className="mb-6">
                  <div className="text-gray-600 my-2">Full-Time</div>
                  <h3 className="text-xl font-bold">Senior React Developer</h3>
                </div>

                <div className="mb-5">
                  We are seeking a talented Front-End Developer to join our team in Boston, MA. The ideal candidate will have strong skills in HTML, CSS, and JavaScript...
                </div>

                <h3 className="text-indigo-500 mb-2">$70 - $80K / Year</h3>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                  <div className="text-orange-700 mb-3">
                    <i className="fa-solid fa-location-dot text-lg"></i>
                    Boston, MA
                  </div>
                  <a
                    href="job.html"
                    className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Job Listing 2 --> */}
            <div className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                <div className="mb-6">
                  <div className="text-gray-600 my-2">Remote</div>
                  <h3 className="text-xl font-bold">Front-End Engineer (React)</h3>
                </div>

                <div className="mb-5">
                  Join our team as a Front-End Developer in sunny Miami, FL. We are looking for a motivated individual with a passion...
                </div>

                <h3 className="text-indigo-500 mb-2">$70K - $80K / Year</h3>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                  <div className="text-orange-700 mb-3">
                    <i className="fa-solid fa-location-dot text-lg"></i>
                    Miami, FL
                  </div>
                  <a
                    href="job.html"
                    className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Job Listing 3 --> */}
            <div className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                <div className="mb-6">
                  <div className="text-gray-600 my-2">Remote</div>
                  <h3 className="text-xl font-bold">React.js Developer</h3>
                </div>

                <div className="mb-5">
                  Are you passionate about front-end development? Join our team in vibrant Brooklyn, NY, and work on exciting projects that make a difference...
                </div>

                <h3 className="text-indigo-500 mb-2">$70K - $80K / Year</h3>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                  <div className="text-orange-700 mb-3">
                    <i className="fa-solid fa-location-dot text-lg"></i>
                    Brooklyn, NY
                  </div>
                  <a
                    href="job.html"
                    className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <a
          href="jobs.html"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs</a>
      </section>
    </>
  )
}

export default App