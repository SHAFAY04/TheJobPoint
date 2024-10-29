import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const refreshApiSlice = createApi({

    baseQuery:(fetchBaseQuery({baseUrl:'api'})),
    reducerPath:'refreshApi',
    endpoints:(builder)=>({

        refresh:builder.query({
            query:()=>'/refresh'
        })
    })
})

export const {useRefreshQuery}=refreshApiSlice