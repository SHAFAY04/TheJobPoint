import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const refreshApiSlice = createApi({

    baseQuery:(fetchBaseQuery({baseUrl:'api'})),
    reducerPath:'refreshApi',
    endpoints:(builder)=>({

        refresh:builder.query({
            query:()=>({
                url:'/refresh',
                credentials:'include'
            })
        })
    })
})

export const {useRefreshQuery}=refreshApiSlice