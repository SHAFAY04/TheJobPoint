import{  ReactNode } from 'react'

type headingProps={title?:string,children:ReactNode, subtitle?:string}


//A REACT COMPONENT CAN HAVE PARAMETERS/ATTRIBUTES
//AS YOU CAN SEE
const Hero = ({title='Become A React Dev',children,subtitle}:headingProps) => {
  return (
    <>
    {/* <!-- Hero --> */}
    <section className="bg-emerald-600 py-20 mb-0">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
        >
          <div className="text-center">
            <h1
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
            >
              {title}
            </h1>
            <p>
              {  /*this will be a reactNode*/}
                {children}
            </p>
            <p className="my-4 text-xl text-white">
              {subtitle}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero