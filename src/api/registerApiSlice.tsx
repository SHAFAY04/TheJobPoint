import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

const registerApiSlice = createApi({

    reducerPath:'usersApi',
    baseQuery:fetchBaseQuery({baseUrl:'/api'}),
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