import { useContext } from "react";
import { Navigate, Outlet, RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./providers/AuthProvider";
import { AuthContext } from "./context/AuthContext";
import Users from "./pages/users";
import Account from "./pages/account";



const PrivateAdminRoutes = () => {
  const { isAuth, loading, user } = useContext(AuthContext);

  const location = useLocation();

  if(loading) return <div>Loading...</div>

  if(!isAuth) return <Navigate to="/login" state={{ from: location }} />

  if(user?.role !== "admin") return <Navigate to="/account" state={{ from: location }} />
  return <Outlet/>

}

const PrivateRoutes = () => {
  const { isAuth, loading } = useContext(AuthContext);

  const location = useLocation();

  if(loading) return <div>Loading...</div>

  if(!isAuth) return <Navigate to="/login" state={{ from: location }} />

  return <Outlet/>

}

const router = createBrowserRouter([
  {
    path: "",
    element: <AuthProvider />,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "",
        element: <PrivateAdminRoutes/>,
        children: [
          {
            path: "/",
            element: <Users/>
          }
        ]
      },
      {
        path: "",
        element: <PrivateRoutes />,
        children: [
          {
            path: "/account",
            element: <Account/>
          }
        ]
      }
    ],
  },
]);

function App() {



  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
