import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Creds{

    username:string,
    password:string
}

const authApiSlice=createApi({

    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:'/api',credentials:'include'}),
    endpoints:(builder)=> ({
        
        postUser:builder.mutation<void,Creds>({

            query:(deets:Creds)=>({

                url:'/auth',
                method:'POST',
                body:deets,
            })
        })
    }),

})

export default authApiSlice

export const {usePostUserMutation}=authApiSlice