import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()
  async function DetectedNotLogin() {
    const isLoggedIn = () => {
      const token = localStorage.getItem("token")
      return token
    }
    if (!isLoggedIn()) {
      return navigate("/")
    }
  }
  
  useEffect(() => {
    DetectedNotLogin()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="#">
            <img
              src="bank_jateng.png"
              alt="Logo"
              width="60"
              height="40"
              className="d-inline-block align-text-top"
              style={{ marginRight: '8px' }}
            />
            <span style={{ marginLeft: '8px', fontWeight: 'bold', fontSize: '1.2rem' }}>
              Bank Jateng Syariah
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link active" aria-current="page">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/karyawan" className="nav-link">
                  Karyawan
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/departemen" className="nav-link">
                  Departemen
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/jabatan" className="nav-link">
                  Jabatan
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/laporan" className="nav-link">
                  Laporan
                </Link>
              </li>
              <li className="nav-item ms-3">
                <img
                  src="default_user.png"
                  alt="Default User"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid #ddd',
                    objectFit: 'cover'
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className='py-5'>
        <div className="container">
            <h2>Dashboard</h2>
            <p>Selamat Datang, {localStorage.getItem('name') || 'User'}</p>
        </div>
      </section>
    </div>
  )
}
