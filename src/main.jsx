import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router-dom'


import AuthProvider from './Provider/AuthProvider'
import Router from '../src/Routes/Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
   
    <RouterProvider router={Router}></RouterProvider>
    </AuthProvider>
    
  </StrictMode>,
)
