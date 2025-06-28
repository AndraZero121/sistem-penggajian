import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/Home.jsx"
import Register from "./pages/Register.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Karyawan from "./pages/Karyawan.jsx"
import Header from "./components/Header.jsx"

// let router = createBrowserRouter([
//   {
//     path: "/",
//     Component: Home,
//   },
//   {
//     path: "/register",
//     Component: Register,
//   },
//   {
//     path: "/dashboard",
//     Component: Dashboard,
//   },
//   {
//     path: "/karyawan",
//     Component: Karyawan,
//   }
// ]);
let router = createBrowserRouter([
  {
    path: "/",
    Component: Header,
    children: [
      {
        index: true,
        
        Component: Home
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "karyawan",
        Component: Karyawan,
      }
    ]
  }
])

function MainRoot() {
  return <>
    <RouterProvider
      router={router}
    />
  </>
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainRoot />
  </StrictMode>,
)
