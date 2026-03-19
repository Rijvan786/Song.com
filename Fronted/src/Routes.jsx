import {createBrowserRouter} from "react-router"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"
import Protected from "./features/auth/components/Protected"
import Home from "./features/Home/pages/Home"
import MyHome from "./features/Home/components/MyHome"


export const routes=createBrowserRouter([
    { 
        path:"/",
        element:<MyHome/>

    }
,
    {
        path:"/Protected",
        element:<Protected>
            <Home/>
        </Protected>
    },
    {
        path:"/Register",
        element:<Register/>
    },
    {
        path:"/Login",
        element:<Login/>
    },
    
])

