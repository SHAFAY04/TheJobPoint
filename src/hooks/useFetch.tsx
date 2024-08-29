import  {  useEffect, useState } from 'react'

const useFetch = (dataUrl:string) => {
    
    const[data,setdata]=useState<object[]>([])
    const[loading,setloading]=useState(true)
    const [responseError,setResponseError]=useState<unknown>(null)
    useEffect(()=>{

        let isMounted=true

    const fetchData=async()=>{

        try{
        const res= await fetch(dataUrl)
        const data= await res.json()
        if(isMounted){
            setdata(data)
        }
        }
        catch (error) {
      if(isMounted){
        console.log('Error Fetching ',error)
        setResponseError(error)
        setdata([])
      }
            
          }
        finally{
            if(isMounted){
                setloading(false)
            }
            
        }        
    }

    fetchData()
    
    return () => {
        isMounted = false; // Cleanup to avoid setting state on unmounted component
      };
    },[dataUrl])

    return {data,loading,responseError}
}

export default useFetch