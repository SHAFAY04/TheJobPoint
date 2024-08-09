import { useState,useEffect } from "react";



const useWindowResize = () => {
  
    const [size,setSize]=useState<{
        width: number|undefined;
        height: number|undefined;
}>({

        width:undefined,
        height:undefined,
    })
    useEffect(()=>{

    const handleResize=()=>{

        setSize({
            width:window.innerWidth,
            height:window.innerHeight
        })
        
    }
   
    handleResize()

    window.addEventListener('resize',handleResize)
    
    const cleanup=()=>{

        window.removeEventListener('resize',handleResize)
    }

    return cleanup
},[])

return size 
}

export default useWindowResize