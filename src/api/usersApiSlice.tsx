import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

import React from 'react'

const usersApiSlice = createApi({

    reducerPath:'usersApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8001'}),
    endpoints:(builder)=>({

        getUsers:builder.query({

            query:()=>'/users'
        }),
        postUser:builder.mutation({
            
            query:(newUser)=>({
                url:'/users',
                method:'POST',
                body:newUser
            })
        })
    })
    
})

export default usersApiSlice

export const { useGetUsersQuery,usePostUserMutation }=usersApiSlice