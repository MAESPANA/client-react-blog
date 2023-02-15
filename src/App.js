import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Footer from "./component/Footer";
import  Navbar  from "./component/Navbar";

import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './style.scss'

//rotes hijas
const Layout= () => {
  return(
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  );
}
//routes con router dom
const router =createBrowserRouter([

  {
    path:"/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element: <Single/>
      },
      {
        path:"/write",
        element: <Write/>
      },
      
    ]
  },
  {
    path:"/login",
    element: <Login/> ,
  },
  {
    path:"/register",
    element: <Register/>
  },

])

function App() {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router}/>
      </div>

    </div>
  );
}




export default App;
