import React from 'react'
import { RouterProvider } from 'react-router'
import { routes } from './Routes'
import "./features/shared/style/global.scss"
import { AuthProvider } from './features/auth/Auth.contex'

const App = () => {
  
  return (
<AuthProvider>
     <RouterProvider router={routes} />
      

</AuthProvider>
  )
}

export default App