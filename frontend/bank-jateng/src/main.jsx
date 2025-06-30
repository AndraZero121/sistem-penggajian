import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Karyawan from './pages/Karyawan.jsx';
import Departemen from './pages/Departemen.jsx';
import Laporan from './pages/Laporan.jsx';
import Jabatan from './pages/Jabatan.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/karyawan',
    element: <Karyawan />,
  },
  {
    path: '/departemen',
    element: <Departemen />,
  },
  {
    path: '/laporan',
    element: <Laporan />,
  },
  {
    path: '/jabatan',
    element: <Jabatan />,
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
    <RouterProvider router={router} />
  </StrictMode>
);
