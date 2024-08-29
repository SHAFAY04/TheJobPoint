import {  createContext,  ReactNode,  useState } from "react";

interface AuthContextType {
    auth:{
      user:string,
      pwd:string
    }
    setAuth: React.Dispatch<React.SetStateAction<{user:string,pwd:string}>>;
}
  
  // Define a default value for the context
  const AuthContext = createContext<AuthContextType>({auth:{user:'',pwd:''},setAuth:()=>{}})

interface AuthProviderProps {
    children: ReactNode; // Define the type for children
  }

export const AuthProvider=({ children }: AuthProviderProps)=>{

    const [auth,setAuth]=useState<{user:string,pwd:string}>({
      user:'',
      pwd:''
    })

    return(

        <AuthContext.Provider value={{auth,setAuth}}>{children}</AuthContext.Provider>
    )
}

export default AuthContext