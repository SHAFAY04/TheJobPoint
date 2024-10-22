import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

const registerApiSlice = createApi({

    reducerPath:'registerApi',
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_BACKEND_URL}`}),
    endpoints:(builder)=>({

        
        postUser:builder.mutation({
            
            query:(newUser)=>({
                url:'/register',
                method:'POST',
                body:newUser
            })
        })
    })
    
})

export default registerApiSlice

export const { usePostUserMutation }=registerApiSlice