
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface JobSingle {
    id: string;
    type: string;
    title: string;
    description: string;
    salary: string;
    location: string;
    company: {
      name: string,
      description: string,
      contactPhone: string,
      contactEmail: string,
    }
  }

  export interface JobState{

    job:JobSingle,
    jobs:JobSingle [],
    loading:boolean,
    error:string|null,
    
}
const initialState:JobState={
    
    job:{
        id: '0',
        type: '',
        title: '',
        description: '',
        salary: '',
        location: '',
        company: {
            name: '',
            description: '',
            contactPhone: '',
            contactEmail: ''
        }
    },
    jobs:[],
    loading:false,
    error:null,
    
}

export const fetchJobs= createAsyncThunk('jobs/fetchJobs',async ()=>{

    const res= await fetch('/api/jobs')
    const data= await res.json()
    return data 
})
interface Job{
 
    title: string;
    description: string;
    salary: string;
    location: string;
    company:{
      name:string,
      description:string,
      contactPhone:string,
      contactEmail:string,
    }
  }
type editJobProps={

    newJob:Job,
    id:string|undefined
}
  export const jobEdit= createAsyncThunk('jobs/editJobs',async({newJob,id}:editJobProps)=>{


    const res= await fetch(`/api/jobs/${id}`,{

        method:'PUT',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify(newJob)
    })
    const data= res.json()
    return data
  })
  
export const jobAdd = createAsyncThunk('jobs/addJobs',async(newJob:JobSingle)=>{

    const res = await fetch('/api/jobs',{

        method:'POST',
    headers:{
            'Accept':'application/json, plain/text, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify(newJob)
    })
    const data= await res.json()
    return data 
})
export const jobDelete= createAsyncThunk('/jobs/deleteJob',async(id:string|undefined)=>{

    const res= await fetch(`/api/jobs/${id}`,{

        method:'DELETE',
        headers:{

            'Content-type':'application/json'
        }
    })
    const data= await res.json()
    return data

})
export const jobGet= createAsyncThunk('/jobs/getJob',async(id:string|undefined)=>{

    const res= await fetch(`/api/jobs/${id}`)
    const data= await res.json()
    return data

})
const JobSlice = createSlice({

    name:'job',
    initialState:initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder.addCase(fetchJobs.pending,(state)=>{

            state.loading=true,
            state.error=null
        })
        .addCase(fetchJobs.fulfilled,(state,action)=>{
            state.jobs=action.payload,
            state.loading=false,
            state.error=null
        })
        .addCase(fetchJobs.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message|| 'Failed to fetch jobs'
        })
        .addCase(jobAdd.pending,(state)=>{
            
            state.loading=true,
            state.error=null
        })
        .addCase(jobAdd.fulfilled,(state,action)=>{

            state.loading=false,
            state.error=null,
            state.jobs.push(action.payload)
        })
        .addCase(jobAdd.rejected,(state,action)=>{

            state.loading=false,
            state.error=action.error.message||'ERROR ADDING JOB!'
        })
        .addCase(jobEdit.pending,(state)=>{
            state.error=null,
            state.loading=true
        })
        .addCase(jobEdit.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false,
            state.jobs.push(action.payload)
        })
        .addCase(jobEdit.rejected,(state,action)=>{
            state.error=action.error.message||'ERROR EDITING!'
            state.loading=false
        })
        .addCase(jobDelete.pending,(state)=>{
            state.error=null,
            state.loading=true
        })
        .addCase(jobDelete.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false,
            state.jobs=state.jobs.filter(job=>job.id!==action.payload.id)
        })
        .addCase(jobDelete.rejected,(state,action)=>{
            state.error=action.error.message||'ERROR DELETING!'
            state.loading=false
        })
        .addCase(jobGet.pending,(state)=>{
            state.error=null,
            state.loading=true
        })
        .addCase(jobGet.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false,
            state.job=action.payload
        })
        .addCase(jobGet.rejected,(state,action)=>{
            state.error=action.error.message||'ERROR GETTING JOB!'
            state.loading=false
        })
    },
})

export default JobSlice.reducer