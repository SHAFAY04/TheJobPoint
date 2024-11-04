import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Back from '../components/JobBack';
import JobIntro from '../components/JobIntro';
import JobDesc from '../components/JobDesc';
import JobCompanyInfo from '../components/JobCompanyInfo';
import Spinners from '../components/spinners';
import Errorpage from './ErrorPage';
import { useGetJobQuery, useDeleteJobMutation, useGetJobsQuery } from '../api/authApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit/react';

interface Job {
  employer: string;
  jobid: string;
  jobtype: string;
  title: string;
  jobdescription: string;
  salary: string;
  location: string;
  company: {
    name: string;
    description: string;
    contactphone: string;
    contactemail: string;
  };
}

const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, isLoading, isError, error } = useGetJobQuery(id);
  const user = useSelector((state: RootState) => state.auth.username);

  const [jobPoster, setJobPoster] = useState(false);

  // deleteJob state
  const [deleteJob, { isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess }] = useDeleteJobMutation();
  const [deleteSubmitted, setDeleteSubmitted] = useState(false)

  useEffect(() => {
    if (job && !isLoading && !isError) {
      user === job.employer ? setJobPoster(true) : setJobPoster(false);
    }
  }, [job, isLoading, isError]);

  const { refetch } = useGetJobsQuery(); // to trigger refetch

  const onButtonDelete = async () => {
    const confirm = window.confirm('Are you sure you wanna do this?');
    if (!confirm) return;

    try {
      setDeleteSubmitted(true)
      await deleteJob(job).unwrap();
      refetch()

    } catch (e) {
      toast.dismiss()
      if ('status' in (e as FetchBaseQueryError)) {
        const error = e as FetchBaseQueryError
        if (error.data && typeof error.data === 'object' && 'message' in error.data) {
          toast.error(`${error.status}: ${error.data.message}`)

        }
      }
      else {
        if ('message' in (e as SerializedError)) {
          const error = e as SerializedError
          toast.error(`${error.code}: ${error.message}`)
        }
      }

    }
  };
  useEffect(() => {

    if (deleteSubmitted) {


      if (isDeleteLoading) {
        toast.info('Loading...')
      }

      if (isDeleteSuccess) {
        toast.dismiss()
        toast.success('Deleted Successfully!')
        setTimeout(() => {
          
          navigate('/jobs')
        }, 1500)

      }
    }
  }, [deleteSubmitted, isDeleteLoading, isDeleteSuccess])
  return (
    <>
      <Back />
      {isLoading ? (
        <div className="mt-64">
          <Spinners loading={isLoading} />
        </div>
      ) : isDeleteLoading ? (<div className="mt-64">
        <Spinners loading={isDeleteLoading} />
      </div>) : isError ? (
        <Errorpage error={error} />
      ) : isDeleteError ? (
        <Errorpage error={deleteError} />
      ) : (
        <section className="bg-emerald-300">
          <div className="container m-auto py-10 px-4">
            <div className="grid sm:grid-cols-1 md:grid-cols-[70%_30%] lg:grid-cols-[7fr_3fr] w-full gap-6">
              <main>
                <JobIntro job={job as Job} />
                <JobDesc job={job as Job} />
              </main>
              <aside>
                <JobCompanyInfo job={job as Job} />
                {jobPoster && (
                  <div className='p-6 mt-6 bg-white rounded-xl shadow-2xl'>
                    <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                    <Link to={`/edit-job/${job.jobid}`} className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Edit Job</Link>

                    <button onClick={onButtonDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                      Delete Job
                    </button>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default JobPage;
