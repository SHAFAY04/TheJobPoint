import Card from './Card'
import { Link } from 'react-router-dom'

const HomeCards = () => {
  return (
    <>
      {/* <!-- Developers and Employers --> */}
      <section className="py-10 bg-emerald-100">
        <div className="container-xl lg:container mx-10 my-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">

            <Card background='bg-emerald-600'>
            <div className="bg-emerald-200 p-9 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">For Developers</h2>
              <p className="mt-2 mb-4">
                Browse our React jobs and start your career today
              </p>
              <Link
                to="/jobs"
                className="inline-block bg-emerald-500 text-white rounded-lg px-4 py-2 hover:bg-emerald-700"
              >
                Browse Jobs
              </Link>
              </div>
            </Card>

            <Card background='bg-emerald-600'>
            <div className="bg-emerald-200 p-9 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">For Employers</h2>
              <p className="mt-2 mb-4">
                List your job to find the perfect developer for the role
              </p>
              <Link
                to="/add-job"
                className="inline-block bg-emerald-500 text-white rounded-lg px-4 py-2 hover:bg-emerald-700"
              >
                Add Job
              </Link>
            </div>
            </Card>

            
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeCards