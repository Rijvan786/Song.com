import React from 'react'
import { RouterProvider } from 'react-router'
import { routes } from "./App.routes"
import "../features/shared/style/global.scss"
import { ErrorBoundary } from './Error.bound'
import { ToastProvider } from '../features/shared/context/ToastContext'

const App = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
      
          <RouterProvider router={routes} />
   
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App