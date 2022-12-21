import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Movies from "./Components/Movies/Movies";
import Tv from "./Components/Tv/Tv";
import People from "./Components/People/People";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ItemDetails from "./Components/ItemDetails/ItemDetails";
import { Offline } from "react-detect-offline";

function App() {
  const [userData, setUserData] = useState();

  function saveUserData() {
    const encodedToken = localStorage.getItem("userToken");
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  const router = createHashRouter([
    {
      path: `/`,
      element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        {
          index: true,
          element: (
            <Home userData={userData} />
            // <ProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        {
          path: "movies",
          element: (
            <Movies userData={userData} />
            // <ProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        {
          path: "people",
          element: (
            <People userData={userData} />
            // <ProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        {
          path: "tv",
          element: (
            <Tv userData={userData} />
            // <ProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <Profile userData={userData} />
            // <ProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        {
          path: "itemdetails/:id/:media_type/",
          element: (
            <ItemDetails saveUserData={saveUserData} userData={userData} />
            // <ProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);

  return (
    <>
      <Offline>
        <div className="offline">Whoops! Please check your internet connection</div>
      </Offline>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
