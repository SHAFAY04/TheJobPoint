import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type refreshResponse={
    accessToken:string,
    roles:object,
    user:string
}

export const refreshApiSlice = createApi({

    baseQuery:(fetchBaseQuery({baseUrl:`https://thejobpoint.onrender.com`,credentials:'include'})),
    reducerPath:'refreshApi',
    endpoints:(builder)=>({

        refresh:builder.query<refreshResponse,void>({
            query:()=>'/refresh'
        })
    })
})

export const {useRefreshQuery}=refreshApiSlice