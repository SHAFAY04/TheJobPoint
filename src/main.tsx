import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import  store  from './store.tsx'
import { Provider  } from 'react-redux'
import { apiSlice } from './api/apiSlice.tsx'
import { ApiProvider } from '@reduxjs/toolkit/query/react'

//The ! operator is used to assert that the 
//result is not null, effectively telling TScript
// "I know this will not be null, trust me".
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
    <Provider store={store}>
    <App />
    </Provider>
    </ApiProvider>
  </React.StrictMode>,
)
