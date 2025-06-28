import React from 'react'
import { Navigate, Link } from 'react-router-dom'

export default function Dashboard() {
    // const navigate = useNavigate()
    // Function to check if the user is logged in
    const isLoggedIn = () => {
        const token = localStorage.getItem('token')
        return token
    }
    // Redirect to login if not logged in
    if (!isLoggedIn()) {
        return <Navigate to='/' />
    }
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container d-flex align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="#">
            <img
              src="bank_jateng.png"
              alt="Logo"
              width="60"
              height="40"
              className="d-inline-block align-text-top"
              style={{ marginRight: '8px' }}
            />
            <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>Bank Jateng Syariah</span>
          </Link>
          <Link to="/dashboard" className="nav-link active ms-auto" aria-current="page">
            Dashboard
          </Link>
          <Link to="/karyawan" className="nav-link ms-3">
            Karyawan
          </Link>
          <Link to="/laporan" className="nav-link ms-3">
            Laporan
          </Link>
            <img src="default_user.png" alt="Default User" style={{ width: '40px', height: '40px' }} />
        </div>
      </nav>

      <section className='py-5'>
        <div className="container">
            <h2>Dashboard</h2>
        </div>
      </section>
    </div>
  )
}
